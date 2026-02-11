import { Layout } from "@/components/Layout";
import { auditLogs } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const roleColor = (role: string) => {
  if (role === "Admin") return "zone-red";
  if (role === "Supervisor") return "zone-blue";
  return "zone-badge bg-muted text-muted-foreground";
};

export default function AuditLogs() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Audit Logs</h1>
          <p className="text-sm text-muted-foreground">System access and action audit trail</p>
        </div>

        <div className="bg-card rounded-lg border overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Role</th>
                <th>Action</th>
                <th>Target</th>
                <th>IP Address</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                  <td className="mono text-xs">{log.time}</td>
                  <td className="text-sm">{log.user}</td>
                  <td><span className={`zone-badge ${roleColor(log.role)}`}>{log.role}</span></td>
                  <td className="text-sm">{log.action}</td>
                  <td className="text-xs text-muted-foreground">{log.target}</td>
                  <td className="mono text-xs text-muted-foreground">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
