// Tracked links: open the site with ?ref=<code> (e.g. ?ref=acme-swe) and the
// Pages Function at functions/api/visit.js sends a phone alert. Visitors
// without a ref are never reported.

import { RESUME_PATH } from "../data/profile";

const REF_KEY = "visit-ref";
const REF_PATTERN = /^[a-z0-9][a-z0-9_-]{0,47}$/;

const session = {
  get(key) {
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      sessionStorage.setItem(key, value);
    } catch {
      // storage blocked — the alert may repeat on reload, which is fine
    }
  },
};

const send = (event, ref) => {
  // Report each event once per browser session.
  const sentKey = `${REF_KEY}-sent-${event}`;
  if (session.get(sentKey)) return;
  session.set(sentKey, "1");

  fetch("/api/visit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event,
      ref,
      path: window.location.pathname,
      referrer: document.referrer,
    }),
    keepalive: true,
  }).catch(() => {});
};

// Call once on load: picks up ?ref=, remembers it for the session, removes it
// from the address bar, and reports the arrival.
export const captureVisitRef = () => {
  const url = new URL(window.location.href);
  const fromUrl = (url.searchParams.get("ref") || "").toLowerCase();

  if (REF_PATTERN.test(fromUrl)) {
    session.set(REF_KEY, fromUrl);
    url.searchParams.delete("ref");
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
  }

  const ref = session.get(REF_KEY);
  if (ref) send("arrive", ref);
};

export const trackResumeDownload = () => {
  const ref = session.get(REF_KEY);
  if (ref) send("resume", ref);
};

// Click handler for the whole document: catches every resume link.
export const onDocumentClick = (e) => {
  const link = e.target.closest?.("a[href]");
  if (link && link.getAttribute("href") === RESUME_PATH) trackResumeDownload();
};
