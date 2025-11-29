# Itsuki no Tabi — Project Overview

This repository contains a full-stack application (backend + frontend) for "Itsuki no Tabi", a travel guide and trip planning platform focused on Japan. It includes features for browsing destinations, reading and creating travel articles, user authentication, and itinerary planning. The app uses Node.js + Express + MongoDB for the backend and a React + Vite frontend with Tailwind CSS.

---

**Table of contents**
- Overview
- Features
- Architecture & Code Organization
- Getting started (local development)
	- Prerequisites
	- Backend setup
	- Frontend setup
- Environment variables
- Database & seeds
- File uploads & images
- Authentication & security
- API reference (high-level)
- Frontend structure (key pages & components)
- Backend structure (key controllers, models, middleware)
- Admin features
- Testing & linting
- Deployment notes
- Troubleshooting
- Contributing
- License

---

## Overview

Itsuki no Tabi is a content-driven travel platform for discovering destinations in Japan, reading articles, and building travel plans. It supports image uploads for articles and destinations, interest tagging, comments, and an admin dashboard for CRUD operations.

## Features

- Browse destinations, each with metadata and associated articles
- Read full travel articles with cover images, map locations (lat/lng), and related articles
- Create, edit, and delete articles (admin)
- Upload images via multipart/form-data (Multer on backend)
- Authentication with JWT stored in cookies (sign up, login, logout)
- Rate-limited auth endpoints to mitigate abuse
- Create and save trip plans (per-user or guest) with persistence
- Interests/tags and searching/filtering by destination or interests
- Admin pages for managing articles, destinations, interests, and users
- Client-side validation and server-side validation (including required geolocation for articles)

## Architecture & Code Organization

Top-level layout:

- `backend/` — Express API server
	- `controllers/` — route handlers (articles, users, auth, comments, destinations, interests, plans)
	- `models/` — Mongoose schemas
	- `routes/` — Express routes wiring controllers
	- `middleware/` — auth middleware, upload middleware, rate limiting
	- `utils/` — helpers (slugify, token generation)
	- `mailtrap/` — email templates & config for development

- `frontend/` — React + Vite app
	- `src/pages/` — top-level pages (HomePage, Article pages, Admin pages)
	- `src/components/` — reusable UI components (Navbar, Footer, LocationPicker, ArticleCard)
	- `src/store/` — Zustand stores for state management (articleStore, authStore, planStore, destinationStore)
	- `src/utils/` — helpers & API client

## Getting started (local development)

Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

Backend setup

1. Change to the backend directory:

```pwsh
cd backend
```

2. Install dependencies:

```pwsh
npm install
```

3. Create a `.env` file (see Environment variables section)

4. Run seed scripts (optional) to populate destinations and sample articles:

```pwsh
npm run seed
```

5. Start the dev server:

```pwsh
npm run dev
```

Frontend setup

1. Open a new terminal, change to the frontend directory:

```pwsh
cd frontend
```

2. Install dependencies:

```pwsh
npm install
```

3. Start the dev server:

```pwsh
npm run dev
```

Open `http://localhost:5173` (or the port Vite shows) and the frontend should connect to the backend API.

## Environment variables

Create a `.env` file in `backend/` with values similar to:

- `PORT=5000`
- `MONGO_URI=mongodb://localhost:27017/itsu-tab`
- `JWT_SECRET=your_jwt_secret`
- `JWT_EXPIRES_IN=7d`
- `COOKIE_SECURE=false` (true for HTTPS in production)
- `BASE_URL=http://localhost:5000` (used when building absolute image URLs)

For Mailtrap/email testing, provide Mailtrap keys in `mailtrap/mailtrap.config.js` or environment variables.

## Database & seeds

- Mongoose models live in `backend/src/models`.
- Seed scripts are in `backend/src/seeds` and can be run with `npm run seed` to populate sample destinations, interests, and articles.

## File uploads & images

- The backend uses `multer` middleware (`upload.middleware.js`) to accept multipart/form-data for image uploads.
- Uploaded images are stored in `backend/uploads` and served statically via Express.
- Frontend sends images using `FormData` with the key `image` when creating/updating articles or destinations.
- The backend returns absolute URLs for `imageUrl` (using protocol + host + path) so the frontend can directly display images.

## Authentication & security

- JWT tokens are generated and set in HTTP-only cookies (helper `generateTokenAndSetCookie.js`).
- Auth middleware (`auth.middleware.js`) protects routes and returns clear error messages when tokens are missing or invalid.
- Rate limiting is applied to auth routes to reduce brute-force attempts.
- Input validation happens both server-side (controllers) and client-side (forms) with structured error responses.

## API reference (detailed examples)

Note: Replace `API_BASE` with your backend base URL, for example `http://localhost:5000/api`.

Below are practical request + response examples you can use to test or integrate with the API. The backend expects some fields (notably `interests` and `location`) to be sent as JSON-stringified values when using multipart `FormData`.

1) Register (create account)

Request:

```bash
curl -X POST "${API_BASE:-http://localhost:5000}/api/auth/register" \
	-H "Content-Type: application/json" \
	-d '{"name":"Alice","email":"alice@example.com","password":"P@ssw0rd"}'
```

Success Response (201):

```json
{
	"success": true,
	"user": {
		"_id": "64a1f...",
		"name": "Alice",
		"email": "alice@example.com",
		"role": "user"
	}
}
```

2) Login (returns http-only cookie with JWT)

Request:

```bash
curl -i -X POST "${API_BASE:-http://localhost:5000}/api/auth/login" \
	-H "Content-Type: application/json" \
	-d '{"email":"alice@example.com","password":"P@ssw0rd"}'
```

Successful response sets a cookie (see `Set-Cookie` header) and returns user data:

```json
{
	"success": true,
	"user": {
		"_id": "64a1f...",
		"name": "Alice",
		"email": "alice@example.com",
		"role": "user"
	}
}
```

3) Get current user (authenticated)

Request (browser or curl with cookie):

```bash
curl -X GET "${API_BASE:-http://localhost:5000}/api/auth/me" \
	-H "Cookie: token=..."
```

Response (200):

```json
{ "success": true, "user": { "_id":"64a1f...", "name":"Alice", "email":"alice@example.com", "role":"user" } }
```

4) Create an article (admin) — multipart/form-data (example with curl)

Notes:
- `interests` and `location` should be stringified JSON when sent in `FormData`.
- `image` is sent as a file field.

Request (curl):

```bash
curl -X POST "${API_BASE:-http://localhost:5000}/api/articles" \
	-H "Cookie: token=YOUR_ADMIN_JWT_COOKIE" \
	-F "title=My Trip to Kyoto" \
	-F "summary=Short summary" \
	-F "content=Detailed article content here..." \
	-F "destination=64b3d..." \
	-F "interests=[\"food\",\"temples\"]" \
	-F "location={\"lat\":35.0116,\"lng\":135.7681,\"address\":\"Kyoto, Japan\"}" \
	-F "image=@/path/to/photo.jpg"
```

Success Response (201):

```json
{
	"success": true,
	"article": {
		"_id": "650e1...",
		"title": "My Trip to Kyoto",
		"summary": "Short summary",
		"content": "Detailed article content here...",
		"destination": "64b3d...",
		"interests": ["food","temples"],
		"location": { "lat": 35.0116, "lng": 135.7681, "address": "Kyoto, Japan" },
		"imageUrl": "http://localhost:5000/uploads/....jpg"
	}
}
```

5) Update an article (admin) — multipart/form-data

Request (curl):

```bash
curl -X PUT "${API_BASE:-http://localhost:5000}/api/articles/650e1.../edit" \
	-H "Cookie: token=YOUR_ADMIN_JWT_COOKIE" \
	-F "title=Updated title" \
	-F "location={\"lat\":35.0117,\"lng\":135.7682,\"address\":\"Updated place\"}" \
	-F "image=@/path/to/new-photo.jpg"
```

Success Response (200):

```json
{ "success": true, "article": { "_id":"650e1...", "title":"Updated title", "imageUrl":"..." } }
```

6) Get an article by id

Request:

```bash
curl -X GET "${API_BASE:-http://localhost:5000}/api/articles/650e1..."
```

Response (200):

```json
{
	"success": true,
	"article": {
		"_id": "650e1...",
		"title": "My Trip to Kyoto",
		"summary": "Short summary",
		"content": "Detailed article content...",
		"imageUrl": "http://localhost:5000/uploads/....jpg",
		"destination": { "_id": "64b3d...", "title": "Kyoto", "slug": "kyoto" },
		"interests": ["food","temples"],
		"location": { "lat": 35.0116, "lng": 135.7681, "address": "Kyoto, Japan" }
	}
}
```

7) List articles (search, pagination)

Request (example with search and page):

```bash
curl -X GET "${API_BASE:-http://localhost:5000}/api/articles?search=kyoto&page=1&limit=10"
```

Response (200) — note the pagination shape used by the frontend (`data`, `total`, `page`, `pages`):

```json
{
	"success": true,
	"data": [ { "_id":"...", "title":"...", "imageUrl":"..." }, ... ],
	"total": 42,
	"page": 1,
	"pages": 5
}
```

8) List destinations

Request:

```bash
curl -X GET "${API_BASE:-http://localhost:5000}/api/destinations"
```

Response (200):

```json
{
	"success": true,
	"data": [
		{ "_id": "64b3d...", "title": "Kyoto", "slug": "kyoto", "articleCount": 12 },
		{ "_id": "64b4e...", "title": "Tokyo", "slug": "tokyo", "articleCount": 25 }
	]
}
```

9) Get destination by slug

Request:

```bash
curl -X GET "${API_BASE:-http://localhost:5000}/api/destinations/kyoto"
```

Response (200):

```json
{
	"success": true,
	"destination": {
		"_id": "64b3d...",
		"title": "Kyoto",
		"slug": "kyoto",
		"description": "...",
		"articles": [ /* array of article summaries */ ]
	}
}
```

10) Create/save a plan (authenticated)

Request (JSON):

```bash
curl -X POST "${API_BASE:-http://localhost:5000}/api/plans" \
	-H "Content-Type: application/json" \
	-H "Cookie: token=..." \
	-d '{"title":"My Summer Trip","items":[{"date":"2025-07-10","place":"Kyoto","notes":"visit temple"}]}'
```

Response (201):

```json
{ "success": true, "plan": { "_id":"...", "title":"My Summer Trip", "items": [...] } }
```

11) Add a comment to an article

Request (JSON):

```bash
curl -X POST "${API_BASE:-http://localhost:5000}/api/comments" \
	-H "Content-Type: application/json" \
	-H "Cookie: token=..." \
	-d '{"articleId":"650e1...","text":"Great article!"}'
```

Response (201):

```json
{ "success": true, "comment": { "_id":"...", "article":"650e1...","text":"Great article!","author":{...} } }
```

12) Notes on FormData fields

- When sending `FormData` for endpoints that accept files (articles, destinations), send `interests` and `location` as JSON strings. Example:

```js
payload.append('interests', JSON.stringify(['food','nature']))
payload.append('location', JSON.stringify({ lat: 35.0116, lng: 135.7681, address: 'Kyoto' }))
```

The server controllers will parse these stringified fields and validate presence of required values (for articles, `location.lat` and `location.lng` are required).


## Frontend structure (key pages & components)

- `src/pages/HomePage.jsx` — Hero + search (now searches destinations), quick links, features
- `src/pages/articles/ArticleListPage.jsx` — list of articles with pagination
- `src/pages/articles/ArticleDetailPage.jsx` — full article view with cover image, description, and "Explore Nearby" showing other articles from same destination
- `src/pages/articles/ArticleCreatePage.jsx` & `ArticleEditPage.jsx` — admin forms for article CRUD (use `LocationPicker`, `InterestTagInput`, image upload previews)
- `src/pages/PlanningPage.jsx` — create and manage trip plans
- `src/components/LocationPicker.jsx` — map UI for picking coordinates (lat/lng)
- `src/components/ArticleCard.jsx`, `DestinationCard.jsx` — compact previews used across the app
- `src/components/Navbar.jsx` — top navigation with active-tab styling and dropdown for destinations

State Management
- Uses Zustand stores in `src/store/` for centralizing data and minimizing prop drilling (articleStore, destinationStore, authStore, planStore, interestStore).

API Client
- `src/utils/api.js` is an Axios instance with baseURL configured and helpers for attaching cookies, handling upload progress, and error normalization.

## Backend structure (key controllers, models, middleware)

- `controllers/article.controller.js` — handles creating, updating, fetching, and deleting articles. Handles parsing FormData, validating location, and attaching `imageUrl`.
- `controllers/destination.controller.js` — CRUD for destinations and exposes endpoints for frontend lists and detail pages.
- `controllers/auth.controller.js` — register/login/logout, with password hashing and token issuance.
- `middleware/upload.middleware.js` — multer config for handling `single('image')` uploads.
- `middleware/auth.middleware.js` — verifies JWT cookie or header and sets `req.user`.

## Admin features

- Admin-only pages under `frontend/src/pages/admin/` allow managing articles, destinations, interests, plans, and users.
- Backend routes validate admin role for protected operations.

## Testing & linting

- No test suite included by default, but jest + supertest can be added for backend API tests.
- ESLint and Prettier can be configured in the root workspace for consistent formatting.

## Deployment notes

- For production, build the frontend with Vite (`npm run build`) and serve the static assets from a CDN or static host.
- Backend should run behind a process manager (PM2) or container (Docker) and connect to a managed MongoDB instance.
- Set `COOKIE_SECURE=true` when serving over HTTPS and configure CORS on the backend appropriately.

## Troubleshooting

- If `npm run dev` fails in the backend, check `.env` values and MongoDB connectivity.
- If images aren't displayed, verify that `uploads/` is served statically and `imageUrl` values are absolute (protocol + host + path).

## Contributing

- Fork the repo, create a branch, make changes, open a PR. Keep changes small and focused.

## License

- (Add project license here)
