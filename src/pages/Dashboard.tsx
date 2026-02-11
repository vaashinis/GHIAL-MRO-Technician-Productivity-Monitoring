import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { Users, Activity, Plane, AlertTriangle, Clock, ArrowRight } from "lucide-react";
import { zones, technicians, alerts, activityLogs } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const activeTechs = technicians.filter((t) => t.status === "Active").length;
const totalOnShift = technicians.filter((t) => t.status !== "Off-Shift").length;
const utilization = Math.round((activeTechs / totalOnShift) * 100);
const activeAircraft = [...new Set(technicians.filter((t) => t.aircraft).map((t) => t.aircraft))].length;
const unacknowledgedAlerts = alerts.filter((a) => !a.acknowledged).length;

const zoneStatusColor = (status: string) => {
  if (status === "critical") return "zone-red";
  if (status === "warning") return "zone-amber";
  return "zone-green";
};

const statusDot = (status: string) => {
  if (status === "Active") return "bg-success";
  if (status === "Idle" || status === "Break") return "bg-warning";
  return "bg-muted-foreground/40";
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Operations Dashboard</h1>
          <p className="text-sm text-muted-foreground">Real-time hangar overview — Morning Shift</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Active Technicians" value="79/100" subtitle="On current shift" icon={Users} variant="accent" trend={{ value: "2 more than yesterday", positive: true }} />
          <StatCard title="Utilization" value={`${utilization}%`} subtitle="Target: 85%" icon={Activity} variant="success" trend={{ value: "3% vs last week", positive: true }} />
          <StatCard title="Active Aircraft" value={activeAircraft} subtitle="Under maintenance" icon={Plane} variant="default" />
          <StatCard title="Open Alerts" value={unacknowledgedAlerts} subtitle={`${alerts.length} total today`} icon={AlertTriangle} variant={unacknowledgedAlerts > 2 ? "destructive" : "warning"} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hangar Map */}
          <div className="lg:col-span-2 bg-card rounded-lg border p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Hangar Zone Map</h2>
              <button onClick={() => navigate("/tracking")} className="text-xs text-accent hover:underline flex items-center gap-1">
                Live View <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {zones.map((zone) => (
                <div
                  key={zone.id}
                  className={`rounded-lg border-2 p-4 transition-all hover:shadow-md cursor-pointer ${
                    zone.status === "critical"
                      ? "border-destructive/50 bg-destructive/5"
                      : zone.status === "warning"
                      ? "border-warning/50 bg-warning/5"
                      : "border-border bg-muted/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`zone-badge ${zoneStatusColor(zone.status)}`}>{zone.status}</span>
                  </div>
                  <p className="text-sm font-semibold truncate">{zone.name}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{zone.type}</p>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <span className="text-xl font-bold">{zone.current}</span>
                      <span className="text-xs text-muted-foreground">/{zone.capacity}</span>
                    </div>
                    <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          zone.current / zone.capacity > 0.9
                            ? "bg-destructive"
                            : zone.current / zone.capacity > 0.7
                            ? "bg-warning"
                            : "bg-success"
                        }`}
                        style={{ width: `${(zone.current / zone.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Alerts */}
            <div className="bg-card rounded-lg border p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Active Alerts</h2>
                <Badge variant="destructive" className="text-[10px]">{unacknowledgedAlerts}</Badge>
              </div>
              <div className="space-y-2">
                {alerts.filter((a) => !a.acknowledged).slice(0, 4).map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-2.5 rounded-md bg-muted/40 border border-border/50">
                    <div className={`pulse-dot mt-1 shrink-0 ${alert.severity === "high" ? "bg-destructive" : "bg-warning"}`} />
                    <div className="min-w-0">
                      <p className="text-xs leading-relaxed">{alert.message}</p>
                      <p className="text-[10px] text-muted-foreground mt-1 mono">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-card rounded-lg border p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Recent Activity</h2>
              <div className="space-y-3">
                {activityLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="h-3 w-3 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs"><span className="font-medium">{log.technicianName}</span> — {log.action}</p>
                      <p className="text-[10px] text-muted-foreground">{log.zone} · {log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
