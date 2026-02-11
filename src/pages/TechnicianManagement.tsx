import { useState } from "react";
import { Layout } from "@/components/Layout";
import { technicians as initialTechnicians } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Clock, MapPin, Coffee, Car, Plane } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

const skillColor = (skill: string) => {
  if (skill === "Engine") return "zone-blue";
  if (skill === "Avionics") return "zone-green";
  if (skill === "Structure") return "zone-amber";
  return "zone-badge bg-muted text-muted-foreground";
};

const emptyForm = { name: "", id: "", badgeId: "", role: "", shift: "", skill: "" };

export default function TechnicianManagement() {
  const [techList, setTechList] = useState(initialTechnicians);
  const [search, setSearch] = useState("");
  const [shiftFilter, setShiftFilter] = useState("all");
  const [skillFilter, setSkillFilter] = useState("all");
  const [selectedTech, setSelectedTech] = useState<typeof initialTechnicians[0] | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  // Generate mock zone time data for a technician
  const getZoneData = (techName: string) => {
    const seed = techName.length;
    const utilization = 70 + (seed * 3) % 25;
    const hangarH = 3 + (seed % 3);
    const hangarM = 5 + (seed * 7) % 55;
    const toolM = 30 + (seed * 11) % 40;
    const cafeM = 15 + (seed * 5) % 25;
    const parkM = 10 + (seed * 3) % 20;
    return { utilization, hangarH, hangarM, toolM, cafeM, parkM };
  };

  const handleAddTechnician = () => {
    if (!form.name || !form.id) return;
    const newTech = {
      ...form,
      badgeId: form.badgeId || `BDG-${form.id}`,
      status: "Active" as const,
      zone: "Bay A",
      aircraft: "",
      certExpiry: "2026-12-31",
    };
    setTechList((prev) => [...prev, newTech as typeof prev[0]]);
    setForm(emptyForm);
    setAddOpen(false);
  };

  const filtered = techList.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase()) || t.badgeId.toLowerCase().includes(search.toLowerCase());
    const matchesShift = shiftFilter === "all" || t.shift === shiftFilter;
    const matchesSkill = skillFilter === "all" || t.skill === skillFilter;
    return matchesSearch && matchesShift && matchesSkill;
  });

  const certStatus = (expiry: string) => {
    const exp = new Date(expiry);
    const now = new Date();
    const days = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (days < 0) return { label: "Expired", class: "zone-red" };
    if (days < 90) return { label: `${days}d left`, class: "zone-amber" };
    return { label: "Valid", class: "zone-green" };
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Technician Management</h1>
            <p className="text-sm text-muted-foreground">{techList.length} registered technicians</p>
          </div>
          <Button size="sm" onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4 mr-1" /> Add Technician
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, ID, or badge..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <Select value={shiftFilter} onValueChange={setShiftFilter}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="Shift" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Shifts</SelectItem>
              <SelectItem value="Morning">Morning</SelectItem>
              <SelectItem value="Afternoon">Afternoon</SelectItem>
              <SelectItem value="Night">Night</SelectItem>
            </SelectContent>
          </Select>
          <Select value={skillFilter} onValueChange={setSkillFilter}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="Skill" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Skills</SelectItem>
              <SelectItem value="Engine">Engine</SelectItem>
              <SelectItem value="Avionics">Avionics</SelectItem>
              <SelectItem value="Structure">Structure</SelectItem>
              <SelectItem value="General">General</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Badge</th>
                <th>Role</th>
                <th>Shift</th>
                <th>Skill</th>
                <th>Aircraft</th>
                <th>Validity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tech) => {
                const cert = certStatus(tech.certExpiry);
                return (
                  <tr key={tech.id} className="hover:bg-muted/30 transition-colors">
                    <td className="mono text-xs font-medium">{tech.id}</td>
                    <td className="font-medium text-sm">
                      <button
                        onClick={() => setSelectedTech(tech)}
                        className="text-primary hover:underline cursor-pointer bg-transparent border-none p-0 font-medium text-sm text-left"
                      >
                        {tech.name}
                      </button>
                    </td>
                    <td className="mono text-xs">{tech.badgeId}</td>
                    <td className="text-xs">{tech.role}</td>
                    <td><Badge variant="outline" className="text-[10px]">{tech.shift}</Badge></td>
                    <td><span className={`zone-badge ${skillColor(tech.skill)}`}>{tech.skill}</span></td>
                    <td className="text-xs">{tech.aircraft || "—"}</td>
                    <td><span className={`zone-badge ${cert.class}`}>{cert.label}</span></td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-full ${tech.status === "Active" ? "bg-success" : tech.status === "Off-Shift" ? "bg-muted-foreground/40" : "bg-warning"}`} />
                        <span className="text-xs">{tech.status}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Technician Detail Popup */}
        <Dialog open={!!selectedTech} onOpenChange={(open) => !open && setSelectedTech(null)}>
          <DialogContent className="sm:max-w-md">
            {selectedTech && (() => {
              const zone = getZoneData(selectedTech.name);
              return (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg">
                      <span className={`h-2.5 w-2.5 rounded-full ${selectedTech.status === "Active" ? "bg-success" : selectedTech.status === "Off-Shift" ? "bg-muted-foreground/40" : "bg-warning"}`} />
                      {selectedTech.name}
                    </DialogTitle>
                    <p className="text-xs text-muted-foreground">{selectedTech.id} · {selectedTech.role} · {selectedTech.shift} Shift</p>
                  </DialogHeader>

                  <div className="space-y-5 pt-2">
                    {/* Shift Utilization */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          Shift Utilization
                        </span>
                        <span className="text-lg font-bold text-primary">{zone.utilization}%</span>
                      </div>
                      <Progress value={zone.utilization} className="h-2" />
                    </div>

                    {/* Zone Breakdown */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Plane className="h-4 w-4 text-blue-500" />
                        <span className="text-sm flex-1">Hangar</span>
                        <span className="text-sm font-semibold">{zone.hangarH}h {zone.hangarM}m</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <MapPin className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm flex-1">Tool Room</span>
                        <span className="text-sm font-semibold">{zone.toolM}m</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Coffee className="h-4 w-4 text-amber-500" />
                        <span className="text-sm flex-1">Cafeteria</span>
                        <span className="text-sm font-semibold">{zone.cafeM}m</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm flex-1">Parking</span>
                        <span className="text-sm font-semibold">{zone.parkM}m</span>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </DialogContent>
        </Dialog>

        {/* Add Technician Dialog */}
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Technician</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="tech-name">Name</Label>
                <Input id="tech-name" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tech-id">Technician ID</Label>
                  <Input id="tech-id" placeholder="e.g. TECH-021" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tech-badge">Badge ID</Label>
                  <Input id="tech-badge" placeholder="e.g. BDG-021" value={form.badgeId} onChange={(e) => setForm({ ...form, badgeId: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                  <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lead Technician">Lead Technician</SelectItem>
                    <SelectItem value="Senior Technician">Senior Technician</SelectItem>
                    <SelectItem value="Technician">Technician</SelectItem>
                    <SelectItem value="Junior Technician">Junior Technician</SelectItem>
                    <SelectItem value="Apprentice">Apprentice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Shift</Label>
                  <Select value={form.shift} onValueChange={(v) => setForm({ ...form, shift: v })}>
                    <SelectTrigger><SelectValue placeholder="Select shift" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Morning">Morning</SelectItem>
                      <SelectItem value="Afternoon">Afternoon</SelectItem>
                      <SelectItem value="Night">Night</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Skill</Label>
                  <Select value={form.skill} onValueChange={(v) => setForm({ ...form, skill: v })}>
                    <SelectTrigger><SelectValue placeholder="Select skill" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engine">Engine</SelectItem>
                      <SelectItem value="Avionics">Avionics</SelectItem>
                      <SelectItem value="Structure">Structure</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button variant="outline" onClick={() => { setForm(emptyForm); setAddOpen(false); }}>Cancel</Button>
              <Button onClick={handleAddTechnician} disabled={!form.name || !form.id}>Add Technician</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
