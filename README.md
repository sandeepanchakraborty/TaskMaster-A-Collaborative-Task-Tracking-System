# 🧠 TaskMaster: A Collaborative Task Tracking System

TaskMaster is a powerful team-based task and project management tool designed for modern workspaces. With real-time notifications, role-based access, and seamless collaboration features, it helps teams stay organized, communicate efficiently, and deliver tasks on time.

---

## 🚀 Features

- **Authentication & Security**
  - Secure login using JWT and hashed passwords
  - User profile management
  - Role-based access (User/Admin)

- **Project & Team Management**
  - Create and manage teams/projects
  - Invite team members with role-based permissions

- **Task Tracking**
  - Full CRUD operations with details like title, description, status, priority, and due date
  - Filter, sort, and search capabilities
  - Assign tasks and mark them as complete

- **Collaboration**
  - Comment threads on tasks
  - File attachments with tagging functionality

- **Productivity Enhancers**
  - Real-time socket-based updates (planned)
  - Deadline reminders and status notifications

---

## 🛠 Tech Stack

| Layer     | Technology               |
|----------|---------------------------|
| Backend  | Node.js, Express.js, MongoDB |
| Frontend | React.js, Redux            |
| Auth     | JWT, bcrypt                |
| Storage  | Local  |
| Notifications | In-app & email (Planned) |

---

## 📦 Installation & Setup

### Prerequisites

- Node.js & npm or Yarn
- MongoDB (local)
- React.js (for frontend)

### 🔧 Backend Setup

```bash
cd backend
npm install
