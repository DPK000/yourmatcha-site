import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase, DbOrder, DbOrderItem } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Loader2, Package, Mail, MapPin, CreditCard,
  AlertTriangle, RotateCcw, Truck, ExternalLink, ShoppingBag,
  CheckCircle2, Tag, Pencil, Trash2, Plus, Minus, X, Save,
  Clock, History,
} from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ActivityLog {
  id: string;
  order_id: string;
  action: string;
  description: string;
  old_value?: Record<string, unknown>;
  new_value?: Record<string, unknown>;
  created_at: string;
}

interface DbProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

interface EditableItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
  isNew?: boolean;
  isDeleted?: boolean;
}

interface CustomerStats {
  orderCount: number;
  totalSpend: number;
  avgOrderValue: number;
  firstOrderDate: string | null;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const statusOptions = [
  { value: "pending",    label: "In afwachting" },
  { value: "paid",       label: "Betaald" },
  { value: "processing", label: "Verwerking" },
  { value: "shipped",    label: "Verzonden" },
  { value: "completed",  label: "Afgerond" },
  { value: "delivered",  label: "Afgeleverd" },
  { value: "cancelled",  label: "Geannuleerd" },
  { value: "refunded",   label: "Terugbetaald" },
];

const statusColors: Record<string, string> = {
  pending:    "bg-yellow-100 text-yellow-800",
  paid:       "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped:    "bg-indigo-100 text-indigo-800",
  completed:  "bg-green-100 text-green-800",
  delivered:  "bg-green-100 text-green-800",
  cancelled:  "bg-red-100 text-red-800",
  refunded:   "bg-gray-100 text-gray-800",
};

const CARRIERS = [
  { value: "postnl",  label: "PostNL",  url: (code: string) => `https://postnl.nl/tracktrace/?B=${code}&T=C` },
  { value: "dhl",     label: "DHL",     url: (code: string) => `https://www.dhl.com/nl-nl/home/tracking.html?tracking-id=${code}` },
  { value: "dpd",     label: "DPD",     url: (code: string) => `https://tracking.dpd.de/parcelstatus?query=${code}` },
  { value: "gls",     label: "GLS",     url: (code: string) => `https://gls-group.eu/track/${code}` },
  { value: "ups",     label: "UPS",     url: (code: string) => `https://www.ups.com/track?tracknum=${code}` },
  { value: "fedex",   label: "FedEx",   url: (code: string) => `https://www.fedex.com/fedextrack/?trknbr=${code}` },
  { value: "other",   label: "Overig",  url: () => "" },
];

const actionColors: Record<string, string> = {
  status_changed:  "bg-blue-500",
  tracking_updated: "bg-indigo-500",
  order_edited:    "bg-purple-500",
  refunded:        "bg-red-500",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const inputClass = "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40";
const labelClass = "block text-xs font-body font-medium text-muted-foreground mb-1";

const moneyFmt = (amount: number, currency?: string) =>
  currency === "NOK" ? `kr ${amount.toFixed(2)}` : `€${amount.toFixed(2)}`;

const eurFmt = (amount: number) => `€${amount.toFixed(2)}`;

// Vaste indicatieve koers, gelijk aan EUR_TO_NOK in src/context/CurrencyContext.tsx
const NOK_PER_EUR = 11.5;

// ── Component ─────────────────────────────────────────────────────────────────

const AdminOrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [order, setOrder]             = useState<DbOrder | null>(null);
  const [items, setItems]             = useState<DbOrderItem[]>([]);
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);
  const [loading, setLoading]         = useState(true);
  const [customerStats, setCustomerStats] = useState<CustomerStats | null>(null);

  // Status update
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  // Track & trace
  const [trackingCode,    setTrackingCode]    = useState("");
  const [trackingCarrier, setTrackingCarrier] = useState("postnl");
  const [trackingSaving,  setTrackingSaving]  = useState(false);
  const [trackingSaved,   setTrackingSaved]   = useState(false);

  // Refund
  const [refunding,    setRefunding]    = useState(false);
  const [refundReason, setRefundReason] = useState("");
  const [refundDone,   setRefundDone]   = useState(false);

  // Edit mode
  const [editMode,     setEditMode]     = useState(false);
  const [editForm,     setEditForm]     = useState<Partial<DbOrder>>({});
  const [editItems,    setEditItems]    = useState<EditableItem[]>([]);
  const [editShipping, setEditShipping] = useState(0);
  const [editSaving,   setEditSaving]   = useState(false);

  // Product search
  const [productSearch,  setProductSearch]  = useState("");
  const [productResults, setProductResults] = useState<DbProduct[]>([]);
  const [searchLoading,  setSearchLoading]  = useState(false);

  // Delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting,          setDeleting]          = useState(false);

  // ── Data loading ────────────────────────────────────────────────────────────

  useEffect(() => { loadOrder(); }, [id]);

  async function loadOrder() {
    setLoading(true);
    const [{ data: orderData }, { data: itemData }, { data: logData }] = await Promise.all([
      supabase.from("orders").select("*").eq("id", id).single(),
      supabase.from("order_items").select("*").eq("order_id", id).order("created_at"),
      supabase.from("order_activity_log").select("*").eq("order_id", id).order("created_at", { ascending: false }),
    ]);
    if (orderData) {
      const o = orderData as DbOrder;
      setOrder(o);
      setStatus(o.status);
      setTrackingCode(o.tracking_code ?? "");
      setTrackingCarrier(o.tracking_carrier ?? "postnl");
      if (o.status === "refunded") setRefundDone(true);
      loadCustomerStats(o.email);
    }
    setItems((itemData as DbOrderItem[]) ?? []);
    setActivityLog((logData as ActivityLog[]) ?? []);
    setLoading(false);
  }

  async function loadCustomerStats(email: string) {
    const { data } = await supabase
      .from("orders")
      .select("id, total, currency, created_at")
      .eq("email", email)
      .not("status", "in", '("cancelled","refunded")')
      .order("created_at", { ascending: true });
    if (!data || data.length === 0) return;
    // Aggregatie over orders in mogelijk verschillende valuta: NOK omrekenen naar EUR-equivalent
    const totalSpend = data.reduce(
      (s: number, o: { total: number; currency?: string }) =>
        s + (o.currency === "NOK" ? o.total / NOK_PER_EUR : o.total),
      0
    );
    setCustomerStats({
      orderCount: data.length,
      totalSpend,
      avgOrderValue: totalSpend / data.length,
      firstOrderDate: data[0].created_at,
    });
  }

  // ── Activity log helper ─────────────────────────────────────────────────────

  async function logActivity(
    orderId: string,
    action: string,
    description: string,
    oldValue?: Record<string, unknown>,
    newValue?: Record<string, unknown>
  ) {
    await supabase.from("order_activity_log").insert({
      order_id: orderId,
      action,
      description,
      old_value: oldValue ?? null,
      new_value: newValue ?? null,
    });
  }

  async function refreshLog(orderId: string) {
    const { data } = await supabase
      .from("order_activity_log")
      .select("*")
      .eq("order_id", orderId)
      .order("created_at", { ascending: false });
    setActivityLog((data as ActivityLog[]) ?? []);
  }

  // ── Status update ───────────────────────────────────────────────────────────

  async function updateStatus() {
    if (!order) return;
    setSaving(true);
    const oldStatus = order.status;
    await supabase.from("orders").update({ status }).eq("id", order.id);
    await logActivity(
      order.id,
      "status_changed",
      `Status gewijzigd van "${statusOptions.find(s => s.value === oldStatus)?.label}" naar "${statusOptions.find(s => s.value === status)?.label}"`,
      { status: oldStatus },
      { status }
    );
    setOrder(o => o ? { ...o, status: status as DbOrder["status"] } : null);

    // Send "je bestelling is onderweg" email when status = completed + tracking code exists
    if (status === "completed" && (trackingCode || order.tracking_code)) {
      const code = trackingCode || order.tracking_code || "";
      const carrier = trackingCarrier || order.tracking_carrier || "";
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        await fetch(`${supabaseUrl}/functions/v1/send-order-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${supabaseKey}`,
            "apikey": supabaseKey,
          },
          body: JSON.stringify({
            type: "shipped",
            email: order.email,
            firstName: order.first_name,
            orderNumber: order.order_number,
            trackingNumber: code,
            trackingCarrier: CARRIERS.find(c => c.value === carrier)?.label || carrier,
          }),
        });
        await logActivity(order.id, "email_sent", `Verzendmail gestuurd naar ${order.email} met tracking: ${code}`);
      } catch (e) {
        console.error("Failed to send shipped email:", e);
      }
    }

    await refreshLog(order.id);
    setSaving(false);
  }

  // ── Track & trace ───────────────────────────────────────────────────────────

  async function saveTracking() {
    if (!order) return;
    setTrackingSaving(true);
    const oldCode = order.tracking_code;
    await supabase.from("orders").update({ tracking_code: trackingCode.trim(), tracking_carrier: trackingCarrier }).eq("id", order.id);
    await logActivity(
      order.id,
      "tracking_updated",
      `Track & trace bijgewerkt: ${CARRIERS.find(c => c.value === trackingCarrier)?.label} — ${trackingCode.trim()}`,
      { tracking_code: oldCode },
      { tracking_code: trackingCode.trim(), tracking_carrier: trackingCarrier }
    );
    setOrder(o => o ? { ...o, tracking_code: trackingCode.trim(), tracking_carrier: trackingCarrier } : null);
    await refreshLog(order.id);
    setTrackingSaving(false);
    setTrackingSaved(true);
    setTimeout(() => setTrackingSaved(false), 2500);
  }

  // ── Refund ──────────────────────────────────────────────────────────────────

  async function handleRefund() {
    if (!order) return;
    setRefunding(true);
    try {
      const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const res = await fetch(`${supabaseUrl}/functions/v1/refund-paypal-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${supabaseAnonKey}` },
        body: JSON.stringify({ orderId: order.id, reason: refundReason }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      await logActivity(order.id, "refunded", `Terugbetaling verwerkt via PayPal${refundReason ? `: ${refundReason}` : ""}`);
      setOrder(o => o ? { ...o, status: "refunded" as DbOrder["status"] } : null);
      setStatus("refunded");
      setRefundDone(true);
      await refreshLog(order.id);
    } catch (err: unknown) {
      alert(`Refund mislukt: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setRefunding(false);
    }
  }

  // ── Edit mode ───────────────────────────────────────────────────────────────

  function enterEditMode() {
    if (!order) return;
    setEditForm({
      first_name:  order.first_name,
      last_name:   order.last_name,
      email:       order.email,
      phone:       order.phone ?? "",
      address:     order.address,
      city:        order.city,
      postal_code: order.postal_code,
      country:     order.country,
      notes:       order.notes ?? "",
    });
    setEditItems(items.map(i => ({
      id:            i.id,
      product_id:    i.product_id,
      product_name:  i.product_name,
      product_image: i.product_image,
      price:         i.price,
      quantity:      i.quantity,
    })));
    setEditShipping(order.shipping);
    setEditMode(true);
    setProductSearch("");
    setProductResults([]);
  }

  function cancelEdit() {
    setEditMode(false);
    setProductSearch("");
    setProductResults([]);
  }

  const editSubtotal = editItems
    .filter(i => !i.isDeleted)
    .reduce((s, i) => s + i.price * i.quantity, 0);
  const editTotal = editSubtotal + editShipping - (order?.discount_amount ?? 0);

  // ── Product search ──────────────────────────────────────────────────────────

  const searchProducts = useCallback(async (query: string) => {
    if (!query.trim()) { setProductResults([]); return; }
    setSearchLoading(true);
    const { data } = await supabase
      .from("products")
      .select("id, name, price, image, slug")
      .ilike("name", `%${query}%`)
      .eq("active", true)
      .limit(6);
    setProductResults((data as DbProduct[]) ?? []);
    setSearchLoading(false);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => searchProducts(productSearch), 300);
    return () => clearTimeout(t);
  }, [productSearch, searchProducts]);

  function addProductToOrder(product: DbProduct) {
    const existing = editItems.find(i => i.product_id === product.id && !i.isDeleted);
    if (existing) {
      setEditItems(prev => prev.map(i =>
        i.product_id === product.id && !i.isDeleted ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setEditItems(prev => [...prev, {
        id:            `new-${crypto.randomUUID()}`,
        product_id:    product.id,
        product_name:  product.name,
        product_image: product.image,
        price:         product.price,
        quantity:      1,
        isNew:         true,
      }]);
    }
    setProductSearch("");
    setProductResults([]);
  }

  // ── Save edits ──────────────────────────────────────────────────────────────

  async function saveEdits() {
    if (!order) return;
    setEditSaving(true);
    const changes: string[] = [];

    // Explicitly list only real DB columns (no type-only fields like order_items)
    const patch = {
      first_name:  editForm.first_name  ?? order.first_name,
      last_name:   editForm.last_name   ?? order.last_name,
      email:       editForm.email       ?? order.email,
      phone:       editForm.phone       || null,
      address:     editForm.address     ?? order.address,
      city:        editForm.city        ?? order.city,
      postal_code: editForm.postal_code ?? order.postal_code,
      country:     editForm.country     ?? order.country,
      notes:       editForm.notes       || null,
      shipping:    editShipping,
      subtotal:    editSubtotal,
      total:       Math.max(0, editTotal),
    };

    const { error: updateError } = await supabase
      .from("orders")
      .update(patch)
      .eq("id", order.id);

    if (updateError) {
      alert(`Opslaan mislukt: ${updateError.message}`);
      setEditSaving(false);
      return;
    }

    // Directly merge patch into local state (avoids re-fetch / 406 issues)
    setOrder(o => o ? { ...o, ...patch } : null);

    // Track changes for activity log
    const labelMap: Partial<Record<keyof typeof patch, string>> = {
      first_name: "Voornaam", last_name: "Achternaam", email: "E-mail",
      phone: "Telefoon", address: "Adres", city: "Stad",
      postal_code: "Postcode", country: "Land", notes: "Notities",
    };
    for (const [key, label] of Object.entries(labelMap)) {
      const k = key as keyof typeof patch;
      if (patch[k] !== order[k as keyof DbOrder]) {
        changes.push(`${label} gewijzigd`);
      }
    }
    if (editShipping !== order.shipping) {
      changes.push(`Verzendkosten: ${moneyFmt(order.shipping, order.currency)} → ${moneyFmt(editShipping, order.currency)}`);
    }

    // Handle order items
    for (const item of editItems) {
      if (item.isNew && !item.isDeleted) {
        const { error: insertErr } = await supabase.from("order_items").insert({
          order_id:      order.id,
          product_id:    item.product_id,
          product_name:  item.product_name,
          product_image: item.product_image,
          price:         item.price,
          quantity:      item.quantity,
        });
        if (!insertErr) changes.push(`Product toegevoegd: ${item.product_name} (${item.quantity}x)`);
      } else if (item.isDeleted && !item.isNew) {
        await supabase.from("order_items").delete().eq("id", item.id);
        changes.push(`Product verwijderd: ${item.product_name}`);
      } else if (!item.isNew && !item.isDeleted) {
        const original = items.find(i => i.id === item.id);
        if (original && original.quantity !== item.quantity) {
          await supabase.from("order_items").update({ quantity: item.quantity }).eq("id", item.id);
          changes.push(`Aantal: ${item.product_name} (${original.quantity} → ${item.quantity})`);
        }
      }
    }

    if (changes.length > 0) {
      await logActivity(order.id, "order_edited",
        `Bestelling bewerkt: ${changes.join("; ")}`,
        undefined, { changes }
      );
    }

    // Reload items + activity log (order state already updated above via .select())
    await Promise.all([
      supabase.from("order_items").select("*").eq("order_id", order.id).order("created_at")
        .then(({ data }) => { if (data) setItems(data as DbOrderItem[]); }),
      refreshLog(order.id),
    ]);

    setEditMode(false);
    setEditSaving(false);
  }

  // ── Delete order ────────────────────────────────────────────────────────────

  async function deleteOrder() {
    if (!order) return;
    setDeleting(true);
    const { error } = await supabase.from("orders").delete().eq("id", order.id);
    if (error) {
      alert(`Verwijderen mislukt: ${error.message}`);
      setDeleting(false);
      return;
    }
    navigate("/admin/orders");
  }

  // ── Tracking URL ────────────────────────────────────────────────────────────

  const trackingUrl = () => {
    const carrier = CARRIERS.find(c => c.value === (order?.tracking_carrier ?? trackingCarrier));
    const code = order?.tracking_code ?? trackingCode;
    if (!carrier || !code) return "";
    return carrier.url(code);
  };

  // ── Loading / not found ─────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-16 text-muted-foreground font-body">
        Bestelling niet gevonden.
        <Link to="/admin/orders" className="block mt-2 text-primary hover:underline">
          Terug naar bestellingen
        </Link>
      </div>
    );
  }

  const url = trackingUrl();

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6 max-w-4xl">

      {/* ── 1. Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 flex-wrap">
        <Link to="/admin/orders">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" /> Terug
          </Button>
        </Link>
        <div>
          <h1 className="font-display text-xl font-bold">{order.order_number}</h1>
          <p className="text-xs text-muted-foreground font-body">
            {format(new Date(order.created_at), "dd MMMM yyyy 'om' HH:mm", { locale: nl })}
          </p>
        </div>
        <span className={`text-xs font-body font-medium px-3 py-1 rounded-full ${statusColors[order.status] ?? "bg-gray-100"}`}>
          {statusOptions.find(s => s.value === order.status)?.label ?? order.status}
        </span>
        <div className="ml-auto flex items-center gap-2">
          {editMode ? (
            <>
              <Button onClick={saveEdits} disabled={editSaving}>
                {editSaving
                  ? <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                  : <Save className="h-4 w-4 mr-1.5" />}
                Wijzigingen opslaan
              </Button>
              <Button variant="outline" onClick={cancelEdit} disabled={editSaving}>
                <X className="h-4 w-4 mr-1.5" /> Annuleren
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={enterEditMode}>
                <Pencil className="h-4 w-4 mr-1.5" /> Bewerken
              </Button>
              <Button variant="destructive" size="sm" onClick={() => setShowDeleteConfirm(true)}>
                <Trash2 className="h-4 w-4 mr-1.5" /> Verwijderen
              </Button>
            </>
          )}
        </div>
      </div>

      {/* ── 2. Info cards (view mode only) ─────────────────────────────────── */}
      {!editMode && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Customer */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <Mail className="h-4 w-4 text-primary" />
              <h2 className="font-body font-semibold text-sm">Klantgegevens</h2>
            </div>
            <div className="text-sm font-body space-y-1">
              <p className="font-semibold">{order.first_name} {order.last_name}</p>
              <p className="text-muted-foreground">{order.email}</p>
              {order.phone && <p className="text-muted-foreground">{order.phone}</p>}
            </div>
          </div>

          {/* Address */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-4 w-4 text-primary" />
              <h2 className="font-body font-semibold text-sm">Bezorgadres</h2>
            </div>
            <div className="text-sm font-body space-y-1 text-muted-foreground">
              <p>{order.address}</p>
              <p>{order.postal_code} {order.city}</p>
              <p>{order.country}</p>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <CreditCard className="h-4 w-4 text-primary" />
              <h2 className="font-body font-semibold text-sm">Betaling</h2>
            </div>
            <div className="text-sm font-body space-y-1">
              <p className="capitalize text-muted-foreground">
                {order.payment_method?.replace(/_/g, " ") ?? "—"}
              </p>
              {order.payment_intent_id && (
                <p className="text-xs text-muted-foreground truncate">ID: {order.payment_intent_id}</p>
              )}
              {order.discount_code && (
                <p className="text-xs flex items-center gap-1 text-green-700">
                  <Tag className="h-3 w-3" /> {order.discount_code}
                  {order.discount_amount ? ` (−${moneyFmt(Number(order.discount_amount), order.currency)})` : ""}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── 3. Customer stats ───────────────────────────────────────────────── */}
      {customerStats && (
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="h-4 w-4 text-primary" />
            <h2 className="font-body font-semibold text-sm">Klanthistorie — {order.email}</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-secondary/40">
              <p className="text-2xl font-display font-bold">{customerStats.orderCount}</p>
              <p className="text-xs text-muted-foreground font-body mt-0.5">Bestellingen</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-secondary/40">
              <p className="text-2xl font-display font-bold">{eurFmt(customerStats.avgOrderValue)}</p>
              <p className="text-xs text-muted-foreground font-body mt-0.5">Gem. orderwaarde</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-secondary/40">
              <p className="text-2xl font-display font-bold">{eurFmt(customerStats.totalSpend)}</p>
              <p className="text-xs text-muted-foreground font-body mt-0.5">Totaal besteed</p>
            </div>
          </div>
          {customerStats.firstOrderDate && customerStats.orderCount > 1 && (
            <p className="text-xs text-muted-foreground font-body mt-3">
              Klant sinds {format(new Date(customerStats.firstOrderDate), "MMMM yyyy", { locale: nl })}
            </p>
          )}
        </div>
      )}

      {/* ── 4. Order items (view mode only) ────────────────────────────────── */}
      {!editMode && (
        <div className="bg-card border border-border rounded-xl">
          <div className="flex items-center gap-2 p-5 border-b border-border">
            <Package className="h-4 w-4 text-primary" />
            <h2 className="font-body font-semibold text-sm">Producten</h2>
          </div>
          <div className="divide-y divide-border">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                <img
                  src={item.product_image}
                  alt={item.product_name}
                  className="h-12 w-12 rounded-lg object-contain bg-secondary/30"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder-product.jpg"; }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-body font-medium text-sm truncate">{item.product_name}</p>
                  <p className="text-xs text-muted-foreground font-body">Aantal: {item.quantity}</p>
                </div>
                <p className="font-body font-semibold text-sm">{moneyFmt(item.price * item.quantity, order.currency)}</p>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 border-t border-border space-y-2 text-sm font-body">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotaal</span>
              <span>{moneyFmt(order.subtotal, order.currency)}</span>
            </div>
            {order.discount_amount && order.discount_amount > 0 ? (
              <div className="flex justify-between text-green-700">
                <span>Korting {order.discount_code ? `(${order.discount_code})` : ""}</span>
                <span>−{moneyFmt(Number(order.discount_amount), order.currency)}</span>
              </div>
            ) : null}
            <div className="flex justify-between text-muted-foreground">
              <span>Verzending</span>
              <span>{order.shipping === 0 ? "Gratis" : moneyFmt(order.shipping, order.currency)}</span>
            </div>
            <div className="flex justify-between font-bold text-base border-t border-border pt-2">
              <span>Totaal</span>
              <span>{moneyFmt(order.total, order.currency)}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── 5. Edit mode form ───────────────────────────────────────────────── */}
      {editMode && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-8">

          {/* Section A: Klantgegevens */}
          <div>
            <h3 className="font-body font-semibold text-sm mb-4 flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> Klantgegevens bewerken
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Voornaam</label>
                <input
                  className={inputClass}
                  value={editForm.first_name ?? ""}
                  onChange={e => setEditForm(f => ({ ...f, first_name: e.target.value }))}
                />
              </div>
              <div>
                <label className={labelClass}>Achternaam</label>
                <input
                  className={inputClass}
                  value={editForm.last_name ?? ""}
                  onChange={e => setEditForm(f => ({ ...f, last_name: e.target.value }))}
                />
              </div>
              <div>
                <label className={labelClass}>E-mailadres</label>
                <input
                  type="email"
                  className={inputClass}
                  value={editForm.email ?? ""}
                  onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div>
                <label className={labelClass}>Telefoonnummer</label>
                <input
                  className={inputClass}
                  value={editForm.phone ?? ""}
                  onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Straat en huisnummer</label>
                <input
                  className={inputClass}
                  value={editForm.address ?? ""}
                  onChange={e => setEditForm(f => ({ ...f, address: e.target.value }))}
                />
              </div>
              <div>
                <label className={labelClass}>Stad</label>
                <input
                  className={inputClass}
                  value={editForm.city ?? ""}
                  onChange={e => setEditForm(f => ({ ...f, city: e.target.value }))}
                />
              </div>
              <div>
                <label className={labelClass}>Postcode</label>
                <input
                  className={inputClass}
                  value={editForm.postal_code ?? ""}
                  onChange={e => setEditForm(f => ({ ...f, postal_code: e.target.value }))}
                />
              </div>
              <div>
                <label className={labelClass}>Land</label>
                <input
                  className={inputClass}
                  value={editForm.country ?? ""}
                  onChange={e => setEditForm(f => ({ ...f, country: e.target.value }))}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className={labelClass}>Notities</label>
              <textarea
                rows={3}
                className={`${inputClass} resize-none`}
                value={editForm.notes ?? ""}
                onChange={e => setEditForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="Optionele notitie..."
              />
            </div>
          </div>

          {/* Section B: Producten */}
          <div>
            <h3 className="font-body font-semibold text-sm mb-4 flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" /> Producten bewerken
            </h3>

            <div className="space-y-3 mb-4">
              {editItems.filter(i => !i.isDeleted).map(item => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background">
                  <img
                    src={item.product_image}
                    alt={item.product_name}
                    className="h-10 w-10 rounded-md object-contain bg-secondary/30 shrink-0"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder-product.jpg"; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-body font-medium truncate">{item.product_name}</p>
                    <p className="text-xs text-muted-foreground font-body">{moneyFmt(item.price, order.currency)} / stuk</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditItems(prev => prev.map(i =>
                        i.id === item.id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i
                      ))}
                      className="h-7 w-7 rounded-md border border-border flex items-center justify-center hover:bg-secondary/50 transition-colors"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-body font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setEditItems(prev => prev.map(i =>
                        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                      ))}
                      className="h-7 w-7 rounded-md border border-border flex items-center justify-center hover:bg-secondary/50 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="text-sm font-body font-semibold w-16 text-right shrink-0">
                    {moneyFmt(item.price * item.quantity, order.currency)}
                  </p>
                  <button
                    type="button"
                    onClick={() => setEditItems(prev => prev.map(i =>
                      i.id === item.id ? { ...i, isDeleted: true } : i
                    ))}
                    className="h-7 w-7 rounded-md flex items-center justify-center text-destructive hover:bg-red-50 transition-colors shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Product toevoegen */}
            <div className="border border-dashed border-border rounded-lg p-4">
              <p className="text-xs font-body font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                <Plus className="h-3.5 w-3.5" /> Product toevoegen
              </p>
              <div className="relative">
                <input
                  className={inputClass}
                  placeholder="Zoek product..."
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                />
                {searchLoading && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                )}
                {productResults.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-10 overflow-hidden">
                    {productResults.map(product => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => addProductToOrder(product)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-secondary/50 transition-colors text-left"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-8 w-8 rounded object-contain bg-secondary/30 shrink-0"
                        />
                        <span className="flex-1 text-sm font-body truncate">{product.name}</span>
                        <span className="text-sm font-body font-semibold shrink-0">€{product.price.toFixed(2)}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section C: Verzending */}
          <div>
            <h3 className="font-body font-semibold text-sm mb-4 flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" /> Verzendkosten
            </h3>
            <div className="flex items-center gap-2 max-w-xs">
              <span className="text-sm font-body text-muted-foreground">{order.currency === "NOK" ? "kr" : "€"}</span>
              <input
                type="number"
                min="0"
                step="0.01"
                className={inputClass}
                value={editShipping}
                onChange={e => setEditShipping(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          {/* Section D: Totaal preview */}
          <div className="border-t border-border pt-5">
            <h3 className="font-body font-semibold text-sm mb-3">Totaaloverzicht</h3>
            <div className="space-y-2 text-sm font-body max-w-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotaal</span>
                <span>{moneyFmt(editSubtotal, order.currency)}</span>
              </div>
              {order.discount_amount && order.discount_amount > 0 ? (
                <div className="flex justify-between text-green-700">
                  <span>Korting {order.discount_code ? `(${order.discount_code})` : ""}</span>
                  <span>−{moneyFmt(Number(order.discount_amount), order.currency)}</span>
                </div>
              ) : null}
              <div className="flex justify-between text-muted-foreground">
                <span>Verzending</span>
                <span>{editShipping === 0 ? "Gratis" : moneyFmt(editShipping, order.currency)}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t border-border pt-2">
                <span>Totaal</span>
                <span>{moneyFmt(Math.max(0, editTotal), order.currency)}</span>
              </div>
            </div>
          </div>

          {/* Bottom action buttons */}
          <div className="flex gap-3 border-t border-border pt-5">
            <Button onClick={saveEdits} disabled={editSaving}>
              {editSaving
                ? <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                : <Save className="h-4 w-4 mr-1.5" />}
              Wijzigingen opslaan
            </Button>
            <Button variant="outline" onClick={cancelEdit} disabled={editSaving}>
              <X className="h-4 w-4 mr-1.5" /> Annuleren
            </Button>
          </div>
        </div>
      )}

      {/* ── 6. Track & Trace ────────────────────────────────────────────────── */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Truck className="h-4 w-4 text-primary" />
          <h2 className="font-body font-semibold text-sm">Track &amp; Trace</h2>
        </div>

        {order.tracking_code && (
          <div className="mb-4 flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-semibold text-green-800">
                {CARRIERS.find(c => c.value === order.tracking_carrier)?.label ?? order.tracking_carrier} — {order.tracking_code}
              </p>
            </div>
            {url && (
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="outline" className="shrink-0">
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" /> Volgen
                </Button>
              </a>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <select
            value={trackingCarrier}
            onChange={e => setTrackingCarrier(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40 shrink-0"
          >
            {CARRIERS.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Track & trace code..."
            value={trackingCode}
            onChange={e => { setTrackingCode(e.target.value); setTrackingSaved(false); }}
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40"
          />
          <Button onClick={saveTracking} disabled={trackingSaving || !trackingCode.trim()} className="shrink-0">
            {trackingSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : trackingSaved ? (
              <><CheckCircle2 className="h-4 w-4 mr-1.5" /> Opgeslagen</>
            ) : (
              "Opslaan"
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground font-body mt-2">
          Later automatisch gevuld door je fulfilment-partner via de API.
        </p>
      </div>

      {/* ── 7. Status update ────────────────────────────────────────────────── */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h2 className="font-body font-semibold text-sm mb-4">Status bijwerken</h2>
        <div className="flex gap-3">
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40"
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <Button onClick={updateStatus} disabled={saving || status === order.status}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Opslaan"}
          </Button>
        </div>
        {order.notes && (
          <div className="mt-4 p-3 rounded-lg bg-secondary/50 text-sm font-body text-muted-foreground">
            <strong className="text-foreground">Notities:</strong> {order.notes}
          </div>
        )}
      </div>

      {/* ── 8. Refund ───────────────────────────────────────────────────────── */}
      {order.payment_method === "paypal" && order.status !== "refunded" && !refundDone && (
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <RotateCcw className="h-4 w-4 text-destructive" />
            <h2 className="font-body font-semibold text-sm">Terugbetaling (Refund)</h2>
          </div>
          <div className="flex items-start gap-2 mb-4 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 shrink-0" />
            <p className="text-xs font-body text-yellow-800">
              Dit stuurt een volledige terugbetaling via PayPal. Dit kan niet ongedaan worden gemaakt.
            </p>
          </div>
          <textarea
            value={refundReason}
            onChange={e => setRefundReason(e.target.value)}
            placeholder="Reden voor terugbetaling (optioneel)..."
            rows={3}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40 resize-none mb-3"
          />
          <Button variant="destructive" onClick={handleRefund} disabled={refunding}>
            {refunding && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Terugbetalen via PayPal
          </Button>
        </div>
      )}
      {refundDone && (
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-sm font-body text-gray-700 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-gray-500 shrink-0" />
          Terugbetaling verwerkt via PayPal.
          {order.refund_reason && <span className="text-muted-foreground ml-1">— {order.refund_reason}</span>}
        </div>
      )}

      {/* ── 9. Activiteitenlog ──────────────────────────────────────────────── */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-5">
          <History className="h-4 w-4 text-primary" />
          <h2 className="font-body font-semibold text-sm">Activiteitenlog</h2>
        </div>

        {activityLog.length === 0 ? (
          <p className="text-sm text-muted-foreground font-body">Nog geen activiteit geregistreerd</p>
        ) : (
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />

            <div className="space-y-5">
              {activityLog.map(entry => {
                const dotColor = actionColors[entry.action] ?? "bg-gray-400";
                return (
                  <div key={entry.id} className="flex items-start gap-4 pl-8 relative">
                    <div className={`absolute left-0 top-1.5 h-4 w-4 rounded-full ${dotColor} shrink-0 ring-2 ring-background`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-body text-foreground">{entry.description}</p>
                      <p className="text-xs text-muted-foreground font-body mt-0.5 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {format(new Date(entry.created_at), "dd MMM yyyy HH:mm", { locale: nl })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── 10. Delete confirmation modal ───────────────────────────────────── */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-xl p-6 shadow-xl max-w-md w-full mx-4">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold mb-1">Bestelling verwijderen</h2>
                <p className="text-sm font-body text-muted-foreground">
                  Weet je zeker dat je bestelling <span className="font-semibold text-foreground">{order.order_number}</span> wilt verwijderen? Dit kan niet ongedaan worden gemaakt.
                </p>
              </div>
              <div className="flex gap-3 w-full">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleting}
                >
                  Annuleren
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={deleteOrder}
                  disabled={deleting}
                >
                  {deleting && <Loader2 className="h-4 w-4 animate-spin mr-1.5" />}
                  Definitief verwijderen
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminOrderDetail;
