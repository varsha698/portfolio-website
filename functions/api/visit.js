// Cloudflare Pages Function: POST /api/visit
//
// Sends a phone push (via ntfy.sh) when someone opens a tracked link such as
// https://varshinibhavanam.com/?ref=acme-swe. Only visits that carry a `ref`
// are reported; ordinary visitors are never sent here.
//
// Configure in Cloudflare Pages → Settings → Variables and Secrets:
//   NTFY_TOPIC   (secret) the private ntfy topic to publish to
// Without it the endpoint does nothing.

const REF_PATTERN = /^[a-z0-9][a-z0-9_-]{0,47}$/;
const EVENTS = {
  arrive: { title: "opened your portfolio", tags: "eyes", priority: "high" },
  resume: { title: "downloaded your resume", tags: "page_facing_up", priority: "high" },
};

const clean = (value, max) =>
  typeof value === "string" ? value.replace(/[\r\n]+/g, " ").slice(0, max) : "";

const referrerHost = (referrer) => {
  try {
    return referrer ? new URL(referrer).hostname.replace(/^www\./, "") : "";
  } catch {
    return "";
  }
};

export async function onRequestPost({ request, env }) {
  const topic = env.NTFY_TOPIC;
  if (!topic) return new Response(null, { status: 204 });

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(null, { status: 400 });
  }

  const ref = clean(body.ref, 48).toLowerCase();
  const event = EVENTS[body.event];
  if (!REF_PATTERN.test(ref) || !event) {
    return new Response(null, { status: 400 });
  }

  const cf = request.cf || {};
  const place = [cf.city, cf.regionCode || cf.region, cf.country].filter(Boolean).join(", ");
  const from = referrerHost(clean(body.referrer, 300));
  const rawPath = clean(body.path, 120);
  // Used in a header, so keep it to a plain ASCII path.
  const path = /^\/[\x21-\x7e]*$/.test(rawPath) ? rawPath : "/";
  const ua = request.headers.get("user-agent") || "";
  const device = /Mobi|Android|iPhone/i.test(ua) ? "phone" : "desktop";

  const lines = [
    place && `📍 ${place}`,
    `🔗 ${from ? `via ${from}` : "direct / email / PDF"}`,
    `📄 ${path} · ${device}`,
  ].filter(Boolean);

  try {
    await fetch(`https://ntfy.sh/${encodeURIComponent(topic)}`, {
      method: "POST",
      headers: {
        Title: `${ref} ${event.title}`,
        Tags: event.tags,
        Priority: event.priority,
        Click: `https://varshinibhavanam.com${path}`,
      },
      body: lines.join("\n"),
    });
  } catch {
    // A failed alert should never surface to the visitor.
  }

  return new Response(null, { status: 204 });
}
