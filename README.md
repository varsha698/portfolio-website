# portfolio-website

Source for my portfolio: **https://varshinibhavanam.com**

React 19 + Vite 6 + Tailwind CSS + Framer Motion, deployed on Cloudflare Pages.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run lint
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Where things live

| What | File |
|---|---|
| Email, GitHub, LinkedIn, resume path | `src/data/profile.js` |
| Projects (professional + personal) | `src/data/projects.js` |
| Work / education timeline | `src/pages/About.jsx` |
| Publications | `src/pages/Publications.jsx` |
| Certifications | `src/pages/Certificate.jsx` |
| Tech logos (react-icons / Simple Icons) | `src/components/techIcons.jsx` |
| Resume PDF | `public/Varshini_Bhavanam_Resume.pdf` |

The project count on the home page is computed from `src/data/projects.js`, so it updates
when projects are added or removed.

## Deploy

Cloudflare Pages builds the `main` branch with `npm run build` and serves `dist/`.
The site uses clean URLs (`/projects`, not `/#/projects`). Cloudflare Pages falls back to
`index.html` for unknown paths as long as there is no top-level `404.html`, so don't add one.
Old `/#/…` links are redirected in `src/App.jsx`.

### Contact form

By default the form opens the visitor's email app. To deliver messages directly, create a
free form at [Formspree](https://formspree.io) and set `VITE_FORMSPREE_ENDPOINT` in the
Cloudflare Pages environment variables.

Only put **public** values in `VITE_*` variables — Vite bundles them into the JavaScript
that every visitor downloads.

### Docker (optional self-hosting)

```bash
docker build -t portfolio-app .
docker run -d -p 8080:80 portfolio-app   # http://localhost:8080
```
