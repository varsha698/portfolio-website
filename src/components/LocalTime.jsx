import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const TZ = "America/Chicago"; // Minneapolis
const CITY = "Minneapolis";

const format = () =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());

const formatDay = () =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "long",
  }).format(new Date());

const LocalTime = () => {
  const [now, setNow] = useState(format());
  const [day, setDay] = useState(formatDay());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(format());
      setDay(formatDay());
    }, 1000 * 15);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col justify-center h-full">
      <div className="flex items-center gap-2 text-amber-400/80 text-xs uppercase tracking-wider mb-2">
        <FaMapMarkerAlt />
        <span>{CITY} · CT</span>
      </div>
      <div className="font-mono text-3xl md:text-4xl font-bold text-amber-300">
        {now}
      </div>
      <div className="text-sm text-gray-400 mt-1">{day}</div>
    </div>
  );
};

export default LocalTime;
