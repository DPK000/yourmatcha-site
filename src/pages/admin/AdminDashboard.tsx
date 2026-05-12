import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase, DbOrder } from "@/lib/supabase";
import { TrendingUp, ShoppingBag, Euro, Clock, ArrowRight, Package } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, subDays, startOfDay } from "date-fns";

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  avgOrderValue: number;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
};

const statusLabels: Record<string, string> = {
  pending: "In afwachting",
  paid: "Betaald",
  processing: "Verwerking",
  shipped: "Verzonden",
  delivered: "Afgeleverd",
  cancelled: "Geannuleerd",
  refunded: "Terugbetaald",
};

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({ totalRevenue: 0, totalOrders: 0, pendingOrders: 0, avgOrderValue: 0 });
  const [recentOrders, setRecentOrders] = useState<DbOrder[]>([]);
  const [chartData, setChartData] = useState<{ date: string; revenue: number; orders: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    try {
      const { data: orders } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (!orders) return;

      const allOrders = orders as DbOrder[];
      const paidOrders = allOrders.filter(o => o.status !== "cancelled" && o.status !== "refunded");

      const totalRevenue = paidOrders.reduce((sum, o) => sum + o.total, 0);
      const pendingOrders = allOrders.filter(o => o.status === "pending" || o.status === "paid").length;
      const avgOrderValue = paidOrders.length > 0 ? totalRevenue / paidOrders.length : 0;

      setStats({
        totalRevenue,
        totalOrders: allOrders.length,
        pendingOrders,
        avgOrderValue,
      });

      setRecentOrders(allOrders.slice(0, 8));

      // Build chart data for last 14 days
      const last14Days = Array.from({ length: 14 }, (_, i) => {
        const date = startOfDay(subDays(new Date(), 13 - i));
        const dateStr = format(date, "yyyy-MM-dd");
        const dayOrders = paidOrders.filter(o => o.created_at.startsWith(dateStr));
        return {
          date: format(date, "dd MMM"),
          revenue: dayOrders.reduce((sum, o) => sum + o.total, 0),
          orders: dayOrders.length,
        };
      });
      setChartData(last14Days);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-card rounded-xl border border-border animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="font-display text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground font-body mt-1">Overzicht van je webshop</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Totale omzet", value: `€${stats.totalRevenue.toFixed(2)}`, icon: Euro, color: "text-green-600" },
          { label: "Bestellingen", value: stats.totalOrders, icon: ShoppingBag, color: "text-blue-600" },
          { label: "Openstaand", value: stats.pendingOrders, icon: Clock, color: "text-yellow-600" },
          { label: "Gem. orderwaarde", value: `€${stats.avgOrderValue.toFixed(2)}`, icon: TrendingUp, color: "text-purple-600" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <p className="font-display text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h2 className="font-display font-semibold mb-4">Omzet — afgelopen 14 dagen</h2>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fontFamily: 'inherit' }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11, fontFamily: 'inherit' }} tickLine={false} axisLine={false} tickFormatter={v => `€${v}`} />
            <Tooltip
              formatter={(value: number) => [`€${value.toFixed(2)}`, "Omzet"]}
              contentStyle={{ fontSize: 12, fontFamily: 'inherit', borderRadius: 8, border: '1px solid hsl(var(--border))' }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent orders */}
      <div className="bg-card border border-border rounded-xl">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-display font-semibold">Recente bestellingen</h2>
          <Link to="/admin/orders" className="flex items-center gap-1 text-xs text-primary hover:underline font-body">
            Alle bestellingen <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground font-body text-sm">
            <Package className="h-8 w-8 mx-auto mb-2 opacity-40" />
            Nog geen bestellingen
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recentOrders.map(order => (
              <Link
                key={order.id}
                to={`/admin/orders/${order.id}`}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm font-body font-semibold">{order.order_number}</p>
                    <p className="text-xs text-muted-foreground font-body">{order.first_name} {order.last_name} · {order.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-body font-medium px-2 py-0.5 rounded-full ${statusColors[order.status] ?? "bg-gray-100 text-gray-700"}`}>
                    {statusLabels[order.status] ?? order.status}
                  </span>
                  <span className="text-sm font-body font-semibold">€{order.total.toFixed(2)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
