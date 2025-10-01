---

# CubeTimer

A comprehensive web application for speedcubers to track their solves, analyze performance, and improve their skills.

---

## Features

### Core Functionality:
- **Solve Timer:** Measure and record Rubik's cube solve times.
- **Scramble Generator:** Generate valid scrambles for your solves.
- **User Management:** 
  - Secure accounts with JWT access tokens and rotating refresh tokens.
  - Manage sessions (log out specific devices or all sessions).
- **Data Storage:** Solve history and user data are saved in a PostgreSQL database.
- **Notifications:** Receive real-time notifications and manage them in a dedicated tab.
- **Guarded Endpoints:** Ensures secure access for authenticated users only.
- **Statistics Overview:** View best times, averages, and solve history.

### Technology Stack:
- **Frontend:** React with Vite
- **Backend:** NestJS
- **Database:** PostgreSQL
- **State Management:** Redux
- **Styling:** CSS Modules
- **Authentication:** JWT-based authentication

---

## Roadmap

### Upcoming Features:
- **Advanced Statistics:** Calculate averages (Ao5, Ao12, etc.) and visualize progress using graphs and timelines.
- **Algorithm Trainer:** Practice specific algorithms with visual demonstrations and timers.
- **1v1 Competitions:** Real-time solving matches with other users.
- **Custom Themes:** Personalize the app’s appearance in settings.
- **Smart Device Integration:** Connect with devices like smart cubes and timers.