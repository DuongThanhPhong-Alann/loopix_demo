# Project Structure

This project now runs as a Next.js app.

- `src/app`: Next.js App Router entry points only.
- `src/frontend`: frontend UI code, styles, routes, and legacy static markup kept for migration safety.
- `src/backend`: backend/API-facing code when the project adds real server APIs.
- `src/shared`: shared resources used by both frontend and backend.
- `server`: server/deployment files such as Docker and compose config.
- `public`: public images and JSON assets served from `/`.
- `scripts`: project utility scripts.
- `tests`: test files.
