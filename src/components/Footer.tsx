import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "@/assets/yourmatcha-logo.png";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <img src={logo} alt="YourMatcha" className="h-14 w-auto mb-4 brightness-0 invert opacity-90" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">{t("footer.tagline")}</p>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">{t("footer.shop")}</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/70">
              <li><Link to="/shop" className="hover:text-primary-foreground transition-colors">{t("categories.all")}</Link></li>
              <li><Link to="/shop?category=matcha-powder" className="hover:text-primary-foreground transition-colors">{t("categories.matcha-powder")}</Link></li>
              <li><Link to="/shop?category=kits-sets" className="hover:text-primary-foreground transition-colors">{t("categories.kits-sets")}</Link></li>
              <li><Link to="/shop?category=accessories" className="hover:text-primary-foreground transition-colors">{t("categories.accessories")}</Link></li>
              <li><Link to="/abonnementen" className="hover:text-primary-foreground transition-colors">{t("nav.subscriptions")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">{t("footer.info")}</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/70">
              <li><Link to="/over-ons" className="hover:text-primary-foreground transition-colors">{t("nav.about")}</Link></li>
              <li><Link to="/blog" className="hover:text-primary-foreground transition-colors">{t("nav.blog")}</Link></li>
              <li><span className="cursor-default">{t("footer.shipping")}</span></li>
              <li><span className="cursor-default">{t("footer.privacy")}</span></li>
              <li><span className="cursor-default">{t("footer.terms")}</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@yourmatcha.nl</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Amsterdam, Nederland</li>
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
