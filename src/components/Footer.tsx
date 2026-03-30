import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin } from "lucide-react";
import logo from "@/assets/yourmatcha-logo.png";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <img src={logo} alt="YourMatcha" className="h-14 w-auto mb-4 brightness-0 invert opacity-90" />
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            Premium Japanse matcha, rechtstreeks uit de Uji-regio. Puur, duurzaam en met liefde geselecteerd. 🍵
          </p>
        </div>

        {/* Shop */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Shop</h4>
          <ul className="space-y-2.5 text-sm text-primary-foreground/70">
            <li><Link to="/shop" className="hover:text-primary-foreground transition-colors">Alle Producten</Link></li>
            <li><Link to="/shop?category=matcha-powder" className="hover:text-primary-foreground transition-colors">Matcha Poeder</Link></li>
            <li><Link to="/shop?category=kits-sets" className="hover:text-primary-foreground transition-colors">Kits & Sets</Link></li>
            <li><Link to="/shop?category=accessories" className="hover:text-primary-foreground transition-colors">Accessoires</Link></li>
            <li><Link to="/abonnementen" className="hover:text-primary-foreground transition-colors">Abonnementen</Link></li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Informatie</h4>
          <ul className="space-y-2.5 text-sm text-primary-foreground/70">
            <li><Link to="/over-ons" className="hover:text-primary-foreground transition-colors">Over Ons</Link></li>
            <li><Link to="/blog" className="hover:text-primary-foreground transition-colors">Blog</Link></li>
            <li><span className="cursor-default">Verzending & Retour</span></li>
            <li><span className="cursor-default">Privacybeleid</span></li>
            <li><span className="cursor-default">Algemene Voorwaarden</span></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@yourmatcha.nl</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Amsterdam, Nederland</li>
            <li className="flex items-center gap-2"><Instagram className="w-4 h-4" /> @yourmatcha</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/50">
        © {new Date().getFullYear()} YourMatcha. Alle rechten voorbehouden.
      </div>
    </div>
  </footer>
);

export default Footer;
