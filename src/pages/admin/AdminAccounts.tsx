import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Users, Mail, ShoppingBag, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface AccountRow {
  email: string;
  name: string;
  order_count: number;
  total_spent: number;
  last_order_at: string;
}

function useAccounts() {
  return useQuery({
    queryKey: ["admin-accounts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("email, first_name, last_name, total, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;

      // Group by email
      const map = new Map<string, AccountRow>();
      for (const row of data ?? []) {
        if (map.has(row.email)) {
          const existing = map.get(row.email)!;
          existing.order_count++;
          existing.total_spent += row.total;
          if (row.created_at > existing.last_order_at) existing.last_order_at = row.created_at;
        } else {
          map.set(row.email, {
            email: row.email,
            name: `${row.first_name} ${row.last_name}`,
            order_count: 1,
            total_spent: row.total,
            last_order_at: row.created_at,
          });
        }
      }
      return Array.from(map.values()).sort((a, b) => b.last_order_at.localeCompare(a.last_order_at));
    },
    staleTime: 60_000,
  });
}

const AdminAccounts = () => {
  const { data: accounts = [], isLoading, error } = useAccounts();

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Users className="h-5 w-5 text-primary" />
        <h1 className="font-display text-xl font-bold">Klantaccounts</h1>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Unieke klanten", value: accounts.length, icon: Users },
          { label: "Totaal bestellingen", value: accounts.reduce((s, a) => s + a.order_count, 0), icon: ShoppingBag },
          { label: "Totale omzet", value: `€${accounts.reduce((s, a) => s + a.total_spent, 0).toFixed(2)}`, icon: TrendingUp },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">{s.label}</p>
            <p className="font-display text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {isLoading ? (
          <p className="p-6 text-sm text-muted-foreground font-body">Laden...</p>
        ) : error ? (
          <p className="p-6 text-sm text-destructive font-body">Fout bij laden.</p>
        ) : accounts.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <Mail className="h-10 w-10 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground font-body">Nog geen klanten gevonden.</p>
          </div>
        ) : (
          <table className="w-full text-sm font-body">
            <thead className="border-b border-border bg-secondary/30">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Naam</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Bestellingen</th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Omzet</th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Laatste bestelling</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {accounts.map(acc => (
                <tr key={acc.email} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3 font-medium">{acc.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{acc.email}</td>
                  <td className="px-4 py-3 text-right">{acc.order_count}</td>
                  <td className="px-4 py-3 text-right font-semibold">€{acc.total_spent.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">
                    {format(new Date(acc.last_order_at), "d MMM yyyy", { locale: nl })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminAccounts;
