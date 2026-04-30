# Flow — 3D Pipeline Tracker

A full-stack 3D production pipeline management application built with the MERN stack. Flow allows 3D teams to organize scenes, register assets, assign work to artists, and track every asset through production stages in real time.

## Live Demo

- Frontend: https://flow-fl.vercel.app
- Backend: https://flow-j8g0.onrender.com

## Features

- User authentication (JWT based signup/login)
- Create, update, and delete 3D scenes
- Register and track assets with priority and due dates
- Pipeline stage tracking (Concept → Modeling → Texturing → Rendering → Final Output)
- Assign assets to team members
- Role based access control (owner, admin, member)
- Overdue asset highlighting
- Responsive design for mobile and desktop

## Tech Stack

**Frontend**
- React (Vite)
- React Router v6
- Axios
- Lucide React (icons)
- CSS Modules

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Joi Validation
- Helmet, Rate Limiting, CORS

## Project Structure

```
Flow/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components (Dock, etc.)
│   │   ├── context/        # Auth context
│   │   ├── pages/          # Page components
│   │   ├── services/       # API calls
│   │   └── utils/          # Helper functions
│   └── vercel.json
└── server/                 # Express backend
    ├── controllers/        # Route handlers
    ├── middleware/         # Auth, validation, error handling
    ├── models/             # Mongoose models
    ├── routes/             # API routes
    └── utils/              # Helper utilities
```

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account

### Backend Setup

```bash
cd server
npm install
```

Start the backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
```

Create `.env` file in `client/`:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open `http://localhost:5173`

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/users/signup | Register a new user |
| POST | /api/v1/users/login | Login |

### Scenes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/scenes | Get all scenes |
| POST | /api/v1/scenes | Create a scene |
| GET | /api/v1/scenes/:id | Get a scene |
| PATCH | /api/v1/scenes/:id | Update a scene |
| DELETE | /api/v1/scenes/:id | Delete a scene |
| GET | /api/v1/scenes/:id/members | Get scene members |
| POST | /api/v1/scenes/:id/members | Add a member |
| DELETE | /api/v1/scenes/:id/members/:userId | Remove a member |

### Assets

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/assets?sceneId= | Get assets by scene |
| POST | /api/v1/assets | Register an asset |
| GET | /api/v1/assets/:id | Get an asset |
| PATCH | /api/v1/assets/:id | Update an asset |
| DELETE | /api/v1/assets/:id | Delete an asset |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/users | Get all users |

---

Tholkappian Murugesan — [GitHub](https://github.com/TitanThols)
