TaskMaster: A Collaborative Task Tracking System
![TaskMaster Logo](./assets/taskmaster-logo.png logo path or remove this line if you don't have one -->

🚀 Overview
TaskMaster is a collaborative, team-based task and project management system. Designed for modern teams, it enables users to create, assign, and track tasks, collaborate through comments and attachments, organize work in projects and teams, and streamline productivity with real-time updates and notifications.

✨ Features
User Authentication & Security

Secure registration & login (JWT, hashed passwords)

Profile management (view/update personal info)

Role-based access (user, admin, etc.)

Project & Team Management

Create and manage teams/projects

Invite and manage team members

Assign roles/permissions per project

Task Management

Create/read/update/delete (CRUD) tasks with title, description, status, due date, and priority

Assign tasks to team members

Filter, sort, and search tasks (by status, project, assignee, title, or description)

Mark tasks as completed

Collaboration

Comments and discussions on tasks

Attachments upload and sharing on tasks

Tag teammates in comments

Productivity Tools

Real-time updates (socket/push notifications)

Deadlines reminders and status notifications

🛠️ Tech Stack
Layer	Stack
Backend	Node.js, Express.js, MongoDB
Frontend	React (Redux)
Auth	JWT, bcrypt
Notifications	Email, in-app notifications (Planned)
File Storage	(Local/Cloud options, e.g. AWS S3 planned)
📦 Getting Started
Prerequisites
Node.js

npm or Yarn

MongoDB (local )

(For frontend) React.js

Install backend dependencies
bash
cd backend
npm install        # or yarn
Configure environment variables
Create a .env file in the /backend directory and fill in the required fields:

bash
PORT=5000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
# add other configuration as required
Run the server
bash
npm start
The API will start on http://localhost:5000/

(Optional) Install & Start Frontend
bash
cd ../frontend
npm install
npm start
Frontend will run on http://localhost:3000/

🔑 API Overview
Authentication

POST /api/auth/register: Register a new user

POST /api/auth/login: Login existing user

Users

GET /api/users/me: Get current user's profile

PUT /api/users/me: Update profile

Teams/Projects

POST /api/teams: Create new team/project

GET /api/teams: List all teams/projects

POST /api/teams/:id/invite: Invite team members

Tasks

POST /api/tasks: Create task

GET /api/tasks: List all tasks (filter, sort, search)

GET /api/tasks/:id: Get task by ID

PUT /api/tasks/:id: Update task details

DELETE /api/tasks/:id: Delete task

PUT /api/tasks/:id/complete: Mark task as completed

POST /api/tasks/:id/assign: Assign task

Collaboration

POST /api/tasks/:id/comments: Add comment to task

POST /api/tasks/:id/attachments: Upload attachment to task

Notifications (WIP)

Real-time task/project updates and reminders

For full API details, see the API documentation.



