import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Mail, Globe, Calendar, Search, Download, Users, TrendingUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const countryNames: Record<string, string> = {
  NL: "🇳🇱 Nederland", BE: "🇧🇪 België", DE: "🇩🇪 Duitsland", FR: "🇫🇷 Frankrijk",
  GB: "🇬🇧 Verenigd Koninkrijk", US: "🇺🇸 Verenigde Staten", CA: "🇨🇦 Canada",
  AT: "🇦🇹 Oostenrijk", CH: "🇨🇭 Zwitserland", ES: "🇪🇸 Spanje", IT: "🇮🇹 Italië",
  PT: "🇵🇹 Portugal", SE: "🇸🇪 Zweden", DK: "🇩🇰 Denemarken", NO: "🇳🇴 Noorwegen",
  FI: "🇫🇮 Finland", PL: "🇵🇱 Polen", CZ: "🇨🇿 Tsjechië", IE: "🇮🇪 Ierland",
  LU: "🇱🇺 Luxemburg", AU: "🇦🇺 Australië", NZ: "🇳🇿 Nieuw-Zeeland",
};

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  country: string | null;
  language: string | null;
  subscribed_at: string;
  welcome_email_sent: boolean;
  source: string | null;
}

export default function AdminNewsletter() {
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");

  const { data: subscribers = [], isLoading } = useQuery({
    queryKey: ["admin-newsletter"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });
      if (error) throw error;
      return data as Subscriber[];
    },
  });

  // Get unique countries for filter
  const countries = useMemo(() => {
    const set = new Set(subscribers.map(s => s.country).filter(Boolean));
    return Array.from(set).sort() as string[];
  }, [subscribers]);

  // Country stats
  const countryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    subscribers.forEach(s => {
      const c = s.country || "Onbekend";
      stats[c] = (stats[c] || 0) + 1;
    });
    return Object.entries(stats).sort((a, b) => b[1] - a[1]);
  }, [subscribers]);

  // Filtered list
  const filtered = useMemo(() => {
    let list = subscribers;
    if (countryFilter !== "all") {
      list = list.filter(s => s.country === countryFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(s =>
        s.email.toLowerCase().includes(q) ||
        (s.name || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [subscribers, countryFilter, search]);

  // Export CSV
  function exportCSV() {
    const rows = [
      ["Email", "Naam", "Land", "Taal", "Ingeschreven op", "Welkomstmail", "Bron"],
      ...filtered.map(s => [
        s.email,
        s.name || "",
        s.country || "",
        s.language || "",
        new Date(s.subscribed_at).toLocaleDateString("nl-NL"),
        s.welcome_email_sent ? "Ja" : "Nee",
        s.source || "",
      ]),
    ];
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nieuwsbrief-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Nieuwsbrief</h1>
          <p className="text-sm text-muted-foreground font-body mt-1">
            Beheer je nieuwsbrief aanmeldingen
          </p>
        </div>
        <Button onClick={exportCSV} variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Exporteer CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Users className="h-4 w-4" />
            <span className="text-xs font-body">Totaal</span>
          </div>
          <p className="text-2xl font-bold font-display text-foreground">{subscribers.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Mail className="h-4 w-4" />
            <span className="text-xs font-body">Welkomstmail verstuurd</span>
          </div>
          <p className="text-2xl font-bold font-display text-foreground">
            {subscribers.filter(s => s.welcome_email_sent).length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Globe className="h-4 w-4" />
            <span className="text-xs font-body">Landen</span>
          </div>
          <p className="text-2xl font-bold font-display text-foreground">{countries.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs font-body">Deze maand</span>
          </div>
          <p className="text-2xl font-bold font-display text-foreground">
            {subscribers.filter(s => {
              const d = new Date(s.subscribed_at);
              const now = new Date();
              return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            }).length}
          </p>
        </div>
      </div>

      {/* Country breakdown */}
      {countryStats.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold font-body text-foreground mb-3 flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            Aanmeldingen per land
          </h3>
          <div className="flex flex-wrap gap-2">
            {countryStats.map(([country, count]) => (
              <button
                key={country}
                onClick={() => setCountryFilter(countryFilter === country ? "all" : country)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  countryFilter === country
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {countryNames[country] || `🌍 ${country}`}
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  countryFilter === country ? "bg-primary-foreground/20" : "bg-background"
                }`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Zoek op email of naam..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 h-10 rounded-lg border border-border bg-card text-sm font-body focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <select
            value={countryFilter}
            onChange={e => setCountryFilter(e.target.value)}
            className="pl-10 pr-8 h-10 rounded-lg border border-border bg-card text-sm font-body focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none cursor-pointer"
          >
            <option value="all">Alle landen</option>
            {countries.map(c => (
              <option key={c} value={c}>{countryNames[c] || c} ({countryStats.find(s => s[0] === c)?.[1] || 0})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Subscribers table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide font-body">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide font-body">Naam</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide font-body">Land</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide font-body">Ingeschreven</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide font-body">Welkomstmail</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="text-center py-12 text-muted-foreground font-body text-sm">Laden...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-12 text-muted-foreground font-body text-sm">Geen subscribers gevonden</td></tr>
              ) : (
                filtered.map(sub => (
                  <tr key={sub.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-sm font-body font-medium text-foreground">{sub.email}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-body text-muted-foreground">{sub.name || "—"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-body">
                        {sub.country ? (countryNames[sub.country] || sub.country) : "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-body text-muted-foreground">
                        {new Date(sub.subscribed_at).toLocaleDateString("nl-NL", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {sub.welcome_email_sent ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 rounded-full px-2 py-0.5">
                          ✓ Verstuurd
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 rounded-full px-2 py-0.5">
                          Wacht
                        </span>
                      )}
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
              {filtered.length} {filtered.length === 1 ? "subscriber" : "subscribers"}
              {countryFilter !== "all" && ` in ${countryNames[countryFilter] || countryFilter}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
