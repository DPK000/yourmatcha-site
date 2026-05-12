import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Pencil, X, Save, Loader2, Truck } from "lucide-react";
import { ShippingZone } from "@/hooks/useShipping";

const inputClass = "w-full rounded-lg border border-border px-3 py-2 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40 bg-background transition-colors";
const labelClass = "block text-xs font-body font-medium text-muted-foreground mb-1";

const AdminShipping = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<ShippingZone | null>(null);
  const [formData, setFormData] = useState<Partial<ShippingZone>>({});

  const { data: zones = [], isLoading } = useQuery({
    queryKey: ["admin-shipping-zones"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("shipping_zones")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as ShippingZone[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updated: Partial<ShippingZone> & { id: string }) => {
      const { id, ...rest } = updated;
      const { error } = await supabase
        .from("shipping_zones")
        .update(rest)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-shipping-zones"] });
      queryClient.invalidateQueries({ queryKey: ["shipping-zones"] });
      setEditing(null);
    },
  });

  function openEdit(zone: ShippingZone) {
    setEditing(zone);
    setFormData({ ...zone });
  }

  function closeEdit() {
    setEditing(null);
    setFormData({});
  }

  function setField<K extends keyof ShippingZone>(key: K, value: ShippingZone[K]) {
    setFormData(prev => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!editing) return;
    await updateMutation.mutateAsync({ ...formData, id: editing.id } as ShippingZone & { id: string });
  }

  async function toggleEnabled(zone: ShippingZone) {
    await updateMutation.mutateAsync({ id: zone.id, is_enabled: !zone.is_enabled });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Truck className="h-5 w-5 text-primary" />
        <div>
          <h1 className="font-display text-xl font-bold">Verzending &amp; BTW</h1>
          <p className="text-sm text-muted-foreground font-body">Beheer verzendkosten per land/regio</p>
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
                <th className="text-left px-4 py-3 font-semibold">Zone</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Landen</th>
                <th className="text-left px-4 py-3 font-semibold">Kosten</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Gratis vanaf</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Levertijd</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">BTW</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {zones.map(zone => (
                <tr key={zone.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3 font-medium">{zone.name}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {zone.country_codes.length === 0 ? (
                        <span className="text-xs text-muted-foreground italic">Alle overige</span>
                      ) : (
                        zone.country_codes.slice(0, 5).map(cc => (
                          <span key={cc} className="px-1.5 py-0.5 bg-secondary rounded text-[10px] font-mono">{cc}</span>
                        ))
                      )}
                      {zone.country_codes.length > 5 && (
                        <span className="text-xs text-muted-foreground">+{zone.country_codes.length - 5}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">€{zone.shipping_cost_eur.toFixed(2)}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {zone.free_threshold_eur !== null ? (
                      <span className="inline-flex items-center gap-1 text-green-700 text-xs font-medium">
                        Gratis verzending v/a €{zone.free_threshold_eur.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs">Nooit gratis</span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">
                    {zone.estimated_days_min}–{zone.estimated_days_max} dgn
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                    {zone.tax_rate}%{zone.tax_included ? " incl." : " excl."}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleEnabled(zone)}
                      disabled={updateMutation.isPending}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                        zone.is_enabled ? "bg-primary" : "bg-border"
                      }`}
                      aria-label={zone.is_enabled ? "Uitschakelen" : "Inschakelen"}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                        zone.is_enabled ? "translate-x-4" : "translate-x-1"
                      }`} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(zone)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-2xl border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-display font-semibold">{editing.name} bewerken</h2>
              <button onClick={closeEdit} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className={labelClass}>Zone naam</label>
                <input
                  className={inputClass}
                  value={formData.name ?? ""}
                  onChange={e => setField("name", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Landcodes (komma-gescheiden, bijv. NL,BE,DE)</label>
                <input
                  className={inputClass}
                  value={(formData.country_codes ?? []).join(",")}
                  onChange={e => setField("country_codes", e.target.value.split(",").map(s => s.trim().toUpperCase()).filter(Boolean))}
                  placeholder="Leeg = alle overige landen"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Verzendkosten (EUR)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className={inputClass}
                    value={formData.shipping_cost_eur ?? 0}
                    onChange={e => setField("shipping_cost_eur", parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Gratis drempel (EUR, leeg = nooit)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className={inputClass}
                    value={formData.free_threshold_eur ?? ""}
                    onChange={e => setField("free_threshold_eur", e.target.value === "" ? null : parseFloat(e.target.value))}
                    placeholder="Leeg = nooit gratis"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Min. levertijd (dagen)</label>
                  <input
                    type="number"
                    min="0"
                    className={inputClass}
                    value={formData.estimated_days_min ?? 0}
                    onChange={e => setField("estimated_days_min", parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Max. levertijd (dagen)</label>
                  <input
                    type="number"
                    min="0"
                    className={inputClass}
                    value={formData.estimated_days_max ?? 0}
                    onChange={e => setField("estimated_days_max", parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>BTW-tarief (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    className={inputClass}
                    value={formData.tax_rate ?? 0}
                    onChange={e => setField("tax_rate", parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 text-sm font-body cursor-pointer pb-2">
                    <input
                      type="checkbox"
                      checked={formData.tax_included ?? true}
                      onChange={e => setField("tax_included", e.target.checked)}
                      className="rounded border-border"
                    />
                    BTW inbegrepen in prijs
                  </label>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-body cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_enabled ?? true}
                    onChange={e => setField("is_enabled", e.target.checked)}
                    className="rounded border-border"
                  />
                  Zone ingeschakeld
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

export default AdminShipping;
