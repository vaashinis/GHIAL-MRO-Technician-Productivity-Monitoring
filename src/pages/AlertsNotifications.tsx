import { useState } from "react";
import { Layout } from "@/components/Layout";
import { alerts } from "@/data/mockData";
import { AlertTriangle, Radio, ShieldAlert, Wifi, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const typeIcon = (type: string) => {
  if (type === "idle") return <Radio className="h-4 w-4" />;
  if (type === "restricted") return <ShieldAlert className="h-4 w-4" />;
  if (type === "badge") return <Wifi className="h-4 w-4" />;
  return <Users className="h-4 w-4" />;
};

const typeLabel = (type: string) => {
  if (type === "idle") return "Idle Technician";
  if (type === "restricted") return "Restricted Zone";
  if (type === "badge") return "Badge Offline";
  return "Overcrowded Zone";
};

const severityStyle = (severity: string) => {
  if (severity === "high") return "border-l-destructive bg-destructive/5";
  if (severity === "medium") return "border-l-warning bg-warning/5";
  return "border-l-muted-foreground bg-muted/30";
};

const severityBadge = (severity: string) => {
  if (severity === "high") return "zone-red";
  if (severity === "medium") return "zone-amber";
  return "zone-badge bg-muted text-muted-foreground";
};

export default function AlertsNotifications() {
  const [alertState, setAlertState] = useState(alerts);
  const [filter, setFilter] = useState<string>("all");

  const acknowledge = (id: string) => {
    setAlertState((prev) => prev.map((a) => a.id === id ? { ...a, acknowledged: true } : a));
  };

  const filtered = alertState.filter((a) => filter === "all" || a.type === filter);
  const unackCount = alertState.filter((a) => !a.acknowledged).length;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Alerts & Notifications</h1>
            <p className="text-sm text-muted-foreground">{unackCount} unacknowledged alerts</p>
          </div>
          <div className="flex gap-2">
            {["all", "idle", "restricted", "badge", "overcrowded"].map((f) => (
              <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)} className="capitalize text-xs h-8">
                {f === "all" ? "All" : typeLabel(f).split(" ")[0]}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((alert) => (
            <div key={alert.id} className={`bg-card rounded-lg border border-l-4 p-4 ${severityStyle(alert.severity)} ${alert.acknowledged ? "opacity-60" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${alert.severity === "high" ? "bg-destructive/10 text-destructive" : alert.severity === "medium" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"}`}>
                    {typeIcon(alert.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold">{typeLabel(alert.type)}</p>
                      <span className={`zone-badge ${severityBadge(alert.severity)}`}>{alert.severity}</span>
                    </div>
                    <p className="text-sm text-foreground/80">{alert.message}</p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground mono">
                      <span>{alert.time}</span>
                      {alert.zone && <span>Zone: {alert.zone}</span>}
                      {alert.technician && <span>Tech: {alert.technician}</span>}
                    </div>
                  </div>
                </div>
                {!alert.acknowledged ? (
                  <Button size="sm" variant="outline" className="shrink-0 text-xs h-8" onClick={() => acknowledge(alert.id)}>
                    <Check className="h-3 w-3 mr-1" /> Acknowledge
                  </Button>
                ) : (
                  <Badge variant="secondary" className="text-[10px] shrink-0">Acknowledged</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
