import React, { createContext, useContext, useState, useEffect } from 'react';
import { ScheduleData, ScheduleContextType } from '../types/schedule';

const RAW_POSTS_URL = "https://raw.githubusercontent.com/auroraclinic/posts/main";

async function fetchScheduleMarkdown(): Promise<string> {
  try {
    const res = await fetch(`${RAW_POSTS_URL}/SCHEDULE.md`);
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.text();
  } catch {
    return "Error loading schedule.";
  }
}

function parseScheduleMarkdown(markdown: string): ScheduleData {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const schedule: ScheduleData = {};
  const defaultHours: ScheduleData = {
    Monday: "9:00 AM - 5:30 PM",
    Tuesday: "9:00 AM - 5:30 PM",
    Wednesday: "Closed",
    Thursday: "9:00 AM - 5:30 PM",
    Friday: "9:00 AM - 5:30 PM",
    Saturday: "9:00 AM - 1:00 PM (1st & 3rd only)",
    Sunday: "Closed",
  };

  for (const day of days) schedule[day] = defaultHours[day];

  if (!markdown || typeof markdown !== "string") return schedule;

  const lines = markdown.split(/\r?\n/).map((line) => line.trim());
  const extractHours = (str: string | undefined): string | null => {
    if (!str) return null;
    const cleaned = str.replace(/\|/g, "").trim();
    return cleaned && /\b(am|pm)\b|closed/i.test(cleaned) ? cleaned : null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const day of days) {
      const regex = new RegExp(`\\|?\\s*${day}\\s*\\|\\s*(.*?)\\|?$`, "i");
      const match = line.match(regex);
      if (match) {
        const hours = extractHours(match[1]) || extractHours(lines[i + 1]) || defaultHours[day];
        schedule[day] = hours || defaultHours[day];
        break;
      }
      if (new RegExp(`^${day}$`, "i").test(line)) {
        const hours = (lines[i + 1] && extractHours(lines[i + 1])) || (lines[i + 2] && extractHours(lines[i + 2]));
        schedule[day] = hours || defaultHours[day];
        break;
      }
    }
  }

  return schedule;
}

async function getSchedule(): Promise<ScheduleData> {
  try {
    const md = await fetchScheduleMarkdown();
    return parseScheduleMarkdown(md);
  } catch {
    return {
      Monday: "9:00 AM - 5:30 PM",
      Tuesday: "9:00 AM - 5:30 PM",
      Wednesday: "Closed",
      Thursday: "9:00 AM - 5:30 PM",
      Friday: "9:00 AM - 5:30 PM",
      Saturday: "9:00 AM - 1:00 PM (1st & 3rd only)",
      Sunday: "Closed",
    };
  }
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export const ScheduleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [schedule, setSchedule] = useState<ScheduleData>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const loadSchedule = async () => {
    setIsLoaded(false);
    try {
      const data = await getSchedule();
      setSchedule(data);
    } catch (err) {
      console.error("Failed to load schedule", err);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    loadSchedule();
  }, []);

  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayHours = schedule[todayName] || "Closed";

  return (
    <ScheduleContext.Provider
      value={{
        schedule,
        isLoaded,
        reload: loadSchedule,
        todayHours,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

export function useSchedule(): ScheduleContextType {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useSchedule must be used within ScheduleProvider");
  }
  return context;
}
