import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase, DbOrder } from "@/lib/supabase";
import { Search, Filter, ChevronRight, Package, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  completed: "bg-green-100 text-green-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
};

const statusLabels: Record<string, string> = {
  pending: "In afwachting",
  paid: "Betaald",
  processing: "Verwerking",
  shipped: "Verzonden",
  completed: "Afgerond",
  delivered: "Afgeleverd",
  cancelled: "Geannuleerd",
  refunded: "Terugbetaald",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<DbOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    setOrders((data as DbOrder[]) ?? []);
    setLoading(false);
  }

  const filtered = orders.filter(o => {
    const matchSearch =
      !search ||
      o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase()) ||
      `${o.first_name} ${o.last_name}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-display text-2xl font-bold">Bestellingen</h1>
        <p className="text-sm text-muted-foreground font-body mt-1">{orders.length} bestellingen totaal</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Zoek op naam, email, bestelnummer..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm font-body outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="pl-9 pr-8 py-2.5 rounded-lg border border-border bg-card text-sm font-body outline-none focus:ring-2 focus:ring-primary/40 appearance-none"
          >
            <option value="all">Alle statussen</option>
            {Object.entries(statusLabels).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground font-body text-sm">
            <Package className="h-8 w-8 mx-auto mb-2 opacity-40" />
            Geen bestellingen gevonden
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="hidden md:grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-border text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">
              <span>Bestelling</span>
              <span>Klant</span>
              <span>Datum</span>
              <span>Status</span>
              <span>Totaal</span>
              <span></span>
            </div>
            <div className="divide-y divide-border">
              {filtered.map(order => (
                <Link
                  key={order.id}
                  to={`/admin/orders/${order.id}`}
                  className="flex flex-col md:grid md:grid-cols-[1fr_1.5fr_1fr_1fr_1fr_auto] gap-2 md:gap-4 md:items-center px-5 py-4 hover:bg-secondary/30 transition-colors"
                >
                  <span className="font-body font-semibold text-sm">{order.order_number}</span>
                  <div>
                    <p className="font-body text-sm font-medium">{order.first_name} {order.last_name}</p>
                    <p className="font-body text-xs text-muted-foreground">{order.email}</p>
                  </div>
                  <span className="font-body text-sm text-muted-foreground">
                    {format(new Date(order.created_at), "dd MMM yyyy", { locale: nl })}
                  </span>
                  <span className={`inline-flex w-fit text-xs font-body font-medium px-2 py-0.5 rounded-full ${statusColors[order.status] ?? "bg-gray-100 text-gray-700"}`}>
                    {statusLabels[order.status] ?? order.status}
                  </span>
                  <span className="font-body font-semibold text-sm">€{order.total.toFixed(2)}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground hidden md:block" />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
