# SwiftMart Client (React + Vite)

Frontend for SwiftMart. Tailwind is enabled; routes are handled with `react-router-dom` and auth flows hit the server via Axios.

## Quick start
1) Install: `npm install`
2) Env: copy `env.example` to `.env` and set values.
3) Run dev: `npm run dev`
4) Build: `npm run build`

## Env vars (Vite)
- `VITE_API_URL` – base URL of backend, e.g. `http://localhost:5000`

## Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview build
- `npm run lint` – eslint

## Project structure (client)
- `src/Components/` – UI pages/components (Home, Products, Cart, etc.)
- `src/context/` – providers for auth, cart, search
- `src/services/` – API helpers (auth)
- `src/assets/` – static assets
- `src/states/` – currently empty (remove or use for extra global state)
- `src/styles/` – currently empty (remove or add custom styles)

## Notes
- Auth and social login expect the backend at `VITE_API_URL`; update `.env` accordingly.
- Tailwind directives are set in `index.css`. `App.css` is empty; add custom styles or remove if unused.
