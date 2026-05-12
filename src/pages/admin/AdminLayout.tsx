import { useEffect } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard, ShoppingBag, Package, LogOut, ExternalLink, Menu, X, Users, Award, Briefcase, Truck, CircleDollarSign, Tag, Code2, Mail, Send
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/orders", label: "Bestellingen", icon: ShoppingBag },
  { to: "/admin/products", label: "Producten", icon: Package },
  { to: "/admin/discounts", label: "Kortingscodes", icon: Tag },
  { to: "/admin/partners", label: "Ambassadors", icon: Award },
  { to: "/admin/b2b", label: "B2B Partners", icon: Briefcase },
  { to: "/admin/newsletter", label: "Nieuwsbrief", icon: Mail },
  { to: "/admin/email-log", label: "Email Log", icon: Send },
  { to: "/admin/pixels", label: "Pixel Manager", icon: Code2 },
  // TODO: rewire wanneer hooks geport zijn — Klanten (/accounts), Verzending & BTW (/shipping), Valuta (/currencies)
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("shop_admin_auth");
    if (!auth) navigate("/admin/login");
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("shop_admin_auth");
    navigate("/admin/login");
  };

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-card border-r border-border flex flex-col transition-transform duration-200 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display font-bold text-sm">Admin</p>
              <p className="text-xs text-muted-foreground font-body">Admin Panel</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon, exact }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium transition-colors ${
                isActive(to, exact)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Bekijk website
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Uitloggen
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-3 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-body text-muted-foreground">
            {navItems.find(n => isActive(n.to, n.exact))?.label ?? "Admin"}
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
