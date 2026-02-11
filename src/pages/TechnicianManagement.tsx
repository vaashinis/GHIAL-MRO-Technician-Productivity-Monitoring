import { useState } from "react";
import { Layout } from "@/components/Layout";
import { technicians } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const skillColor = (skill: string) => {
  if (skill === "Engine") return "zone-blue";
  if (skill === "Avionics") return "zone-green";
  if (skill === "Structure") return "zone-amber";
  return "zone-badge bg-muted text-muted-foreground";
};

export default function TechnicianManagement() {
  const [search, setSearch] = useState("");
  const [shiftFilter, setShiftFilter] = useState("all");
  const [skillFilter, setSkillFilter] = useState("all");

  const filtered = technicians.filter((t) => {
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
            <p className="text-sm text-muted-foreground">{technicians.length} registered technicians</p>
          </div>
          <Button size="sm">
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
                    <td className="font-medium text-sm">{tech.name}</td>
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
      </div>
    </Layout>
  );
}
