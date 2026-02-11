import { Layout } from "@/components/Layout";
import { productivityData } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const COLORS = [
  "hsl(210, 90%, 50%)",
  "hsl(152, 60%, 40%)",
  "hsl(38, 92%, 50%)",
  "hsl(0, 72%, 51%)",
  "hsl(262, 60%, 50%)",
  "hsl(180, 50%, 45%)",
];

export default function ProductivityAnalytics() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Productivity Analytics</h1>
            <p className="text-sm text-muted-foreground">Workforce performance and utilization reports</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="today">
              <SelectTrigger className="w-[130px] h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[130px] h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Shifts</SelectItem>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="afternoon">Afternoon</SelectItem>
                <SelectItem value="night">Night</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Zone Time */}
          <div className="bg-card rounded-lg border p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Time Spent by Zone (Hours)</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={productivityData.zoneTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 88%)" />
                <XAxis dataKey="zone" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="productive" name="Productive" fill="hsl(210, 90%, 50%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="hours" name="Total" fill="hsl(214, 20%, 85%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Utilization */}
          <div className="bg-card rounded-lg border p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Weekly Utilization Trend</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={productivityData.weeklyUtilization}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 88%)" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Line type="monotone" dataKey="utilization" stroke="hsl(210, 90%, 50%)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(210, 90%, 50%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Shift Efficiency */}
          <div className="bg-card rounded-lg border p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Shift Efficiency vs Target</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={productivityData.shiftEfficiency} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 88%)" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
                <YAxis dataKey="shift" type="category" tick={{ fontSize: 11 }} width={80} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="efficiency" name="Actual" fill="hsl(152, 60%, 40%)" radius={[0, 4, 4, 0]} />
                <Bar dataKey="target" name="Target" fill="hsl(214, 20%, 85%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Aircraft Labor */}
          <div className="bg-card rounded-lg border p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Aircraft-wise Labor Effort</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={productivityData.aircraftLabor}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={55}
                  dataKey="hours"
                  nameKey="aircraft"
                  label={({ aircraft, hours }) => `${hours}h`}
                  labelLine={false}
                >
                  {productivityData.aircraftLabor.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
}
