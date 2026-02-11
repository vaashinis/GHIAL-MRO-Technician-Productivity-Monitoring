export interface Technician {
  id: string;
  name: string;
  badgeId: string;
  role: string;
  shift: "Morning" | "Afternoon" | "Night";
  skill: "Engine" | "Avionics" | "Structure" | "General";
  zone: string;
  status: "Active" | "Idle" | "Off-Shift" | "Break";
  certExpiry: string;
  aircraft?: string;
  checkIn?: string;
  checkOut?: string;
}

export interface Zone {
  id: string;
  name: string;
  capacity: number;
  current: number;
  status: "normal" | "warning" | "critical";
  type: string;
}

export interface Alert {
  id: string;
  type: "idle" | "restricted" | "badge" | "overcrowded";
  message: string;
  technician?: string;
  zone?: string;
  time: string;
  severity: "low" | "medium" | "high";
  acknowledged: boolean;
}

export interface ActivityLog {
  id: string;
  technicianId: string;
  technicianName: string;
  action: string;
  zone: string;
  time: string;
}

export interface EntryExitLog {
  id: string;
  technicianId: string;
  technicianName: string;
  badgeId: string;
  checkIn: string;
  checkOut: string | null;
  zone: string;
  duration: string;
  date: string;
}

export interface AuditLog {
  id: string;
  user: string;
  role: string;
  action: string;
  target: string;
  time: string;
  ip: string;
}

export const zones: Zone[] = [
  { id: "z1", name: "Bay A - Heavy Check", capacity: 12, current: 8, status: "normal", type: "Maintenance Bay" },
  { id: "z2", name: "Bay B - Engine Shop", capacity: 8, current: 7, status: "warning", type: "Engine Workshop" },
  { id: "z3", name: "Bay C - Avionics Lab", capacity: 6, current: 3, status: "normal", type: "Avionics Lab" },
  { id: "z4", name: "Bay D - Painting", capacity: 4, current: 4, status: "critical", type: "Paint Shop" },
  { id: "z5", name: "Tool Crib", capacity: 5, current: 2, status: "normal", type: "Storage" },
  { id: "z6", name: "Break Room", capacity: 15, current: 6, status: "normal", type: "Break Area" },
  { id: "z7", name: "Parts Storage", capacity: 3, current: 1, status: "normal", type: "Storage" },
  { id: "z8", name: "QC Office", capacity: 4, current: 2, status: "normal", type: "Office" },
];

export const technicians: Technician[] = [
  { id: "T001", name: "James Mitchell", badgeId: "BLE-4401", role: "Lead Mechanic", shift: "Morning", skill: "Engine", zone: "Bay B - Engine Shop", status: "Active", certExpiry: "2026-08-15", aircraft: "B737-800 (VT-AXR)", checkIn: "06:02", checkOut: undefined },
  { id: "T002", name: "Sarah Chen", badgeId: "BLE-4402", role: "Avionics Tech", shift: "Morning", skill: "Avionics", zone: "Bay C - Avionics Lab", status: "Active", certExpiry: "2026-03-22", aircraft: "A320 (VT-INE)", checkIn: "06:00", checkOut: undefined },
  { id: "T003", name: "Robert Singh", badgeId: "BLE-4403", role: "Inspector", shift: "Morning", skill: "General", zone: "QC Office", status: "Active", certExpiry: "2026-11-30", checkIn: "05:55", checkOut: undefined },
  { id: "T004", name: "Maria Lopez", badgeId: "BLE-4404", role: "Structure Tech", shift: "Morning", skill: "Structure", zone: "Bay A - Heavy Check", status: "Active", certExpiry: "2025-12-01", aircraft: "B777-300 (VT-ALJ)", checkIn: "06:01", checkOut: undefined },
  { id: "T005", name: "David Park", badgeId: "BLE-4405", role: "Mechanic", shift: "Morning", skill: "Engine", zone: "Break Room", status: "Idle", certExpiry: "2026-06-14", checkIn: "06:03", checkOut: undefined },
  { id: "T006", name: "Ahmed Hassan", badgeId: "BLE-4406", role: "Mechanic", shift: "Morning", skill: "General", zone: "Bay A - Heavy Check", status: "Active", certExpiry: "2026-09-20", aircraft: "B777-300 (VT-ALJ)", checkIn: "06:00", checkOut: undefined },
  { id: "T007", name: "Lisa Wang", badgeId: "BLE-4407", role: "Avionics Tech", shift: "Afternoon", skill: "Avionics", zone: "Bay C - Avionics Lab", status: "Off-Shift", certExpiry: "2026-04-10", checkIn: undefined, checkOut: undefined },
  { id: "T008", name: "Michael Brown", badgeId: "BLE-4408", role: "Painter", shift: "Morning", skill: "Structure", zone: "Bay D - Painting", status: "Active", certExpiry: "2026-07-08", aircraft: "ATR-72 (VT-RKD)", checkIn: "06:05", checkOut: undefined },
  { id: "T009", name: "Priya Sharma", badgeId: "BLE-4409", role: "Lead Mechanic", shift: "Morning", skill: "Engine", zone: "Bay B - Engine Shop", status: "Active", certExpiry: "2026-01-15", aircraft: "B737-800 (VT-AXR)", checkIn: "05:58", checkOut: undefined },
  { id: "T010", name: "Kevin O'Brien", badgeId: "BLE-4410", role: "Mechanic", shift: "Morning", skill: "General", zone: "Bay A - Heavy Check", status: "Break", certExpiry: "2026-05-30", checkIn: "06:00", checkOut: undefined },
  { id: "T011", name: "Anna Petrov", badgeId: "BLE-4411", role: "Inspector", shift: "Afternoon", skill: "General", zone: "QC Office", status: "Off-Shift", certExpiry: "2026-10-12", checkIn: undefined, checkOut: undefined },
  { id: "T012", name: "Carlos Rivera", badgeId: "BLE-4412", role: "Mechanic", shift: "Morning", skill: "Structure", zone: "Bay A - Heavy Check", status: "Active", certExpiry: "2026-02-28", aircraft: "B777-300 (VT-ALJ)", checkIn: "06:02", checkOut: undefined },
  { id: "T013", name: "Ravi Patel", badgeId: "BLE-4413", role: "Mechanic", shift: "Morning", skill: "General", zone: "Tool Crib", status: "Active", certExpiry: "2026-07-20", checkIn: "06:10", checkOut: undefined },
  { id: "T014", name: "Nina Gupta", badgeId: "BLE-4414", role: "Structure Tech", shift: "Morning", skill: "Structure", zone: "Tool Crib", status: "Active", certExpiry: "2026-09-05", checkIn: "06:12", checkOut: undefined },
];

export const alerts: Alert[] = [
  { id: "a1", type: "idle", message: "David Park idle in Break Room for 32 min", technician: "David Park", zone: "Break Room", time: "06:35", severity: "medium", acknowledged: false },
  { id: "a2", type: "overcrowded", message: "Bay D - Painting at full capacity (4/4)", zone: "Bay D - Painting", time: "06:20", severity: "high", acknowledged: false },
  { id: "a3", type: "badge", message: "Badge BLE-4407 offline - Lisa Wang", technician: "Lisa Wang", time: "06:15", severity: "low", acknowledged: true },
  { id: "a4", type: "restricted", message: "Unauthorized entry attempt in Parts Storage", zone: "Parts Storage", time: "06:10", severity: "high", acknowledged: false },
  { id: "a5", type: "idle", message: "Kevin O'Brien on extended break (45 min)", technician: "Kevin O'Brien", zone: "Break Room", time: "06:45", severity: "medium", acknowledged: false },
];

export const activityLogs: ActivityLog[] = [
  { id: "l1", technicianId: "T001", technicianName: "James Mitchell", action: "Entered zone", zone: "Bay B - Engine Shop", time: "06:02" },
  { id: "l2", technicianId: "T004", technicianName: "Maria Lopez", action: "Started task", zone: "Bay A - Heavy Check", time: "06:08" },
  { id: "l3", technicianId: "T005", technicianName: "David Park", action: "Entered Break Room", zone: "Break Room", time: "06:03" },
  { id: "l4", technicianId: "T008", technicianName: "Michael Brown", action: "Badge scanned", zone: "Bay D - Painting", time: "06:05" },
  { id: "l5", technicianId: "T009", technicianName: "Priya Sharma", action: "Entered zone", zone: "Bay B - Engine Shop", time: "05:58" },
  { id: "l6", technicianId: "T003", technicianName: "Robert Singh", action: "QC inspection started", zone: "QC Office", time: "06:12" },
  { id: "l7", technicianId: "T006", technicianName: "Ahmed Hassan", action: "Tool checkout", zone: "Tool Crib", time: "06:15" },
  { id: "l8", technicianId: "T002", technicianName: "Sarah Chen", action: "Diagnostic test started", zone: "Bay C - Avionics Lab", time: "06:20" },
];

export const entryExitLogs: EntryExitLog[] = [
  { id: "e1", technicianId: "T001", technicianName: "James Mitchell", badgeId: "BLE-4401", checkIn: "06:02", checkOut: null, zone: "Bay B - Engine Shop", duration: "1h 43m", date: "2026-02-11" },
  { id: "e2", technicianId: "T002", technicianName: "Sarah Chen", badgeId: "BLE-4402", checkIn: "06:00", checkOut: null, zone: "Bay C - Avionics Lab", duration: "1h 45m", date: "2026-02-11" },
  { id: "e3", technicianId: "T003", technicianName: "Robert Singh", badgeId: "BLE-4403", checkIn: "05:55", checkOut: null, zone: "QC Office", duration: "1h 50m", date: "2026-02-11" },
  { id: "e4", technicianId: "T004", technicianName: "Maria Lopez", badgeId: "BLE-4404", checkIn: "06:01", checkOut: null, zone: "Bay A - Heavy Check", duration: "1h 44m", date: "2026-02-11" },
  { id: "e5", technicianId: "T005", technicianName: "David Park", badgeId: "BLE-4405", checkIn: "06:03", checkOut: null, zone: "Break Room", duration: "1h 42m", date: "2026-02-11" },
  { id: "e6", technicianId: "T001", technicianName: "James Mitchell", badgeId: "BLE-4401", checkIn: "06:00", checkOut: "14:05", zone: "Bay B - Engine Shop", duration: "8h 05m", date: "2026-02-10" },
  { id: "e7", technicianId: "T002", technicianName: "Sarah Chen", badgeId: "BLE-4402", checkIn: "05:58", checkOut: "14:02", zone: "Bay C - Avionics Lab", duration: "8h 04m", date: "2026-02-10" },
  { id: "e8", technicianId: "T009", technicianName: "Priya Sharma", badgeId: "BLE-4409", checkIn: "05:55", checkOut: "14:10", zone: "Bay B - Engine Shop", duration: "8h 15m", date: "2026-02-10" },
];

export const auditLogs: AuditLog[] = [
  { id: "au1", user: "admin@mro.aero", role: "Admin", action: "User login", target: "System", time: "2026-02-11 05:45:00", ip: "10.0.1.45" },
  { id: "au2", user: "j.mitchell@mro.aero", role: "Supervisor", action: "Assigned technician", target: "T006 → B777-300", time: "2026-02-11 06:10:00", ip: "10.0.1.102" },
  { id: "au3", user: "admin@mro.aero", role: "Admin", action: "Modified zone capacity", target: "Bay D - Painting", time: "2026-02-11 05:50:00", ip: "10.0.1.45" },
  { id: "au4", user: "s.chen@mro.aero", role: "Supervisor", action: "Acknowledged alert", target: "Alert #a3", time: "2026-02-11 06:18:00", ip: "10.0.1.88" },
  { id: "au5", user: "admin@mro.aero", role: "Admin", action: "Badge reassigned", target: "BLE-4407 → Lisa Wang", time: "2026-02-10 14:22:00", ip: "10.0.1.45" },
];

export const productivityData = {
  zoneTime: [
    { zone: "Bay A", hours: 45, productive: 38 },
    { zone: "Bay B", hours: 32, productive: 29 },
    { zone: "Bay C", hours: 18, productive: 16 },
    { zone: "Bay D", hours: 24, productive: 20 },
    { zone: "Tool Crib", hours: 8, productive: 3 },
    { zone: "Break Room", hours: 12, productive: 0 },
  ],
  shiftEfficiency: [
    { shift: "Morning", efficiency: 87, target: 85 },
    { shift: "Afternoon", efficiency: 82, target: 85 },
    { shift: "Night", efficiency: 74, target: 80 },
  ],
  weeklyUtilization: [
    { day: "Mon", utilization: 88 },
    { day: "Tue", utilization: 91 },
    { day: "Wed", utilization: 85 },
    { day: "Thu", utilization: 89 },
    { day: "Fri", utilization: 82 },
    { day: "Sat", utilization: 65 },
    { day: "Sun", utilization: 45 },
  ],
  aircraftLabor: [
    { aircraft: "B737-800 (VT-AXR)", hours: 64, technicians: 4 },
    { aircraft: "B777-300 (VT-ALJ)", hours: 128, technicians: 6 },
    { aircraft: "A320 (VT-INE)", hours: 32, technicians: 2 },
    { aircraft: "ATR-72 (VT-RKD)", hours: 24, technicians: 2 },
  ],
};
