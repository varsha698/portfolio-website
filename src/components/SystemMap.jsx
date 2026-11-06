import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Blueprint-style map of the on-prem stack I run at Xecutive Development.
// Every box is something documented in src/data/projects.js; keep the two in
// sync if either changes.

const NODES = {
  visitors: {
    label: "Visitors",
    sub: "browser · phone",
    detail: "Customers, field operators and office staff using the company's apps.",
  },
  cloudflare: {
    label: "Cloudflare Tunnel",
    sub: "edge · TLS",
    detail:
      "Traffic comes in through a Cloudflare Tunnel, so the servers have no open inbound ports.",
  },
  caddy: {
    label: "Caddy gateway",
    sub: "reverse-proxy VM",
    detail: "One gateway VM routes each hostname to the right app VM.",
  },
  salestax: {
    label: "Sales-tax filing",
    sub: "Django · Postgres",
    detail:
      "My multi-state sales-tax engine for MN, CO and NY. A parallel batch engine runs 1,021 rows in 11.9 s instead of ~340 s.",
    to: "/projects/sales-tax",
    cta: "read the case study",
  },
  portal: {
    label: "Operator portal",
    sub: "Rails 8 · React 19",
    detail:
      "Payroll and operations portal for field operators. I led the frontend redesign and built the English/Spanish i18n.",
    to: "/projects",
    cta: "see projects",
  },
  payroll: {
    label: "Payroll hub",
    sub: "Flask",
    detail:
      "Unifies snow, lawn and cleanup payroll by state. I fixed a weed-and-feed calculation bug and put its test suite in CI.",
    to: "/projects",
    cta: "see projects",
  },
  renewals: {
    label: "Renewal payments",
    sub: "Rails · Stripe",
    detail:
      "Charges annual renewals through Stripe. I added a dry-run mode, on by default, so a test run can never charge real cards.",
    to: "/projects",
    cta: "see projects",
  },
  proxmox: {
    label: "Proxmox VE",
    detail:
      "I installed Proxmox on the company's servers and built the VMs every app here runs on: Docker Compose stacks managed by systemd.",
  },
};

const APPS = ["salestax", "portal", "payroll", "renewals"];

// Two layouts: a wide sheet for tablets/desktops, a tall one for phones so
// the labels stay readable. Coordinates are box centres.
const LAYOUTS = {
  wide: {
    viewBox: "0 0 640 460",
    box: { w: 150, h: 52 },
    appBox: { w: 132, h: 60 },
    nodes: {
      visitors: [110, 60],
      cloudflare: [320, 60],
      caddy: [530, 60],
      salestax: [102, 334],
      portal: [248, 334],
      payroll: [394, 334],
      renewals: [540, 334],
    },
    proxmox: { x: 24, y: 168, w: 592, h: 268 },
    edges: ["M185 60 H245", "M395 60 H455"],
    notes: [
      { x: 215, y: 50, text: "https" },
      { x: 425, y: 50, text: "tunnel" },
      { x: 540, y: 112, text: "no open ports", anchor: "start" },
    ],
    // Continuous request routes from the visitor to each app.
    route: (id, [x, y], h) => `M185 60 H530 V256 H${x} V${y - h / 2}`,
    bus: (x, y, h) => `M530 86 V256 H${x} V${y - h / 2}`,
    proxmoxLabel: "PROXMOX VE · ON-PREM",
    proxmoxNote: { x: 600, y: 424, text: "docker compose + systemd per VM" },
  },
  tall: {
    viewBox: "0 0 360 650",
    box: { w: 170, h: 50 },
    appBox: { w: 150, h: 60 },
    nodes: {
      visitors: [180, 42],
      cloudflare: [180, 136],
      caddy: [180, 230],
      salestax: [96, 410],
      portal: [264, 410],
      payroll: [96, 540],
      renewals: [264, 540],
    },
    proxmox: { x: 12, y: 290, w: 336, h: 340 },
    edges: ["M180 67 V111", "M180 161 V205"],
    notes: [
      { x: 188, y: 93, text: "https", anchor: "start" },
      { x: 188, y: 187, text: "tunnel · no open ports", anchor: "start" },
    ],
    route: (id, [x, y], h) => {
      const turn = y > 450 ? 475 : 352;
      return `M180 67 V${turn} H${x} V${y - h / 2}`;
    },
    bus: (x, y, h) => {
      const turn = y > 450 ? 475 : 352;
      return `M180 255 V${turn} H${x} V${y - h / 2}`;
    },
    proxmoxLabel: "PROXMOX VE",
    proxmoxNote: { x: 336, y: 618, text: "on-prem · compose + systemd" },
  },
};

const useMedia = (query) => {
  const get = () =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia(query).matches
      : false;
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
};

const SystemMap = () => {
  const wide = useMedia("(min-width: 640px)");
  const reduceMotion = useMedia("(prefers-reduced-motion: reduce)");
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  const L = wide ? LAYOUTS.wide : LAYOUTS.tall;
  const info = active ? NODES[active] : null;

  const activate = (id) => {
    const n = NODES[id];
    if (n.to && active === id) navigate(n.to);
    else setActive(id);
  };

  const nodeProps = (id) => ({
    role: "button",
    tabIndex: 0,
    "aria-label": `${NODES[id].label}${NODES[id].sub ? `, ${NODES[id].sub}` : ""}`,
    "aria-pressed": active === id,
    onMouseEnter: () => setActive(id),
    onFocus: () => setActive(id),
    onClick: () => activate(id),
    onKeyDown: (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate(id);
      }
    },
    className: "sysmap-node cursor-pointer outline-none",
  });

  const renderBox = (id) => {
    const [cx, cy] = L.nodes[id];
    const isApp = APPS.includes(id);
    const { w, h } = isApp ? L.appBox : L.box;
    const on = active === id;
    return (
      <g key={id} {...nodeProps(id)}>
        <rect
          x={cx - w / 2}
          y={cy - h / 2}
          width={w}
          height={h}
          rx="4"
          fill={on ? "#1c1406" : "#0a0d14"}
          stroke={on ? "#fbbf24" : "#92400e"}
          strokeWidth={on ? 1.6 : 1}
        />
        {/* blueprint corner ticks */}
        <path
          d={`M${cx - w / 2 - 4} ${cy - h / 2 + 6} V${cy - h / 2 - 4} H${cx - w / 2 + 6}`}
          stroke="#f59e0b"
          strokeOpacity="0.6"
          fill="none"
        />
        <text
          x={cx}
          y={cy - (NODES[id].sub ? 3 : -4)}
          textAnchor="middle"
          className="fill-amber-200"
          style={{ fontSize: 13, fontWeight: 600 }}
        >
          {NODES[id].label}
        </text>
        {NODES[id].sub && (
          <text
            x={cx}
            y={cy + 14}
            textAnchor="middle"
            className="fill-gray-400 font-mono"
            style={{ fontSize: 10 }}
          >
            {NODES[id].sub}
          </text>
        )}
      </g>
    );
  };

  const P = L.proxmox;
  const proxOn = active === "proxmox";

  return (
    <figure className="w-full">
      <svg
        viewBox={L.viewBox}
        className="w-full h-auto select-none"
        role="group"
        aria-label="Diagram of the on-prem stack I run: visitors reach a Cloudflare Tunnel, then a Caddy gateway, then app VMs on Proxmox."
      >
        {/* Proxmox enclosure */}
        <g {...nodeProps("proxmox")}>
          <rect
            x={P.x}
            y={P.y}
            width={P.w}
            height={P.h}
            rx="6"
            fill={proxOn ? "rgba(245,158,11,0.06)" : "rgba(245,158,11,0.025)"}
            stroke={proxOn ? "#fbbf24" : "#b45309"}
            strokeDasharray="6 5"
          />
          <text
            x={P.x + 14}
            y={P.y + 24}
            className="fill-amber-300 font-mono"
            style={{ fontSize: 12, letterSpacing: 1 }}
          >
            {L.proxmoxLabel}
          </text>
        </g>
        <text
          x={L.proxmoxNote.x}
          y={L.proxmoxNote.y}
          textAnchor="end"
          className="fill-gray-500 font-mono"
          style={{ fontSize: 10 }}
        >
          {L.proxmoxNote.text}
        </text>

        {/* Wires */}
        <g stroke="#d97706" strokeOpacity="0.55" fill="none" strokeWidth="1.2">
          {L.edges.map((d) => (
            <path key={d} d={d} />
          ))}
          {APPS.map((id) => {
            const [x, y] = L.nodes[id];
            return (
              <path
                key={id}
                d={L.bus(x, y, L.appBox.h)}
                stroke={active === id ? "#fbbf24" : undefined}
                strokeOpacity={active === id ? 0.95 : undefined}
              />
            );
          })}
        </g>
        {L.notes.map((n) => (
          <text
            key={n.text}
            x={n.x}
            y={n.y}
            textAnchor={n.anchor || "middle"}
            className="fill-gray-500 font-mono"
            style={{ fontSize: 10 }}
          >
            {n.text}
          </text>
        ))}

        {/* Requests travelling through the stack; boxes are drawn on top so a
            packet disappears while it is "inside" a service. */}
        {!reduceMotion &&
          APPS.map((id, i) => (
            <circle key={id} r="3.2" fill="#fde68a">
              <animateMotion
                dur="3.2s"
                begin={`${i * 0.8}s`}
                repeatCount="indefinite"
                path={L.route(id, L.nodes[id], L.appBox.h)}
              />
            </circle>
          ))}

        {["visitors", "cloudflare", "caddy", ...APPS].map(renderBox)}
      </svg>

      <figcaption
        aria-live="polite"
        className="mt-3 min-h-[5.5rem] rounded-md border border-amber-900/50 bg-black/60 px-4 py-3 text-left text-sm"
      >
        {info ? (
          <>
            <div className="font-mono text-xs uppercase tracking-wider text-amber-400/80">
              {info.label}
            </div>
            <p className="mt-1 text-gray-300">{info.detail}</p>
            {info.to && (
              <Link
                to={info.to}
                className="mt-1 inline-block font-mono text-xs text-amber-400 hover:text-amber-300"
              >
                {info.cta} →
              </Link>
            )}
          </>
        ) : (
          <p className="text-gray-400">
            <span className="font-mono text-xs uppercase tracking-wider text-amber-400/80">
              fig. 1 —
            </span>{" "}
            The stack I run at work, live. Hover or tap any box to see what it
            does and what I built there.
          </p>
        )}
      </figcaption>
    </figure>
  );
};

export default SystemMap;
