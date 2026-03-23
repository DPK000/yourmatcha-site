import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { ChevronLeft, Check } from "lucide-react";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(price);

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);

  const shipping = subtotal >= 50 ? 0 : 4.95;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
    toast.success("Bestelling geplaatst! 🍵");
  };

  if (submitted) {
    return (
      <div className="py-20 text-center">
        <div className="container mx-auto px-4 max-w-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <Check className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-3xl font-semibold mb-4">Bedankt voor je bestelling!</h1>
          <p className="text-muted-foreground mb-8">We hebben je bestelling ontvangen en gaan deze zo snel mogelijk verwerken. Je ontvangt een bevestiging per e-mail.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded tracking-wide uppercase hover:opacity-90 transition-opacity">
            Verder Winkelen
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground mb-4">Je winkelwagen is leeg.</p>
        <Link to="/shop" className="text-primary hover:underline">Naar de shop</Link>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ChevronLeft className="w-4 h-4" /> Verder winkelen
        </Link>

        <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-10">Afrekenen</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-8">
            {/* Contact */}
            <div>
              <h2 className="font-heading text-xl font-semibold mb-4">Contactgegevens</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required placeholder="Voornaam" className="px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input required placeholder="Achternaam" className="px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input required type="email" placeholder="E-mailadres" className="sm:col-span-2 px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input placeholder="Telefoonnummer" className="sm:col-span-2 px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>

            {/* Shipping */}
            <div>
              <h2 className="font-heading text-xl font-semibold mb-4">Verzendadres</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required placeholder="Straat + huisnummer" className="sm:col-span-2 px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input placeholder="Toevoeging" className="px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input required placeholder="Postcode" className="px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input required placeholder="Stad" className="px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <select required className="px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option value="NL">Nederland</option>
                  <option value="BE">België</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary text-primary-foreground font-medium text-sm tracking-widest uppercase rounded hover:opacity-90 transition-opacity"
            >
              Bestelling Plaatsen — {formatPrice(total)}
            </button>
          </form>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="bg-secondary rounded p-6 sticky top-28">
              <h2 className="font-heading text-xl font-semibold mb-6">Overzicht</h2>
              <ul className="space-y-4 mb-6">
                {items.map(item => (
                  <li key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-foreground">{item.product.name} × {item.quantity}</span>
                    <span className="font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotaal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Verzending</span>
                  <span>{shipping === 0 ? "Gratis" : formatPrice(shipping)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">Gratis verzending vanaf €50</p>
                )}
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                  <span>Totaal</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
