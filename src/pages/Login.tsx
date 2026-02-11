import { useState } from "react";
import { Plane, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
            <Plane className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-primary-foreground">MRO Track</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60">Technician Productivity System</p>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-primary-foreground leading-tight">
            BLE-Powered Hangar<br />Operations Intelligence
          </h2>
          <p className="text-sm text-primary-foreground/70 max-w-md leading-relaxed">
            Real-time tracking of technician movement and productivity across maintenance bays.
            Monitor utilization, ensure compliance, and optimize workforce allocation.
          </p>
          <div className="flex gap-8 pt-4">
            {[
              { label: "Active Facilities", value: "12" },
              { label: "Technicians Tracked", value: "340+" },
              { label: "Avg Utilization", value: "87%" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-accent">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-wider text-primary-foreground/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-primary-foreground/40">© 2026 MRO Track Systems. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm space-y-8">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Plane className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">MRO Track</span>
          </div>

          <div>
            <h2 className="text-xl font-bold">Sign in to your account</h2>
            <p className="text-sm text-muted-foreground mt-1">Enter your credentials to access the operations dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-medium uppercase tracking-wider">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="operator@mro.aero"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-medium uppercase tracking-wider">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full h-10">
              <Lock className="h-4 w-4 mr-2" /> Sign In
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-background px-2 text-muted-foreground">or</span></div>
          </div>

          <Button variant="outline" className="w-full h-10" onClick={() => navigate("/dashboard")}>
            Sign in with SSO
          </Button>

          <p className="text-center text-[11px] text-muted-foreground">
            Access restricted to authorized MRO personnel only.
          </p>
        </div>
      </div>
    </div>
  );
}
