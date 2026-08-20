import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLang } from "@/i18n";
import SEO from "@/components/SEO";

const COPY = {
  nl: {
    message: "Deze pagina bestaat niet",
    backHome: "Terug naar de homepage",
  },
  en: {
    message: "This page does not exist",
    backHome: "Back to the homepage",
  },
  de: {
    message: "Diese Seite gibt es nicht",
    backHome: "Zurück zur Startseite",
  },
  fr: {
    message: "Cette page n'existe pas",
    backHome: "Retour à l'accueil",
  },
  no: {
    message: "Denne siden finnes ikke",
    backHome: "Tilbake til forsiden",
  },
} as const;

const NotFound = () => {
  const location = useLocation();
  const lang = useLang();
  const t = COPY[lang] ?? COPY.nl;

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <SEO title="404" description={t.message} noindex />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t.message}</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          {t.backHome}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
