import { useState } from "react";
import { Layout } from "@/components/Layout";
import { zones, technicians } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Users, Wifi, WifiOff, X, Clock, MapPin, IdCard } from "lucide-react";

type TechnicianDot = {
  tech: typeof technicians[0];
  x: number;
  y: number;
};

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

// Floor map zone definitions with positions (percentages)
const floorZones = [
  { id: "hangar", label: "Hangar", sublabel: "Bay A / B / D", x: 5, y: 5, w: 55, h: 60, color: "hsl(var(--navy))" },
  { id: "toolroom", label: "Tool Room", sublabel: "Tool Crib", x: 62, y: 5, w: 35, h: 28, color: "hsl(var(--steel-blue))" },
  { id: "cafeteria", label: "Cafeteria", sublabel: "Break Room", x: 62, y: 36, w: 35, h: 29, color: "hsl(var(--accent))" },
  { id: "avionics", label: "Avionics Lab", sublabel: "Bay C", x: 5, y: 68, w: 30, h: 28, color: "hsl(var(--primary))" },
  { id: "parking", label: "Parking", sublabel: "Outdoor", x: 37, y: 68, w: 25, h: 28, color: "hsl(var(--muted))" },
  { id: "office", label: "QC Office", sublabel: "Quality Control", x: 64, y: 68, w: 33, h: 28, color: "hsl(var(--secondary))" },
];

// Map technicians to floor zones with scattered positions
function getZoneId(zoneName: string): string {
  if (zoneName.includes("Bay A") || zoneName.includes("Bay B") || zoneName.includes("Bay D") || zoneName.includes("Painting")) return "hangar";
  if (zoneName.includes("Tool")) return "toolroom";
  if (zoneName.includes("Break") || zoneName.includes("Cafeteria")) return "cafeteria";
  if (zoneName.includes("Avionics") || zoneName.includes("Bay C")) return "avionics";
  if (zoneName.includes("Parking") || zoneName.includes("Parts")) return "parking";
  if (zoneName.includes("QC") || zoneName.includes("Office")) return "office";
  return "hangar";
}

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function getTechDots(): TechnicianDot[] {
  const onShift = technicians.filter((t) => t.status !== "Off-Shift");
  return onShift.map((tech, i) => {
    const zoneId = getZoneId(tech.zone);
    const zone = floorZones.find((z) => z.id === zoneId) || floorZones[0];
    const padding = 6;
    const x = zone.x + padding + seededRandom(i * 7 + 1) * (zone.w - padding * 2);
    const y = zone.y + padding + 4 + seededRandom(i * 13 + 3) * (zone.h - padding * 2 - 6);
    return { tech, x, y };
  });
}

const dotColor = (status: string) => {
  if (status === "Active") return "hsl(var(--success))";
  if (status === "Idle" || status === "Break") return "hsl(var(--warning))";
  return "hsl(var(--muted-foreground))";
};

const timeInZone = (checkIn?: string) => {
  if (!checkIn) return "—";
  const [h, m] = checkIn.split(":").map(Number);
  const now = 7 * 60 + 45; // simulate 07:45
  const diff = now - (h * 60 + m);
  const hrs = Math.floor(diff / 60);
  const mins = diff % 60;
  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
};

export default function LiveTracking() {
  const [selectedTech, setSelectedTech] = useState<TechnicianDot | null>(null);
  const activeCount = technicians.filter((t) => t.status === "Active").length;
  const idleCount = technicians.filter((t) => t.status === "Idle" || t.status === "Break").length;
  const offCount = technicians.filter((t) => t.status === "Off-Shift").length;
  const onShift = technicians.filter((t) => t.status !== "Off-Shift");
  const techDots = getTechDots();

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

        {/* Floor Map */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Hangar Floor Map</h2>
          <div className="bg-card rounded-lg border p-4 relative">
            <div className="relative w-full" style={{ paddingBottom: "56%" }}>
              <svg
                viewBox="0 0 100 56"
                className="absolute inset-0 w-full h-full"
                style={{ fontFamily: "inherit" }}
              >
                {/* Grid lines */}
                {Array.from({ length: 11 }).map((_, i) => (
                  <line key={`vg${i}`} x1={i * 10} y1={0} x2={i * 10} y2={56} stroke="hsl(var(--border))" strokeWidth="0.15" strokeDasharray="0.5,0.5" />
                ))}
                {Array.from({ length: 7 }).map((_, i) => (
                  <line key={`hg${i}`} x1={0} y1={i * 8} x2={100} y2={i * 8} stroke="hsl(var(--border))" strokeWidth="0.15" strokeDasharray="0.5,0.5" />
                ))}

                {/* Zone rectangles */}
                {floorZones.map((zone) => (
                  <g key={zone.id}>
                    <rect
                      x={zone.x}
                      y={zone.y}
                      width={zone.w}
                      height={zone.h}
                      rx={1}
                      fill={zone.color}
                      fillOpacity={0.08}
                      stroke={zone.color}
                      strokeWidth={0.3}
                      strokeOpacity={0.4}
                    />
                    <text
                      x={zone.x + zone.w / 2}
                      y={zone.y + 3.5}
                      textAnchor="middle"
                      fill="hsl(var(--foreground))"
                      fontSize={2.2}
                      fontWeight={600}
                      opacity={0.7}
                    >
                      {zone.label}
                    </text>
                    <text
                      x={zone.x + zone.w / 2}
                      y={zone.y + 5.8}
                      textAnchor="middle"
                      fill="hsl(var(--muted-foreground))"
                      fontSize={1.4}
                      opacity={0.5}
                    >
                      {zone.sublabel}
                    </text>
                  </g>
                ))}

                {/* Technician dots */}
                {techDots.map((dot, i) => {
                  const isSelected = selectedTech?.tech.id === dot.tech.id;
                  return (
                    <g
                      key={dot.tech.id}
                      onClick={() => setSelectedTech(isSelected ? null : dot)}
                      className="cursor-pointer"
                    >
                      {/* Pulse ring for active */}
                      {dot.tech.status === "Active" && (
                        <circle
                          cx={dot.x}
                          cy={dot.y}
                          r={1.8}
                          fill="none"
                          stroke={dotColor(dot.tech.status)}
                          strokeWidth={0.2}
                          opacity={0.4}
                        >
                          <animate attributeName="r" from="1" to="2.5" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}
                      {/* Selection ring */}
                      {isSelected && (
                        <circle
                          cx={dot.x}
                          cy={dot.y}
                          r={2}
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth={0.35}
                        />
                      )}
                      {/* Dot */}
                      <circle
                        cx={dot.x}
                        cy={dot.y}
                        r={1.1}
                        fill={dotColor(dot.tech.status)}
                        stroke="hsl(var(--card))"
                        strokeWidth={0.3}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-3 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-success" />
                Active
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-warning" />
                Idle / Break
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
                Off-Shift
              </div>
              <span className="ml-auto text-[10px] opacity-60">Click a dot to view technician details</span>
            </div>
          </div>
        </div>

        {/* Selected technician popup */}
        {selectedTech && (
          <div className="bg-card rounded-lg border shadow-lg p-5 relative animate-in fade-in slide-in-from-bottom-2 duration-200">
            <button
              onClick={() => setSelectedTech(null)}
              className="absolute right-3 top-3 rounded-sm p-1 opacity-60 hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-start gap-5">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-primary">
                  {selectedTech.tech.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Technician Name</p>
                  <p className="text-sm font-semibold">{selectedTech.tech.name}</p>
                  <p className="text-[10px] text-muted-foreground">{selectedTech.tech.role}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5 flex items-center gap-1"><IdCard className="h-3 w-3" />ID / Badge</p>
                  <p className="text-sm font-semibold mono">{selectedTech.tech.id}</p>
                  <p className="text-[10px] text-muted-foreground mono">{selectedTech.tech.badgeId}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5 flex items-center gap-1"><MapPin className="h-3 w-3" />Current Zone</p>
                  <p className="text-sm font-semibold">{selectedTech.tech.zone}</p>
                  <span className={`zone-badge text-[10px] ${statusLabel(selectedTech.tech.status)}`}>
                    {selectedTech.tech.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5 flex items-center gap-1"><Clock className="h-3 w-3" />Time in Zone</p>
                  <p className="text-sm font-semibold mono">{timeInZone(selectedTech.tech.checkIn)}</p>
                  <p className="text-[10px] text-muted-foreground">Since {selectedTech.tech.checkIn || "—"}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Zone breakdown + Technician list */}
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
