// Prefix a public/ path with Vite's base so the site works when served from a
// subpath (e.g. GitHub Pages at /portfolio-website/) as well as from the root.
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
