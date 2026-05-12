import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Award, CheckCircle2, XCircle, Clock, Instagram, MapPin, Users } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

type AppStatus = "pending" | "approved" | "rejected";

interface PartnerApp {
  id: string;
  name: string;
  email: string;
  studio_name?: string;
  instagram?: string;
  city?: string;
  country: string;
  experience_years?: number;
  monthly_clients?: number;
  motivation: string;
  status: AppStatus;
  monthly_credit: number;
  created_at: string;
}

const statusBadge: Record<AppStatus, { label: string; cls: string; icon: React.ElementType }> = {
  pending:  { label: "In behandeling", cls: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Clock },
  approved: { label: "Goedgekeurd",    cls: "bg-green-100 text-green-700 border-green-200",   icon: CheckCircle2 },
  rejected: { label: "Afgewezen",      cls: "bg-red-100 text-red-700 border-red-200",          icon: XCircle },
};

const AdminPartners = () => {
  const qc = useQueryClient();

  const { data: apps = [], isLoading } = useQuery({
    queryKey: ["admin-partners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("partner_applications")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as PartnerApp[];
    },
    staleTime: 30_000,
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: AppStatus }) => {
      const { error } = await supabase
        .from("partner_applications")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-partners"] }),
  });

  const counts = {
    pending: apps.filter(a => a.status === "pending").length,
    approved: apps.filter(a => a.status === "approved").length,
    rejected: apps.filter(a => a.status === "rejected").length,
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Award className="h-5 w-5 text-primary" />
        <h1 className="font-display text-xl font-bold">Ambassador aanmeldingen</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "In behandeling", value: counts.pending, cls: "text-yellow-600" },
          { label: "Goedgekeurd", value: counts.approved, cls: "text-green-600" },
          { label: "Afgewezen", value: counts.rejected, cls: "text-red-500" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`font-display text-2xl font-bold ${s.cls}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground font-body">Laden...</p>
      ) : apps.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center rounded-xl border border-border bg-card">
          <Users className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground font-body">Nog geen aanmeldingen.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {apps.map(app => {
            const badge = statusBadge[app.status];
            const Icon = badge.icon;
            return (
              <div key={app.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-display font-semibold text-sm">{app.name}</p>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badge.cls}`}>
                        <Icon className="h-3 w-3" />{badge.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground font-body">{app.email}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground font-body">
                      {app.studio_name && <span>🏢 {app.studio_name}</span>}
                      {app.instagram && (
                        <span className="flex items-center gap-1">
                          <Instagram className="h-3 w-3" />{app.instagram}
                        </span>
                      )}
                      {app.city && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />{app.city}, {app.country}
                        </span>
                      )}
                      {app.experience_years != null && <span>⏱ {app.experience_years} jaar ervaring</span>}
                      {app.monthly_clients != null && <span>👥 ~{app.monthly_clients} klanten/maand</span>}
                    </div>
                    <p className="text-xs text-muted-foreground font-body border-t border-border/60 pt-2 mt-2 leading-relaxed italic">
                      "{app.motivation.length > 200 ? app.motivation.slice(0, 200) + "…" : app.motivation}"
                    </p>
                    <p className="text-[10px] text-muted-foreground/60 font-body">
                      {format(new Date(app.created_at), "d MMM yyyy 'om' HH:mm", { locale: nl })}
                    </p>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-2 shrink-0">
                    {app.status !== "approved" && (
                      <button
                        onClick={() => updateStatus.mutate({ id: app.id, status: "approved" })}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 border border-green-200 text-xs font-semibold hover:bg-green-100 transition-colors"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />Goedkeuren
                      </button>
                    )}
                    {app.status !== "rejected" && (
                      <button
                        onClick={() => updateStatus.mutate({ id: app.id, status: "rejected" })}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 text-xs font-semibold hover:bg-red-100 transition-colors"
                      >
                        <XCircle className="h-3.5 w-3.5" />Afwijzen
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminPartners;
