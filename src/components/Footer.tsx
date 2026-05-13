import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BrandMark } from "@/components/Logo";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 group select-none mb-5 text-primary-foreground">
              <BrandMark className="w-7 h-7" />
              <div className="flex flex-col items-start leading-none">
                <span className="font-heading text-xl font-semibold tracking-[0.22em]">
                  YOURMATCHA
                </span>
                <span className="mt-1.5 text-[8px] tracking-[0.45em] uppercase text-primary-foreground/60">
                  Premium · Japan
                </span>
              </div>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">{t("footer.tagline")}</p>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">{t("footer.shop")}</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/70">
              <li><Link to="/shop" className="hover:text-primary-foreground transition-colors">{t("categories.all")}</Link></li>
              <li><Link to="/matcha-poeder" className="hover:text-primary-foreground transition-colors">{t("categories.matcha-powder")}</Link></li>
              <li><Link to="/matcha-kits" className="hover:text-primary-foreground transition-colors">{t("categories.kits-sets")}</Link></li>
              <li><Link to="/matcha-accessoires" className="hover:text-primary-foreground transition-colors">{t("categories.accessories")}</Link></li>
              <li><Link to="/japanse-thee" className="hover:text-primary-foreground transition-colors">Japanse thee</Link></li>
              <li><Link to="/cadeau-gids" className="hover:text-primary-foreground transition-colors">Cadeau gids</Link></li>
              <li><Link to="/abonnementen" className="hover:text-primary-foreground transition-colors">{t("nav.subscriptions")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">{t("footer.info")}</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/70">
              <li><Link to="/over-ons" className="hover:text-primary-foreground transition-colors">{t("nav.about")}</Link></li>
              <li><Link to="/herkomst" className="hover:text-primary-foreground transition-colors">Herkomst</Link></li>
              <li><Link to="/kennis" className="hover:text-primary-foreground transition-colors">Matcha kennis</Link></li>
              <li><Link to="/matcha-woordenboek" className="hover:text-primary-foreground transition-colors">Matcha woordenboek</Link></li>
              <li><Link to="/matcha-voor-beginners" className="hover:text-primary-foreground transition-colors">Voor beginners</Link></li>
              <li><Link to="/duurzaamheid" className="hover:text-primary-foreground transition-colors">Duurzaamheid</Link></li>
              <li><Link to="/recepten" className="hover:text-primary-foreground transition-colors">Recepten</Link></li>
              <li><Link to="/blog" className="hover:text-primary-foreground transition-colors">{t("nav.blog")}</Link></li>
              <li><Link to="/bundel" className="hover:text-primary-foreground transition-colors">Bundle builder</Link></li>
              <li><Link to="/matcha-vergelijken" className="hover:text-primary-foreground transition-colors">Matcha vergelijken</Link></li>
              <li><Link to="/faq" className="hover:text-primary-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/70">
              <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link></li>
              <li><Link to="/verzending" className="hover:text-primary-foreground transition-colors">{t("footer.shipping")}</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-foreground transition-colors">{t("footer.privacy")}</Link></li>
              <li><Link to="/voorwaarden" className="hover:text-primary-foreground transition-colors">{t("footer.terms")}</Link></li>
              <li className="flex items-center gap-2 pt-2"><Mail className="w-4 h-4" /> info@yourmatcha.nl</li>
              <li className="flex items-center gap-2"><Instagram className="w-4 h-4" /> @yourmatcha</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} YourMatcha. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
