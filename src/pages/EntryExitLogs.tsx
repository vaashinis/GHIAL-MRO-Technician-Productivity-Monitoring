import { useState } from "react";
import { Layout } from "@/components/Layout";
import { entryExitLogs } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function EntryExitLogs() {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  const dates = [...new Set(entryExitLogs.map((l) => l.date))];

  const filtered = entryExitLogs.filter((l) => {
    const matchesSearch = l.technicianName.toLowerCase().includes(search.toLowerCase()) || l.badgeId.toLowerCase().includes(search.toLowerCase());
    const matchesDate = dateFilter === "all" || l.date === dateFilter;
    return matchesSearch && matchesDate;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Entry & Exit Logs</h1>
          <p className="text-sm text-muted-foreground">Digital attendance and movement tracking</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or badge..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[160px] h-9"><SelectValue placeholder="Date" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              {dates.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-card rounded-lg border overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Technician</th>
                <th>Badge</th>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Zone</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                  <td className="font-medium text-sm">{log.technicianName}</td>
                  <td className="mono text-xs">{log.badgeId}</td>
                  <td className="text-xs mono">{log.date}</td>
                  <td className="mono text-xs text-success">{log.checkIn}</td>
                  <td className="mono text-xs">{log.checkOut || <span className="text-accent animate-pulse-soft">In Facility</span>}</td>
                  <td className="text-xs">{log.zone}</td>
                  <td><Badge variant="outline" className="mono text-[10px]">{log.duration}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
