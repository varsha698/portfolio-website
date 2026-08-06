import { useEffect, useState } from "react";
import { FaGithub, FaCodeBranch, FaStar } from "react-icons/fa";

const USER = "varsha698";

// Uses the public GitHub API (no auth). If it rate-limits, we render a
// friendly link fallback instead of dead space.
const GithubActivity = () => {
  const [state, setState] = useState({
    loading: true,
    error: false,
    events: [],
    stats: null,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [eventsRes, userRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USER}/events/public?per_page=6`),
          fetch(`https://api.github.com/users/${USER}`),
        ]);
        if (!eventsRes.ok || !userRes.ok) throw new Error("rate limited");
        const events = await eventsRes.json();
        const user = await userRes.json();
        if (cancelled) return;
        setState({
          loading: false,
          error: false,
          events: events.slice(0, 5),
          stats: {
            repos: user.public_repos,
            followers: user.followers,
          },
        });
      } catch {
        if (!cancelled) {
          setState((s) => ({ ...s, loading: false, error: true }));
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const describe = (ev) => {
    const repo = ev.repo?.name?.split("/").pop() || "repo";
    switch (ev.type) {
      case "PushEvent": {
        const n = ev.payload?.commits?.length || 0;
        return `pushed ${n} commit${n === 1 ? "" : "s"} to ${repo}`;
      }
      case "CreateEvent":
        return `created ${ev.payload?.ref_type || "resource"} in ${repo}`;
      case "PullRequestEvent":
        return `${ev.payload?.action || "updated"} PR in ${repo}`;
      case "IssuesEvent":
        return `${ev.payload?.action || "updated"} an issue in ${repo}`;
      case "WatchEvent":
        return `starred ${repo}`;
      case "ForkEvent":
        return `forked ${repo}`;
      default:
        return `activity in ${repo}`;
    }
  };

  const timeAgo = (iso) => {
    const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (s < 60) return `${s}s ago`;
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
    return `${Math.floor(s / 86400)}d ago`;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-amber-400">
          <FaGithub className="text-lg" />
          <span className="font-mono text-sm">recent activity</span>
        </div>
        <a
          href={`https://github.com/${USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-amber-400/70 hover:text-amber-400 transition"
        >
          @{USER} →
        </a>
      </div>

      {state.stats && (
        <div className="flex gap-4 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <FaCodeBranch className="text-amber-400/70" />
            {state.stats.repos} repos
          </span>
          <span className="flex items-center gap-1">
            <FaStar className="text-amber-400/70" />
            {state.stats.followers} followers
          </span>
        </div>
      )}

      {state.loading && (
        <div className="text-sm text-gray-500 font-mono">fetching…</div>
      )}

      {state.error && (
        <div className="text-sm text-gray-500">
          Couldn&apos;t reach the GitHub API — see the full profile{" "}
          <a
            href={`https://github.com/${USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300"
          >
            here
          </a>
          .
        </div>
      )}

      {!state.loading && !state.error && (
        <ul className="space-y-1.5 text-sm flex-grow overflow-hidden">
          {state.events.length === 0 && (
            <li className="text-gray-500">No recent public activity.</li>
          )}
          {state.events.map((ev) => (
            <li key={ev.id} className="flex justify-between gap-3 text-gray-300">
              <span className="truncate">{describe(ev)}</span>
              <span className="text-gray-500 text-xs shrink-0 mt-0.5">
                {timeAgo(ev.created_at)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GithubActivity;
