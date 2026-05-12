import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Tag, Plus, Pencil, Trash2, Check, X, Loader2, Percent, Euro, Truck,
} from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface DiscountCode {
  id: string;
  code: string;
  type: "percentage" | "fixed" | "free_shipping";
  value: number;
  free_shipping: boolean;
  min_order_amount: number;
  max_uses: number | null;
  uses_count: number;
  active: boolean;
  expires_at: string | null;
  created_at: string;
}

const emptyForm = (): Omit<DiscountCode, "id" | "uses_count" | "created_at"> => ({
  code: "",
  type: "percentage",
  value: 10,
  free_shipping: false,
  min_order_amount: 0,
  max_uses: null,
  active: true,
  expires_at: null,
});

function typeLabel(type: DiscountCode["type"]): string {
  if (type === "percentage") return "% Korting";
  if (type === "fixed") return "€ Korting";
  return "Gratis verzending";
}

function typeIcon(type: DiscountCode["type"]) {
  if (type === "percentage") return <Percent className="h-3 w-3" />;
  if (type === "fixed") return <Euro className="h-3 w-3" />;
  return <Truck className="h-3 w-3" />;
}

function ValueCell({ code }: { code: DiscountCode }) {
  if (code.type === "free_shipping") return <span className="text-muted-foreground">—</span>;
  return (
    <span className="flex items-center gap-1">
      {code.type === "percentage" ? `${code.value}%` : `€${code.value.toFixed(2)}`}
      {code.free_shipping && <Truck className="h-3.5 w-3.5 text-blue-500 shrink-0" title="Inclusief gratis verzending" />}
    </span>
  );
}

function StatusBadge({ code }: { code: DiscountCode }) {
  const expired = code.expires_at && new Date(code.expires_at) < new Date();
  if (expired) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-body font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700">
        <X className="h-3 w-3" /> Verlopen
      </span>
    );
  }
  if (code.active) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-body font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
        <Check className="h-3 w-3" /> Actief
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-body font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
      <X className="h-3 w-3" /> Inactief
    </span>
  );
}

const AdminDiscountCodes = () => {
  const [codes, setCodes] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCode, setEditingCode] = useState<DiscountCode | null>(null);
  const [formData, setFormData] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    loadCodes();
  }, []);

  async function loadCodes() {
    setLoading(true);
    const { data } = await supabase
      .from("discount_codes")
      .select("*")
      .order("created_at", { ascending: false });
    setCodes((data as DiscountCode[]) ?? []);
    setLoading(false);
  }

  function openCreate() {
    setEditingCode(null);
    setFormData(emptyForm());
    setFormError("");
    setShowForm(true);
  }

  function openEdit(code: DiscountCode) {
    setEditingCode(code);
    setFormData({
      code: code.code,
      type: code.type,
      value: code.value,
      free_shipping: code.free_shipping,
      min_order_amount: code.min_order_amount,
      max_uses: code.max_uses,
      active: code.active,
      expires_at: code.expires_at ? code.expires_at.slice(0, 10) : null,
    });
    setFormError("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingCode(null);
    setFormError("");
  }

  function setField<K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) {
    setFormData(f => ({ ...f, [key]: value }));
  }

  async function handleSave() {
    if (!formData.code.trim()) {
      setFormError("Code is verplicht.");
      return;
    }
    setSaving(true);
    setFormError("");

    const payload = {
      code: formData.code.trim().toUpperCase(),
      type: formData.type,
      value: formData.type === "free_shipping" ? 0 : Number(formData.value),
      free_shipping: formData.type === "free_shipping" ? true : formData.free_shipping,
      min_order_amount: Number(formData.min_order_amount) || 0,
      max_uses: formData.max_uses ? Number(formData.max_uses) : null,
      active: formData.active,
      expires_at: formData.expires_at ? new Date(formData.expires_at).toISOString() : null,
    };

    let error;
    if (editingCode) {
      ({ error } = await supabase.from("discount_codes").update(payload).eq("id", editingCode.id));
    } else {
      ({ error } = await supabase.from("discount_codes").insert(payload));
    }

    setSaving(false);
    if (error) {
      setFormError(error.message.includes("unique") ? "Deze code bestaat al." : error.message);
      return;
    }
    closeForm();
    loadCodes();
  }

  async function handleDelete(id: string) {
    if (!confirm("Weet je zeker dat je deze kortingscode wilt verwijderen?")) return;
    setDeletingId(id);
    await supabase.from("discount_codes").delete().eq("id", id);
    setDeletingId(null);
    loadCodes();
  }

  const inputClass =
    "w-full rounded-lg border border-border px-3 py-2.5 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40 bg-background transition-colors";
  const labelClass = "block text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide mb-1";

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Kortingscodes</h1>
          <p className="text-sm text-muted-foreground font-body mt-1">{codes.length} codes totaal</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-body font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Nieuwe code
        </button>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : codes.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground font-body text-sm">
            <Tag className="h-8 w-8 mx-auto mb-2 opacity-40" />
            Nog geen kortingscodes aangemaakt
          </div>
        ) : (
          <>
            {/* Header row */}
            <div className="hidden lg:grid grid-cols-[1.5fr_1.2fr_1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-3 px-5 py-3 border-b border-border text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">
              <span>Code</span>
              <span>Type</span>
              <span>Waarde</span>
              <span>Gratis verz.</span>
              <span>Min. order</span>
              <span>Gebruik</span>
              <span>Vervalt</span>
              <span>Status</span>
              <span></span>
            </div>
            <div className="divide-y divide-border">
              {codes.map(code => (
                <div
                  key={code.id}
                  className="flex flex-col lg:grid lg:grid-cols-[1.5fr_1.2fr_1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-2 lg:gap-3 lg:items-center px-5 py-4"
                >
                  {/* Code */}
                  <span className="font-mono font-bold text-sm tracking-wider">{code.code}</span>

                  {/* Type */}
                  <span className="flex items-center gap-1.5 text-sm font-body text-muted-foreground">
                    {typeIcon(code.type)}
                    {typeLabel(code.type)}
                  </span>

                  {/* Value */}
                  <span className="text-sm font-body font-medium">
                    <ValueCell code={code} />
                  </span>

                  {/* Free shipping */}
                  <span className="text-sm font-body">
                    {code.type === "free_shipping" || code.free_shipping ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground/40" />
                    )}
                  </span>

                  {/* Min order */}
                  <span className="text-sm font-body text-muted-foreground">
                    {code.min_order_amount > 0 ? `€${code.min_order_amount.toFixed(2)}` : "—"}
                  </span>

                  {/* Uses */}
                  <span className="text-sm font-body text-muted-foreground">
                    {code.uses_count} / {code.max_uses !== null ? code.max_uses : "∞"}
                  </span>

                  {/* Expires */}
                  <span className="text-sm font-body text-muted-foreground">
                    {code.expires_at
                      ? format(new Date(code.expires_at), "dd MMM yyyy", { locale: nl })
                      : "—"}
                  </span>

                  {/* Status */}
                  <StatusBadge code={code} />

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(code)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      title="Bewerken"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(code.id)}
                      disabled={deletingId === code.id}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Verwijderen"
                    >
                      {deletingId === code.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal / Form overlay */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-display font-bold text-lg">
                {editingCode ? "Kortingscode bewerken" : "Nieuwe kortingscode"}
              </h2>
              <button onClick={closeForm} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form body */}
            <div className="px-6 py-5 space-y-4">
              {/* Code */}
              <div>
                <label className={labelClass}>Code</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={e => setField("code", e.target.value.toUpperCase())}
                  placeholder="bv. ZOMER20"
                  className={inputClass}
                />
              </div>

              {/* Type */}
              <div>
                <label className={labelClass}>Type</label>
                <select
                  value={formData.type}
                  onChange={e => setField("type", e.target.value as DiscountCode["type"])}
                  className={inputClass}
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Vast bedrag (€)</option>
                  <option value="free_shipping">Alleen gratis verzending</option>
                </select>
              </div>

              {/* Value — hidden for free_shipping */}
              {formData.type !== "free_shipping" && (
                <div>
                  <label className={labelClass}>
                    {formData.type === "percentage" ? "Kortingspercentage (%)" : "Kortingsbedrag (€)"}
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={formData.type === "percentage" ? 1 : 0.01}
                    value={formData.value}
                    onChange={e => setField("value", Number(e.target.value))}
                    className={inputClass}
                  />
                </div>
              )}

              {/* Free shipping checkbox — for percentage/fixed */}
              {formData.type !== "free_shipping" && (
                <label className="flex items-center gap-2.5 text-sm font-body cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.free_shipping}
                    onChange={e => setField("free_shipping", e.target.checked)}
                    className="rounded border-border h-4 w-4"
                  />
                  Ook gratis verzending toevoegen
                </label>
              )}

              {/* Min order */}
              <div>
                <label className={labelClass}>Min. orderbedrag (€, optioneel)</label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={formData.min_order_amount}
                  onChange={e => setField("min_order_amount", Number(e.target.value))}
                  placeholder="0"
                  className={inputClass}
                />
              </div>

              {/* Max uses */}
              <div>
                <label className={labelClass}>Max. gebruik (optioneel, leeg = onbeperkt)</label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={formData.max_uses ?? ""}
                  onChange={e =>
                    setField("max_uses", e.target.value === "" ? null : Number(e.target.value))
                  }
                  placeholder="Onbeperkt"
                  className={inputClass}
                />
              </div>

              {/* Expires at */}
              <div>
                <label className={labelClass}>Vervaldatum (optioneel)</label>
                <input
                  type="date"
                  value={formData.expires_at ?? ""}
                  onChange={e =>
                    setField("expires_at", e.target.value === "" ? null : e.target.value)
                  }
                  className={inputClass}
                />
              </div>

              {/* Active toggle */}
              <label className="flex items-center justify-between gap-3 text-sm font-body cursor-pointer">
                <span className="font-medium">Actief</span>
                <button
                  type="button"
                  onClick={() => setField("active", !formData.active)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.active ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      formData.active ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </label>

              {formError && (
                <p className="text-sm text-destructive font-body">{formError}</p>
              )}
            </div>

            {/* Modal footer */}
            <div className="px-6 py-4 border-t border-border flex gap-3 justify-end">
              <button
                onClick={closeForm}
                className="px-4 py-2.5 rounded-lg border border-border text-sm font-body font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Annuleren
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-body font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {saving ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Opslaan…</>
                ) : (
                  <><Check className="h-4 w-4" /> Opslaan</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDiscountCodes;
