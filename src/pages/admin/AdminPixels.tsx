import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash2, ToggleLeft, ToggleRight, Save, Code2, Eye } from "lucide-react";

interface Pixel {
  id: string;
  type: string;
  pixel_id: string;
  extra_config: Record<string, string>;
  enabled: boolean;
  created_at: string;
}

const PIXEL_TYPES = [
  {
    type: "gtm",
    label: "Google Tag Manager",
    icon: "🏷️",
    placeholder: "GTM-XXXXXXX",
    description: "Container ID van Google Tag Manager",
    fields: [],
  },
  {
    type: "ga4",
    label: "Google Analytics 4",
    icon: "📊",
    placeholder: "G-XXXXXXXXXX",
    description: "Measurement ID van GA4",
    fields: [],
  },
  {
    type: "google_ads",
    label: "Google Ads",
    icon: "📣",
    placeholder: "AW-XXXXXXXXX",
    description: "Conversion ID van Google Ads",
    fields: [
      { key: "conversion_label", label: "Purchase Conversion Label", placeholder: "aBcDeFgHiJk" },
    ],
  },
  {
    type: "meta_pixel",
    label: "Meta Pixel (Facebook)",
    icon: "📘",
    placeholder: "123456789012345",
    description: "Pixel ID van Facebook/Instagram",
    fields: [],
  },
  {
    type: "tiktok_pixel",
    label: "TikTok Pixel",
    icon: "🎵",
    placeholder: "XXXXXXXXXXXXXXXXX",
    description: "Pixel ID van TikTok",
    fields: [],
  },
  {
    type: "hotjar",
    label: "Hotjar",
    icon: "🔥",
    placeholder: "1234567",
    description: "Site ID van Hotjar",
    fields: [],
  },
  {
    type: "pinterest",
    label: "Pinterest Tag",
    icon: "📌",
    placeholder: "1234567890123",
    description: "Tag ID van Pinterest",
    fields: [],
  },
  {
    type: "clarity",
    label: "Microsoft Clarity",
    icon: "🔍",
    placeholder: "w0wyd1t76m",
    description: "Project ID van Microsoft Clarity",
    fields: [],
  },
  {
    type: "snapchat",
    label: "Snapchat Pixel",
    icon: "👻",
    placeholder: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    description: "Pixel ID van Snapchat",
    fields: [],
  },
  {
    type: "custom_head",
    label: "Custom Script (Head)",
    icon: "🔧",
    placeholder: "<script>...</script>",
    description: "Eigen script in de <head> — bijv. Klaviyo, Crisp, etc.",
    fields: [],
    isCode: true,
  },
];

const AdminPixels = () => {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newType, setNewType] = useState(PIXEL_TYPES[0].type);
  const [newId, setNewId] = useState("");
  const [newExtra, setNewExtra] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchPixels();
  }, []);

  async function fetchPixels() {
    setLoading(true);
    const { data } = await supabase
      .from("tracking_pixels")
      .select("*")
      .order("created_at", { ascending: true });
    setPixels((data as Pixel[]) || []);
    setLoading(false);
  }

  async function addPixel() {
    if (!newId.trim()) return;
    setSaving(true);
    const { error } = await supabase.from("tracking_pixels").insert({
      type: newType,
      pixel_id: newId.trim(),
      extra_config: newExtra,
      enabled: true,
    });
    if (!error) {
      await fetchPixels();
      setNewId("");
      setNewExtra({});
      setShowAdd(false);
    }
    setSaving(false);
  }

  async function togglePixel(id: string, enabled: boolean) {
    await supabase.from("tracking_pixels").update({ enabled: !enabled }).eq("id", id);
    setPixels(prev => prev.map(p => p.id === id ? { ...p, enabled: !enabled } : p));
  }

  async function deletePixel(id: string) {
    if (!confirm("Weet je zeker dat je deze pixel wilt verwijderen?")) return;
    await supabase.from("tracking_pixels").delete().eq("id", id);
    setPixels(prev => prev.filter(p => p.id !== id));
  }

  async function updatePixelId(id: string, pixelId: string) {
    await supabase.from("tracking_pixels").update({ pixel_id: pixelId }).eq("id", id);
    setPixels(prev => prev.map(p => p.id === id ? { ...p, pixel_id: pixelId } : p));
  }

  async function updateExtraConfig(id: string, key: string, value: string) {
    const pixel = pixels.find(p => p.id === id);
    if (!pixel) return;
    const updated = { ...pixel.extra_config, [key]: value };
    await supabase.from("tracking_pixels").update({ extra_config: updated }).eq("id", id);
    setPixels(prev => prev.map(p => p.id === id ? { ...p, extra_config: updated } : p));
  }

  const selectedType = PIXEL_TYPES.find(t => t.type === newType);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Pixel Manager</h1>
          <p className="text-sm text-muted-foreground font-body mt-1">
            Beheer je tracking pixels en analytics codes
          </p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} variant={showAdd ? "outline" : "default"}>
          {showAdd ? "Annuleren" : <><Plus className="h-4 w-4 mr-2" /> Pixel toevoegen</>}
        </Button>
      </div>

      {/* Add new pixel */}
      {showAdd && (
        <div className="rounded-xl border border-primary/20 bg-primary/[0.02] p-5 space-y-4">
          <h3 className="font-display font-semibold text-sm">Nieuwe pixel toevoegen</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-body font-medium text-muted-foreground mb-1 block">Type</label>
              <select
                value={newType}
                onChange={e => { setNewType(e.target.value); setNewExtra({}); }}
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm font-body bg-background"
              >
                {PIXEL_TYPES.map(t => (
                  <option key={t.type} value={t.type}>{t.icon} {t.label}</option>
                ))}
              </select>
              {selectedType && (
                <p className="text-[11px] text-muted-foreground mt-1 font-body">{selectedType.description}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-body font-medium text-muted-foreground mb-1 block">
                {selectedType?.isCode ? "Script code" : "Pixel / Tracking ID"}
              </label>
              {selectedType?.isCode ? (
                <textarea
                  value={newId}
                  onChange={e => setNewId(e.target.value)}
                  placeholder={selectedType.placeholder}
                  rows={3}
                  className="w-full rounded-lg border border-border px-3 py-2.5 text-sm font-mono bg-background resize-none"
                />
              ) : (
                <input
                  value={newId}
                  onChange={e => setNewId(e.target.value)}
                  placeholder={selectedType?.placeholder}
                  className="w-full rounded-lg border border-border px-3 py-2.5 text-sm font-body bg-background"
                />
              )}
            </div>
          </div>
          {/* Extra fields (e.g. Google Ads conversion label) */}
          {selectedType?.fields.map(field => (
            <div key={field.key}>
              <label className="text-xs font-body font-medium text-muted-foreground mb-1 block">{field.label}</label>
              <input
                value={newExtra[field.key] || ""}
                onChange={e => setNewExtra(prev => ({ ...prev, [field.key]: e.target.value }))}
                placeholder={field.placeholder}
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm font-body bg-background"
              />
            </div>
          ))}
          <Button onClick={addPixel} disabled={saving || !newId.trim()}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
            Toevoegen
          </Button>
        </div>
      )}

      {/* Pixel list */}
      {pixels.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <Code2 className="h-12 w-12 text-muted-foreground/40 mx-auto" />
          <p className="text-sm text-muted-foreground font-body">Nog geen pixels toegevoegd</p>
          <p className="text-xs text-muted-foreground/60 font-body">
            Voeg je Google Tag Manager, Analytics, Facebook Pixel of andere tracking codes toe
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {pixels.map(pixel => {
            const typeInfo = PIXEL_TYPES.find(t => t.type === pixel.type);
            return (
              <div
                key={pixel.id}
                className={`rounded-xl border bg-card p-4 transition-all ${
                  pixel.enabled ? "border-border" : "border-border/50 opacity-60"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Icon + type */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-lg shrink-0">
                    {typeInfo?.icon || "🔧"}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold font-body">{typeInfo?.label || pixel.type}</p>
                      <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        pixel.enabled ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                      }`}>
                        {pixel.enabled ? "Actief" : "Uit"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono truncate mt-0.5">
                      {typeInfo?.isCode ? `${pixel.pixel_id.substring(0, 50)}...` : pixel.pixel_id}
                    </p>
                    {/* Show extra config */}
                    {pixel.extra_config && Object.entries(pixel.extra_config).map(([key, val]) => (
                      val && (
                        <p key={key} className="text-[11px] text-muted-foreground font-body mt-0.5">
                          {typeInfo?.fields.find(f => f.key === key)?.label || key}: <span className="font-mono">{val}</span>
                        </p>
                      )
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => togglePixel(pixel.id, pixel.enabled)}
                      className="p-2 rounded-lg hover:bg-secondary transition-colors"
                      title={pixel.enabled ? "Uitschakelen" : "Inschakelen"}
                    >
                      {pixel.enabled
                        ? <ToggleRight className="h-5 w-5 text-green-600" />
                        : <ToggleLeft className="h-5 w-5 text-muted-foreground" />}
                    </button>
                    <button
                      onClick={() => deletePixel(pixel.id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors"
                      title="Verwijderen"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Info box */}
      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <h4 className="text-xs font-semibold font-body uppercase tracking-wider text-muted-foreground mb-2">💡 Hoe werkt het?</h4>
        <ul className="text-xs text-muted-foreground font-body space-y-1">
          <li>• Pixels worden automatisch geladen op alle pagina's van je webshop</li>
          <li>• Google Ads purchase conversions worden automatisch getriggerd na een succesvolle betaling</li>
          <li>• Meta/TikTok/Pinterest pixels tracken automatisch PageView en Purchase events</li>
          <li>• Gebruik de aan/uit toggle om pixels tijdelijk uit te schakelen zonder ze te verwijderen</li>
          <li>• Custom scripts worden in de &lt;head&gt; geïnjecteerd — handig voor Klaviyo, Crisp, etc.</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPixels;
