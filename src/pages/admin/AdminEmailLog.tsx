import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Send, Search, Filter, AlertTriangle, CheckCircle, Clock, Mail, TrendingUp } from "lucide-react";

interface EmailLogEntry {
  id: string;
  type: "confirmation" | "shipped" | "contact" | "newsletter" | "abandoned";
  recipient: string;
  subject: string;
  status: "sent" | "failed";
  resend_id: string | null;
  order_number: string | null;
  language: string | null;
  created_at: string;
}

const typeColors: Record<string, string> = {
  confirmation: "bg-green-50 text-green-700",
  shipped: "bg-blue-50 text-blue-700",
  contact: "bg-purple-50 text-purple-700",
  newsletter: "bg-amber-50 text-amber-700",
  abandoned: "bg-red-50 text-red-700",
};

const typeLabels: Record<string, string> = {
  confirmation: "Bevestiging",
  shipped: "Verzonden",
  contact: "Contact",
  newsletter: "Nieuwsbrief",
  abandoned: "Abandoned",
};

const statusColors: Record<string, string> = {
  sent: "bg-green-50 text-green-700",
  failed: "bg-red-50 text-red-700",
};

const statusLabels: Record<string, string> = {
  sent: "Verzonden",
  failed: "Mislukt",
};

const langLabels: Record<string, string> = {
  nl: "NL",
  en: "EN",
  de: "DE",
  fr: "FR",
};

function isToday(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  return d.toDateString() === now.toDateString();
}

function isThisWeek(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 7);
  return d >= weekAgo && d <= now;
}

export default function AdminEmailLog() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const { data: emails = [], isLoading } = useQuery({
    queryKey: ["admin-email-log"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("email_log")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as EmailLogEntry[];
    },
    refetchInterval: 30000,
  });

  const stats = useMemo(() => {
    const sentToday = emails.filter(e => e.status === "sent" && isToday(e.created_at)).length;
    const sentThisWeek = emails.filter(e => e.status === "sent" && isThisWeek(e.created_at)).length;
    const failedCount = emails.filter(e => e.status === "failed").length;
    return { sentToday, sentThisWeek, failedCount };
  }, [emails]);

  const filtered = useMemo(() => {
    let list = emails;
    if (typeFilter !== "all") {
      list = list.filter(e => e.type === typeFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(e =>
        e.recipient.toLowerCase().includes(q) ||
        e.subject.toLowerCase().includes(q)
      );
    }
    return list;
  }, [emails, typeFilter, search]);

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Email Log</h1>
        <p className="text-sm text-muted-foreground font-body mt-1">
          Overzicht van alle verstuurde emails
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Mail className="h-4 w-4" />
            <span className="text-xs font-body">Vandaag verzonden</span>
          </div>
          <p className="text-2xl font-bold font-display text-foreground">{stats.sentToday}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs font-body">Deze week verzonden</span>
          </div>
          <p className="text-2xl font-bold font-display text-foreground">{stats.sentThisWeek}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs font-body">Mislukt</span>
          </div>
          <p className={`text-2xl font-bold font-display ${stats.failedCount > 0 ? "text-red-600" : "text-foreground"}`}>
            {stats.failedCount}
          </p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Zoek op email of onderwerp..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 h-10 rounded-lg border border-border bg-card text-sm font-body focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="pl-10 pr-8 h-10 rounded-lg border border-border bg-card text-sm font-body focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none cursor-pointer"
          >
            <option value="all">Alle types</option>
            {Object.entries(typeLabels).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Email log table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide font-body">Datum</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide font-body">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide font-body">Ontvanger</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide font-body">Onderwerp</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide font-body">Status</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide font-body">Taal</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-12 text-muted-foreground font-body text-sm">Laden...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-muted-foreground font-body text-sm">
                  <Send className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  Geen emails gevonden
                </td></tr>
              ) : (
                filtered.map(entry => (
                  <tr key={entry.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-sm font-body text-muted-foreground whitespace-nowrap">
                        {new Date(entry.created_at).toLocaleDateString("nl-NL", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                        <span className="ml-1 text-xs">
                          {new Date(entry.created_at).toLocaleTimeString("nl-NL", {
                            hour: "2-digit", minute: "2-digit",
                          })}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${typeColors[entry.type] ?? "bg-gray-50 text-gray-700"}`}>
                        {typeLabels[entry.type] ?? entry.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-body font-medium text-foreground">{entry.recipient}</span>
                      {entry.order_number && (
                        <p className="text-xs font-body text-muted-foreground">#{entry.order_number}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-body text-muted-foreground">{entry.subject}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[entry.status] ?? "bg-gray-50 text-gray-700"}`}>
                        {entry.status === "sent" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <AlertTriangle className="h-3 w-3" />
                        )}
                        {statusLabels[entry.status] ?? entry.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs font-body font-medium text-muted-foreground uppercase">
                        {entry.language ? (langLabels[entry.language] ?? entry.language.toUpperCase()) : "—"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-border bg-muted/20">
            <p className="text-xs text-muted-foreground font-body">
              {filtered.length} {filtered.length === 1 ? "email" : "emails"}
              {typeFilter !== "all" && ` — type: ${typeLabels[typeFilter] ?? typeFilter}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
