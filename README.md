# GHIAL MRO Technician Productivity Monitoring

Prompt:

Create a professional internal web application UI for an Aviation MRO Technician Productivity Tracking System that uses BLE-based tracking to monitor technician movement and productivity inside aircraft hangars.

This is a functional tracking application used by MRO management, not a marketing website.

The UI should be clean, enterprise-style, and optimized for operations dashboards. Use aviation theme colors (blue, grey, white).

Include the following modules and screens:

🔷 Login & Access Control

Secure login screen

Single Sign-On (SSO) option

Role-based access:

Admin

MRO Manager

Supervisor

Audit logs for user actions

🔷 Main Dashboard (Home Screen)

Top Summary Panel:

Total technicians active

Utilization %

Active aircraft count

Alerts summary

Main View:

Live hangar map with zones

Technician distribution by zone

Color-coded zones

Side Panel:

Alerts

Recent activity feed

🔷 Live Tracking Screen

Real-time monitoring:

Current technician location by zone

Active vs idle technicians

Staff count per zone

Live counters updating automatically

🔷 Technician Management Screen

Technician profile management:

Name

ID

Role

Shift

Badge ID mapping

Skill category (engine, avionics, structure)

Features:

Assign technician to aircraft/project

Track certification validity dates

🔷 Productivity Analytics Screen

Show charts and reports for:

Time spent per zone

Productive vs non-productive time

Shift efficiency

Technician utilization %

Aircraft-wise labor effort

Include filters:

Date

Shift

Aircraft

Zone

🔷 Entry & Exit Logs Screen

Digital attendance and movement logs:

Check-in/out times

Zone entry history

Shift duration tracking

Search and filter options included.

🔷 Alerts & Notifications

Idle technician alerts

Restricted zone alerts

Badge offline alerts

Overcrowded zone alerts

Design the application as a real operational tool used by airport MRO teams daily. Focus on usability, clear dashboards, and data visualization rather than marketing content.

This will generate something closer to a real SaaS dashboard app.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/692f05b3-9870-4619-abc5-56507d789fa2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
