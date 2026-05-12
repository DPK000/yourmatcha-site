import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import {
  Briefcase,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  Copy,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

type AppStatus = "pending" | "approved" | "rejected";

interface B2BApp {
  id: string;
  company_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  website: string | null;
  company_type: string;
  country: string;
  city: string;
  monthly_volume: string;
  business_number: string | null;
  message: string | null;
  status: AppStatus;
  created_at: string;
}

const statusBadge: Record<
  AppStatus,
  { label: string; cls: string; icon: React.ElementType }
> = {
  pending: {
    label: "In behandeling",
    cls: "bg-yellow-100 text-yellow-700 border-yellow-200",
    icon: Clock,
  },
  approved: {
    label: "Goedgekeurd",
    cls: "bg-green-100 text-green-700 border-green-200",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Afgewezen",
    cls: "bg-red-100 text-red-700 border-red-200",
    icon: XCircle,
  },
};

const typeLabels: Record<string, string> = {
  retailer: "Retailer",
  distributor: "Distributor",
  reseller: "Reseller",
  other: "Other",
};

function generatePassword(length = 8): string {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let pw = "";
  for (let i = 0; i < length; i++) {
    pw += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pw;
}

const AdminB2B = () => {
  const qc = useQueryClient();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [approveDialog, setApproveDialog] = useState<B2BApp | null>(null);
  const [discount, setDiscount] = useState(30);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [approveSuccess, setApproveSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const { data: apps = [], isLoading, refetch } = useQuery({
    queryKey: ["admin-b2b"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("b2b_applications")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as B2BApp[];
    },
    staleTime: 30_000,
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: AppStatus }) => {
      const { error } = await supabase
        .from("b2b_applications")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-b2b"] }),
  });

  const approveMutation = useMutation({
    mutationFn: async ({
      app,
      discountPercent,
    }: {
      app: B2BApp;
      discountPercent: number;
    }) => {
      const password = generatePassword();
      setGeneratedPassword(password);

      // Update application status
      const { error: statusErr } = await supabase
        .from("b2b_applications")
        .update({ status: "approved" })
        .eq("id", app.id);
      if (statusErr) throw statusErr;

      // Create or update customer account with B2B flag
      const { error: accountErr } = await supabase
        .from("customer_accounts")
        .upsert(
          {
            email: app.email.toLowerCase().trim(),
            first_name: app.first_name,
            last_name: app.last_name,
            password_hash: password, // plain text for admin to share; ideally hash in production
            is_b2b: true,
            b2b_discount_percent: discountPercent,
          },
          { onConflict: "email" }
        );
      if (accountErr) throw accountErr;

      return password;
    },
    onSuccess: () => {
      setApproveSuccess(true);
      qc.invalidateQueries({ queryKey: ["admin-b2b"] });
    },
  });

  const counts = {
    total: apps.length,
    pending: apps.filter((a) => a.status === "pending").length,
    approved: apps.filter((a) => a.status === "approved").length,
    rejected: apps.filter((a) => a.status === "rejected").length,
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="h-5 w-5 text-primary" />
        <h1 className="font-display text-xl font-bold">B2B Partners</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Totaal", value: counts.total, cls: "text-foreground" },
          {
            label: "In behandeling",
            value: counts.pending,
            cls: "text-yellow-600",
          },
          { label: "Goedgekeurd", value: counts.approved, cls: "text-green-600" },
          { label: "Afgewezen", value: counts.rejected, cls: "text-red-500" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border bg-card p-4"
          >
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">
              {s.label}
            </p>
            <p className={`font-display text-2xl font-bold ${s.cls}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Approve dialog */}
      {approveDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-card rounded-2xl border border-border shadow-lg p-6 w-full max-w-md mx-4">
            {approveSuccess ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <h3 className="font-display font-bold">Partner goedgekeurd!</h3>
                </div>
                <p className="text-sm font-body text-muted-foreground">
                  Account aangemaakt voor{" "}
                  <strong>{approveDialog.email}</strong> met{" "}
                  <strong>{discount}%</strong> B2B korting.
                </p>
                <div className="rounded-lg bg-secondary/40 p-4 space-y-2">
                  <p className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wider">
                    Wachtwoord (stuur naar partner)
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm font-mono bg-background rounded px-3 py-2 border border-border">
                      {generatedPassword}
                    </code>
                    <button
                      onClick={handleCopyPassword}
                      className="p-2 rounded-lg hover:bg-secondary transition-colors"
                      title="Kopieer"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  {copied && (
                    <p className="text-xs text-green-600 font-body">
                      Gekopieerd!
                    </p>
                  )}
                </div>
                <button
                  onClick={() => {
                    setApproveDialog(null);
                    setApproveSuccess(false);
                    setGeneratedPassword("");
                    setDiscount(30);
                  }}
                  className="w-full rounded-xl bg-primary text-primary-foreground py-2.5 text-sm font-body font-semibold hover:bg-primary/90 transition-colors"
                >
                  Sluiten
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-display font-bold">
                  {approveDialog.company_name} goedkeuren
                </h3>
                <p className="text-sm font-body text-muted-foreground">
                  Stel het B2B kortingspercentage in voor deze partner.
                </p>
                <div>
                  <label className="block text-xs font-body font-medium mb-1.5">
                    Kortingspercentage (%)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={50}
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="w-full rounded-xl border border-border px-4 py-3 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setApproveDialog(null);
                      setDiscount(30);
                    }}
                    className="flex-1 rounded-xl border border-border py-2.5 text-sm font-body font-semibold hover:bg-secondary transition-colors"
                  >
                    Annuleren
                  </button>
                  <button
                    onClick={() =>
                      approveMutation.mutate({
                        app: approveDialog,
                        discountPercent: discount,
                      })
                    }
                    disabled={approveMutation.isPending}
                    className="flex-1 rounded-xl bg-green-600 text-white py-2.5 text-sm font-body font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {approveMutation.isPending
                      ? "Bezig..."
                      : "Goedkeuren"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Applications list */}
      {isLoading ? (
        <p className="text-sm text-muted-foreground font-body">Laden...</p>
      ) : apps.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center rounded-xl border border-border bg-card">
          <Users className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground font-body">
            Nog geen B2B aanmeldingen.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {apps.map((app) => {
            const badge = statusBadge[app.status];
            const Icon = badge.icon;
            const isExpanded = expandedId === app.id;

            return (
              <div
                key={app.id}
                className="rounded-xl border border-border bg-card"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-display font-semibold text-sm">
                          {app.company_name}
                        </p>
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badge.cls}`}
                        >
                          <Icon className="h-3 w-3" />
                          {badge.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground/60 font-body bg-secondary/60 rounded-full px-2 py-0.5">
                          {typeLabels[app.company_type] || app.company_type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground font-body">
                        {app.first_name} {app.last_name} &middot; {app.email}
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground font-body">
                        <span>
                          {app.city}, {app.country}
                        </span>
                        <span>Volume: {app.monthly_volume}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground/60 font-body">
                        {format(
                          new Date(app.created_at),
                          "d MMM yyyy 'om' HH:mm",
                          { locale: nl }
                        )}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 shrink-0 flex-wrap">
                      <button
                        onClick={() =>
                          setExpandedId(isExpanded ? null : app.id)
                        }
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary text-foreground border border-border text-xs font-semibold hover:bg-secondary/80 transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" />
                        )}
                        Details
                      </button>
                      {app.status !== "approved" && (
                        <button
                          onClick={() => {
                            setApproveDialog(app);
                            setApproveSuccess(false);
                            setGeneratedPassword("");
                            setDiscount(30);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 border border-green-200 text-xs font-semibold hover:bg-green-100 transition-colors"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Goedkeuren
                        </button>
                      )}
                      {app.status !== "rejected" && (
                        <button
                          onClick={() =>
                            updateStatus.mutate({
                              id: app.id,
                              status: "rejected",
                            })
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 text-xs font-semibold hover:bg-red-100 transition-colors"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          Afwijzen
                        </button>
                      )}
                      <button
                        onClick={async () => {
                          if (!confirm("Weet je zeker dat je deze aanvraag wilt verwijderen?")) return;
                          await supabase.from("b2b_applications").delete().eq("id", app.id);
                          refetch();
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 text-xs font-semibold hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Verwijderen
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-border p-5 bg-secondary/20 rounded-b-xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-body">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                          Bedrijfsnaam
                        </p>
                        <p className="font-medium">{app.company_name}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                          Contactpersoon
                        </p>
                        <p className="font-medium">
                          {app.first_name} {app.last_name}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                          Email
                        </p>
                        <p>{app.email}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                          Telefoon
                        </p>
                        <p>{app.phone}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                          Website
                        </p>
                        <p>{app.website || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                          Type
                        </p>
                        <p>
                          {typeLabels[app.company_type] || app.company_type}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                          Locatie
                        </p>
                        <p>
                          {app.city}, {app.country}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                          Maandelijks volume
                        </p>
                        <p>{app.monthly_volume}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                          KvK / BTW-nr
                        </p>
                        <p>{app.business_number || "—"}</p>
                      </div>
                      {app.message && (
                        <div className="sm:col-span-2">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                            Bericht / motivatie
                          </p>
                          <p className="text-xs leading-relaxed italic text-muted-foreground">
                            "{app.message}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminB2B;
