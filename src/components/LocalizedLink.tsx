import { forwardRef } from "react";
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  useNavigate as useRouterNavigate,
  type LinkProps,
  type NavLinkProps,
} from "react-router-dom";
import { useLang } from "@/i18n";
import { matchDutchPath, localizedPath, langFromPath } from "@/i18n/routes";

/**
 * Zet een intern pad om naar de actieve taal.
 *
 * Bestaande code linkt met Nederlandse paden (`to="/shop"`). Die worden hier
 * opgezocht in het routemanifest en omgezet naar de taalvariant met prefix
 * (`/no/butikk`). Paden die al een taalprefix hebben, externe URL's, hashes
 * en mailto/tel blijven ongemoeid.
 */
export const useLocalizedPath = () => {
  const lang = useLang();
  return (to: string): string => {
    if (!to.startsWith("/")) return to;              // extern, hash of relatief
    if (to.startsWith("/admin")) return to;          // admin staat buiten de taalprefix
    if (langFromPath(to)) return to;                 // al voorzien van prefix
    const [pathOnly, suffix = ""] = splitSuffix(to);
    const match = matchDutchPath(pathOnly);
    if (!match) return `/${lang}${pathOnly}${suffix}`;
    return localizedPath(match.key, lang, match.slug) + suffix;
  };
};

/** Splitst een pad van zijn querystring en/of hash. */
const splitSuffix = (to: string): [string, string] => {
  const i = to.search(/[?#]/);
  return i === -1 ? [to, ""] : [to.slice(0, i), to.slice(i)];
};

/** Drop-in vervanging voor react-router's Link met automatische taalprefix. */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, ...rest },
  ref
) {
  const localize = useLocalizedPath();
  return <RouterLink ref={ref} to={typeof to === "string" ? localize(to) : to} {...rest} />;
});

/** Zelfde principe voor NavLink, inclusief de active-state. */
export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
  { to, ...rest },
  ref
) {
  const localize = useLocalizedPath();
  return <RouterNavLink ref={ref} to={typeof to === "string" ? localize(to) : to} {...rest} />;
});

/** useNavigate die dezelfde vertaling toepast op stringpaden. */
export const useNavigate = () => {
  const navigate = useRouterNavigate();
  const localize = useLocalizedPath();
  return ((to: unknown, options?: unknown) => {
    if (typeof to === "string") return navigate(localize(to), options as never);
    return navigate(to as never, options as never);
  }) as ReturnType<typeof useRouterNavigate>;
};
