import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Pencil, X, Save, Loader2, CircleDollarSign } from "lucide-react";
import { CurrencySetting } from "@/hooks/useCurrency";

const inputClass = "w-full rounded-lg border border-border px-3 py-2 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40 bg-background transition-colors";
const labelClass = "block text-xs font-body font-medium text-muted-foreground mb-1";

const ROUNDING_MODES: { value: CurrencySetting["rounding_mode"]; label: string }[] = [
  { value: "none",  label: "Geen (€13.95 → exact)" },
  { value: "x.95",  label: "x.95 (psychologisch: $14.95)" },
  { value: "x.99",  label: "x.99 (psychologisch: $14.99)" },
  { value: "round", label: "Afronden (kr 15)" },
];

function applyRounding(raw: number, mode: CurrencySetting["rounding_mode"]): number {
  if (mode === "none") return Math.round(raw * 100) / 100;
  if (mode === "round") return Math.round(raw);
  const ending = mode === "x.95" ? 0.95 : 0.99;
  const base = Math.floor(raw);
  const candidate = base + ending;
  return candidate >= raw ? candidate : candidate + 1;
}

const PREVIEW_EUR = 13.95;

const AdminCurrencies = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<CurrencySetting | null>(null);
  const [formData, setFormData] = useState<Partial<CurrencySetting>>({});

  const { data: currencies = [], isLoading } = useQuery({
    queryKey: ["admin-currency-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("currency_settings")
        .select("*")
        .order("currency_code");
      if (error) throw error;
      return data as CurrencySetting[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updated: Partial<CurrencySetting> & { id: string }) => {
      const { id, ...rest } = updated;
      const { error } = await supabase
        .from("currency_settings")
        .update({ ...rest, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-currency-settings"] });
      queryClient.invalidateQueries({ queryKey: ["currency-settings"] });
      setEditing(null);
    },
  });

  function openEdit(currency: CurrencySetting) {
    setEditing(currency);
    setFormData({ ...currency });
  }

  function closeEdit() {
    setEditing(null);
    setFormData({});
  }

  function setField<K extends keyof CurrencySetting>(key: K, value: CurrencySetting[K]) {
    setFormData(prev => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!editing) return;
    await updateMutation.mutateAsync({ ...formData, id: editing.id } as CurrencySetting & { id: string });
  }

  async function toggleEnabled(currency: CurrencySetting) {
    await updateMutation.mutateAsync({ id: currency.id, enabled: !currency.enabled });
  }

  // Live preview
  const previewRate = typeof formData.exchange_rate === "number" ? formData.exchange_rate : 1;
  const previewMode = (formData.rounding_mode ?? "none") as CurrencySetting["rounding_mode"];
  const previewSymbol = formData.currency_symbol ?? "€";
  const previewConverted = applyRounding(PREVIEW_EUR * previewRate, previewMode);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <CircleDollarSign className="h-5 w-5 text-primary" />
        <div>
          <h1 className="font-display text-xl font-bold">Valuta</h1>
          <p className="text-sm text-muted-foreground font-body">Beheer valutakoersen en afronding</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="text-left px-4 py-3 font-semibold">Code</th>
                <th className="text-left px-4 py-3 font-semibold">Naam</th>
                <th className="text-left px-4 py-3 font-semibold">Koers (v/a EUR)</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Afronding</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Landen</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Preview</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {currencies.map(currency => {
                const converted = applyRounding(PREVIEW_EUR * currency.exchange_rate, currency.rounding_mode);
                return (
                  <tr key={currency.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-mono font-semibold">{currency.currency_symbol}</span>{" "}
                      <span className="text-muted-foreground">{currency.currency_code}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{currency.currency_symbol}</td>
                    <td className="px-4 py-3 font-mono">{currency.exchange_rate.toFixed(6)}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{currency.rounding_mode}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground text-xs">
                      {currency.currency_code}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground text-xs">
                      €{PREVIEW_EUR} → {currency.currency_symbol}{converted.toFixed(currency.rounding_mode === "round" ? 0 : 2)}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleEnabled(currency)}
                        disabled={updateMutation.isPending}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                          currency.enabled ? "bg-primary" : "bg-border"
                        }`}
                        aria-label={currency.enabled ? "Uitschakelen" : "Inschakelen"}
                      >
                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                          currency.enabled ? "translate-x-4" : "translate-x-1"
                        }`} />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(currency)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-2xl border border-border w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-display font-semibold">{editing.currency_code} bewerken</h2>
              <button onClick={closeEdit} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Live preview */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-center justify-between">
                <span className="text-sm font-body text-muted-foreground">Live voorbeeld</span>
                <span className="font-body font-semibold text-primary">
                  €{PREVIEW_EUR} → {previewSymbol}{previewConverted.toFixed(previewMode === "round" ? 0 : 2)}
                </span>
              </div>

              <div>
                <label className={labelClass}>Wisselkoers (vermenigvuldiger v/a EUR)</label>
                <input
                  type="number"
                  step="0.000001"
                  min="0.000001"
                  className={inputClass}
                  value={formData.exchange_rate ?? 1}
                  onChange={e => setField("exchange_rate", parseFloat(e.target.value) || 1)}
                />
              </div>

              <div>
                <label className={labelClass}>Afrondingsmodus</label>
                <select
                  className={inputClass}
                  value={formData.rounding_mode ?? "none"}
                  onChange={e => setField("rounding_mode", e.target.value as CurrencySetting["rounding_mode"])}
                >
                  {ROUNDING_MODES.map(m => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-body cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.enabled ?? true}
                    onChange={e => setField("enabled", e.target.checked)}
                    className="rounded border-border"
                  />
                  Valuta ingeschakeld
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-5 border-t border-border">
              <Button variant="outline" onClick={closeEdit}>Annuleren</Button>
              <Button onClick={handleSave} disabled={updateMutation.isPending}>
                {updateMutation.isPending ? (
                  <><Loader2 className="h-4 w-4 animate-spin mr-2" />Opslaan...</>
                ) : (
                  <><Save className="h-4 w-4 mr-2" />Opslaan</>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCurrencies;
