import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError) {
      setError("Onjuiste inloggegevens. Probeer opnieuw.");
      setLoading(false);
      return;
    }
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm font-body text-muted-foreground mt-1">Shop Admin</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="E-mailadres"
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40"
            autoFocus
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Wachtwoord"
              className="w-full rounded-lg border border-border bg-card px-4 py-3 pr-10 text-sm font-body outline-none focus:ring-2 focus:ring-primary/40"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-500 font-body">{error}</p>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Bezig..." : "Inloggen"}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground font-body mt-6">
          <a href="/" className="hover:text-foreground transition-colors">← Terug naar website</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
