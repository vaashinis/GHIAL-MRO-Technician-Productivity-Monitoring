import { Layout } from "@/components/Layout";
import { zones, technicians } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Users, Wifi, WifiOff } from "lucide-react";

const statusDot = (status: string) => {
  if (status === "Active") return "bg-success";
  if (status === "Idle" || status === "Break") return "bg-warning";
  return "bg-muted-foreground/40";
};

const statusLabel = (status: string) => {
  if (status === "Active") return "zone-green";
  if (status === "Idle" || status === "Break") return "zone-amber";
  return "zone-badge bg-muted text-muted-foreground";
};

export default function LiveTracking() {
  const activeCount = technicians.filter((t) => t.status === "Active").length;
  const idleCount = technicians.filter((t) => t.status === "Idle" || t.status === "Break").length;
  const offCount = technicians.filter((t) => t.status === "Off-Shift").length;
  const onShift = technicians.filter((t) => t.status !== "Off-Shift");

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Live Tracking</h1>
            <p className="text-sm text-muted-foreground">Real-time BLE-based technician monitoring</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="pulse-dot bg-success" />
            <span className="text-muted-foreground mono">LIVE — Updated 5s ago</span>
          </div>
        </div>

        {/* Live counters */}
        <div className="grid grid-cols-3 gap-4">
          <div className="stat-card flex items-center gap-4 border-l-4 border-l-success">
            <Wifi className="h-5 w-5 text-success" />
            <div>
              <p className="text-2xl font-bold">{activeCount}</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
          </div>
          <div className="stat-card flex items-center gap-4 border-l-4 border-l-warning">
            <Users className="h-5 w-5 text-warning" />
            <div>
              <p className="text-2xl font-bold">{idleCount}</p>
              <p className="text-xs text-muted-foreground">Idle / Break</p>
            </div>
          </div>
          <div className="stat-card flex items-center gap-4 border-l-4 border-l-muted-foreground">
            <WifiOff className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-2xl font-bold">{offCount}</p>
              <p className="text-xs text-muted-foreground">Off-Shift</p>
            </div>
          </div>
        </div>

        {/* Zone breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Zone cards */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Staff by Zone</h2>
            {zones.map((zone) => {
              const zoneTechs = onShift.filter((t) => t.zone === zone.name);
              return (
                <div key={zone.id} className="bg-card rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-semibold">{zone.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">{zone.type}</p>
                    </div>
                    <Badge variant="outline" className="mono text-xs">{zoneTechs.length}/{zone.capacity}</Badge>
                  </div>
                  {zoneTechs.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {zoneTechs.map((tech) => (
                        <div key={tech.id} className="flex items-center gap-1.5 bg-muted/50 rounded-full px-2.5 py-1">
                          <span className={`h-2 w-2 rounded-full ${statusDot(tech.status)}`} />
                          <span className="text-xs">{tech.name.split(" ")[0]}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">No technicians in zone</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Technician list */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">All Technicians</h2>
            <div className="bg-card rounded-lg border overflow-hidden">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Zone</th>
                    <th>Status</th>
                    <th>Since</th>
                  </tr>
                </thead>
                <tbody>
                  {technicians.map((tech) => (
                    <tr key={tech.id} className="hover:bg-muted/30 transition-colors">
                      <td>
                        <div>
                          <p className="font-medium text-sm">{tech.name}</p>
                          <p className="text-[10px] text-muted-foreground mono">{tech.badgeId}</p>
                        </div>
                      </td>
                      <td className="text-xs">{tech.zone}</td>
                      <td>
                        <span className={`zone-badge ${statusLabel(tech.status)}`}>{tech.status}</span>
                      </td>
                      <td className="text-xs mono">{tech.checkIn || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
