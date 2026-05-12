import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase, DbProduct } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Plus, Pencil, Trash2, Loader2, Package, ToggleLeft, ToggleRight, X, Save
} from "lucide-react";

const emptyProduct: Partial<DbProduct> = {
  name: "",
  slug: "",
  category: "main",
  price: 0,
  original_price: undefined,
  image: "",
  description: "",
  short_description: "",
  rating: 4.8,
  review_count: 0,
  badge: "",
  in_stock: true,
  sort_order: 99,
};

const AdminProducts = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<Partial<DbProduct> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data } = await supabase.from("products").select("*").order("sort_order");
      return (data as DbProduct[]) ?? [];
    },
  });

  const openNew = () => setEditing({ ...emptyProduct });
  const openEdit = (p: DbProduct) => setEditing({ ...p });
  const closeEdit = () => setEditing(null);

  async function saveProduct() {
    if (!editing) return;
    setSaving(true);
    try {
      const payload = {
        ...editing,
        slug: editing.slug || editing.name!.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        original_price: editing.original_price || null,
        badge: editing.badge || null,
        updated_at: new Date().toISOString(),
      };
      if (editing.id) {
        await supabase.from("products").update(payload).eq("id", editing.id);
      } else {
        await supabase.from("products").insert(payload);
      }
      await queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      closeEdit();
    } finally {
      setSaving(false);
    }
  }

  async function toggleStock(p: DbProduct) {
    await supabase.from("products").update({ in_stock: !p.in_stock }).eq("id", p.id);
    queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    queryClient.invalidateQueries({ queryKey: ["products"] });
  }

  async function deleteProduct(id: string) {
    if (!confirm("Weet je zeker dat je dit product wilt verwijderen?")) return;
    setDeleting(id);
    await supabase.from("products").delete().eq("id", id);
    await queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    await queryClient.invalidateQueries({ queryKey: ["products"] });
    setDeleting(null);
  }

  const set = (key: keyof DbProduct, value: unknown) =>
    setEditing(e => e ? { ...e, [key]: value } : e);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Producten</h1>
          <p className="text-sm text-muted-foreground font-body mt-1">{products.length} producten</p>
        </div>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4 mr-2" /> Nieuw product
        </Button>
      </div>

      {/* Product list */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground font-body text-sm">
            <Package className="h-8 w-8 mx-auto mb-2 opacity-40" />
            Geen producten gevonden
          </div>
        ) : (
          <>
            <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 px-5 py-3 border-b border-border text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">
              <span>Afb.</span>
              <span>Product</span>
              <span>Prijs</span>
              <span>Categorie</span>
              <span>Voorraad</span>
              <span>Acties</span>
            </div>
            <div className="divide-y divide-border">
              {products.map(product => (
                <div key={product.id} className="flex flex-col md:grid md:grid-cols-[auto_1fr_auto_auto_auto_auto] gap-3 md:gap-4 md:items-center px-5 py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-10 w-10 rounded-lg object-contain bg-secondary/30"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-product.jpg'; }}
                  />
                  <div className="min-w-0">
                    <p className="font-body font-medium text-sm truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground font-body truncate">{product.short_description}</p>
                  </div>
                  <div className="text-sm font-body font-semibold">
                    €{product.price.toFixed(2)}
                    {product.original_price && (
                      <span className="text-xs text-muted-foreground line-through ml-1">€{product.original_price.toFixed(2)}</span>
                    )}
                  </div>
                  <span className="text-xs font-body capitalize px-2 py-0.5 rounded-full bg-secondary text-muted-foreground w-fit">
                    {product.category}
                  </span>
                  <button onClick={() => toggleStock(product)} className="flex items-center gap-1 text-xs font-body">
                    {product.in_stock
                      ? <><ToggleRight className="h-5 w-5 text-green-500" /> <span className="text-green-700">Op voorraad</span></>
                      : <><ToggleLeft className="h-5 w-5 text-red-400" /> <span className="text-red-600">Uitverkocht</span></>
                    }
                  </button>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(product)} className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      disabled={deleting === product.id}
                      className="p-1.5 rounded-md hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600"
                    >
                      {deleting === product.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Edit/Create modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && closeEdit()}>
          <div className="bg-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-display font-bold">{editing.id ? "Product bewerken" : "Nieuw product"}</h2>
              <button onClick={closeEdit} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Naam *</label>
                  <input
                    value={editing.name ?? ""}
                    onChange={e => set("name", e.target.value)}
                    className="w-full rounded-lg border border-border px-3 py-2.5 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                    placeholder="Product naam"
                  />
                </div>
                <div>
                  <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Slug (URL)</label>
                  <input
                    value={editing.slug ?? ""}
                    onChange={e => set("slug", e.target.value)}
                    className="w-full rounded-lg border border-border px-3 py-2.5 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                    placeholder="auto-gegenereerd"
                  />
                </div>
                <div>
                  <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Categorie *</label>
                  <select
                    value={editing.category ?? "main"}
                    onChange={e => set("category", e.target.value)}
                    className="w-full rounded-lg border border-border px-3 py-2.5 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                  >
                    <option value="main">Main</option>
                    <option value="accessories">Accessories</option>
                    <option value="bundle">Bundle</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Prijs (€) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editing.price ?? ""}
                    onChange={e => set("price", parseFloat(e.target.value))}
                    className="w-full rounded-lg border border-border px-3 py-2.5 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Originele prijs (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editing.original_price ?? ""}
                    onChange={e => set("original_price", e.target.value ? parseFloat(e.target.value) : undefined)}
                    className="w-full rounded-lg border border-border px-3 py-2.5 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                    placeholder="Leeg = geen doorgestreepte prijs"
                  />
                </div>
                <div>
                  <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Badge</label>
                  <input
                    value={editing.badge ?? ""}
                    onChange={e => set("badge", e.target.value)}
                    className="w-full rounded-lg border border-border px-3 py-2.5 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                    placeholder="bijv. Bestseller"
                  />
                </div>
                <div>
                  <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Volgorde</label>
                  <input
                    type="number"
                    value={editing.sort_order ?? 99}
                    onChange={e => set("sort_order", parseInt(e.target.value))}
                    className="w-full rounded-lg border border-border px-3 py-2.5 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Afbeelding URL</label>
                  <input
                    value={editing.image ?? ""}
                    onChange={e => set("image", e.target.value)}
                    className="w-full rounded-lg border border-border px-3 py-2.5 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                    placeholder="https://..."
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Korte beschrijving *</label>
                  <input
                    value={editing.short_description ?? ""}
                    onChange={e => set("short_description", e.target.value)}
                    className="w-full rounded-lg border border-border px-3 py-2.5 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                    placeholder="Kort label voor de productkaart"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">Beschrijving *</label>
                  <textarea
                    value={editing.description ?? ""}
                    onChange={e => set("description", e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-border px-3 py-2.5 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40 bg-background resize-none"
                    placeholder="Volledige productbeschrijving"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">Op voorraad</label>
                  <button
                    type="button"
                    onClick={() => set("in_stock", !editing.in_stock)}
                    className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${editing.in_stock ? "bg-primary" : "bg-secondary"}`}
                  >
                    <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform mt-0.5 ${editing.in_stock ? "translate-x-5.5 ml-0.5" : "translate-x-0.5"}`} />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-5 border-t border-border">
              <Button variant="outline" onClick={closeEdit} className="flex-1">Annuleren</Button>
              <Button onClick={saveProduct} disabled={saving} className="flex-1">
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                {editing.id ? "Wijzigingen opslaan" : "Product aanmaken"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
