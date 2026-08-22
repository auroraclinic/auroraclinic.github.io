import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ScheduleData,
  HolidayNotice,
  TeamMember,
  JobOpening,
  AnnouncementItem,
  ContentContextType,
} from '../types/content';

const RAW_REMOTE_URL = "https://raw.githubusercontent.com/auroraclinic/posts/main";
const LOCAL_CONTENT_URL = "/content";

// Helper fetch with fallback
async function fetchContentFile(filename: string): Promise<string> {
  // 1. Try remote repo first
  try {
    const remoteRes = await fetch(`${RAW_REMOTE_URL}/${filename}?t=${Date.now()}`);
    if (remoteRes.ok) {
      const text = await remoteRes.text();
      if (text && text.trim().length > 0) return text;
    }
  } catch {
    // Ignore remote failure, proceed to local fallback
  }

  // 2. Try local fallback
  try {
    const localRes = await fetch(`${LOCAL_CONTENT_URL}/${filename}`);
    if (localRes.ok) {
      return await localRes.text();
    }
  } catch {
    // Ignore local failure
  }

  return "";
}

// 1. Parse Schedule
function parseSchedule(md: string): ScheduleData {
  const defaultSchedule: ScheduleData = {
    Monday: "9:00 AM - 5:30 PM",
    Tuesday: "9:00 AM - 5:30 PM",
    Wednesday: "Closed",
    Thursday: "9:00 AM - 5:30 PM",
    Friday: "9:00 AM - 5:30 PM",
    Saturday: "9:00 AM - 1:00 PM (1st & 3rd only)",
    Sunday: "Closed",
  };

  if (!md) return defaultSchedule;

  const result: ScheduleData = { ...defaultSchedule };
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const lines = md.split(/\r?\n/);

  for (const line of lines) {
    for (const day of days) {
      const regex = new RegExp(`^\\|?\\s*${day}\\s*[:\\|]?\\s*(.*?)\\|?$`, "i");
      const match = line.trim().match(regex);
      if (match && match[1]) {
        const val = match[1].trim();
        if (val) result[day] = val;
      }
    }
  }

  return result;
}

// 2. Parse Holiday Notice
function parseHoliday(md: string): HolidayNotice {
  const defaultHoliday: HolidayNotice = {
    active: false,
    title: "Clinic Notice",
    message: "Clinic hours may vary during holidays.",
    badge: "Notice",
    hours: "Closed",
  };

  if (!md) return defaultHoliday;

  const holiday: HolidayNotice = { ...defaultHoliday };
  const lines = md.split(/\r?\n/);

  for (const line of lines) {
    const activeMatch = line.match(/^active\s*:\s*(true|false)/i);
    if (activeMatch) holiday.active = activeMatch[1].toLowerCase() === "true";

    const titleMatch = line.match(/^title\s*:\s*(.*)/i);
    if (titleMatch) holiday.title = titleMatch[1].trim();

    const msgMatch = line.match(/^(?:message|content)\s*:\s*(.*)/i);
    if (msgMatch) holiday.message = msgMatch[1].trim();

    const badgeMatch = line.match(/^badge\s*:\s*(.*)/i);
    if (badgeMatch) holiday.badge = badgeMatch[1].trim();

    const hoursMatch = line.match(/^hours\s*:\s*(.*)/i);
    if (hoursMatch) holiday.hours = hoursMatch[1].trim();
  }

  return holiday;
}

// 3. Parse Team Directory
function parseTeam(md: string): TeamMember[] {
  const defaultTeam: TeamMember[] = [
    { name: "Dr. Yong Wang", role: "Family Medicine", specialty: "Primary Care & Family Medicine", icon: "doctor" },
    { name: "Dr. May Wang", role: "Pediatrics", specialty: "Child & Adolescent Care", icon: "child" },
    { name: "Dr. Ryan Wang", role: "Internal Medicine", specialty: "Adult & Chronic Care", icon: "group" },
    { name: "NP Zin Aye", role: "Family Medicine", specialty: "Family Wellness & Prevention", icon: "heart" },
  ];

  if (!md) return defaultTeam;

  const members: TeamMember[] = [];
  const blocks = md.split(/\n(?=-|\*|\d+\.)/);

  for (const block of blocks) {
    const lines = block.split(/\r?\n/);
    const member: Partial<TeamMember> = {};

    for (const line of lines) {
      const nameMatch = line.match(/(?:-|\\*|\\d+\\.)?\\s*name\\s*:\\s*(.*)/i);
      if (nameMatch) member.name = nameMatch[1].trim();

      const roleMatch = line.match(/role\\s*:\\s*(.*)/i);
      if (roleMatch) member.role = roleMatch[1].trim();

      const specMatch = line.match(/specialty\\s*:\\s*(.*)/i);
      if (specMatch) member.specialty = specMatch[1].trim();

      const iconMatch = line.match(/icon\\s*:\\s*(.*)/i);
      if (iconMatch) member.icon = iconMatch[1].trim();
    }

    if (member.name && member.role) {
      members.push(member as TeamMember);
    }
  }

  return members.length > 0 ? members : defaultTeam;
}

// 4. Parse Careers / Open Positions
function parseCareers(md: string): JobOpening[] {
  const defaultCareers: JobOpening[] = [
    {
      title: "Physicians (MD/DO/NP/PA)",
      specialties: ["Internal Medicine", "Geriatric Medicine", "Family Medicine", "Pediatrics"],
      positions: "Multiple positions available",
    },
    {
      title: "Medical Assistants",
      specialties: ["Clinical Care", "Patient Triage", "EHR Documentation"],
      positions: "Multiple positions available",
    },
    {
      title: "Medical Scribes",
      specialties: ["Medical Charting", "Physician Support"],
      positions: "Multiple positions available",
    },
  ];

  if (!md) return defaultCareers;

  const jobs: JobOpening[] = [];
  const blocks = md.split(/\n(?=-|\*|\d+\.)/);

  for (const block of blocks) {
    const lines = block.split(/\r?\n/);
    const job: Partial<JobOpening> = {};

    for (const line of lines) {
      const titleMatch = line.match(/(?:-|\\*|\\d+\\.)?\\s*title\\s*:\\s*(.*)/i);
      if (titleMatch) job.title = titleMatch[1].trim();

      const specMatch = line.match(/specialties\\s*:\\s*(.*)/i);
      if (specMatch) {
        job.specialties = specMatch[1].split(",").map((s) => s.trim()).filter(Boolean);
      }

      const posMatch = line.match(/positions\\s*:\\s*(.*)/i);
      if (posMatch) job.positions = posMatch[1].trim();
    }

    if (job.title) {
      if (!job.specialties) job.specialties = [];
      if (!job.positions) job.positions = "Positions available";
      jobs.push(job as JobOpening);
    }
  }

  return jobs.length > 0 ? jobs : defaultCareers;
}

// 5. Parse Announcements
function parseAnnouncements(md: string): AnnouncementItem[] {
  const defaultAnnouncements: AnnouncementItem[] = [
    {
      title: "Walk-in Patients Welcome",
      badge: "Information",
      date: "Ongoing",
      content: "Walk-ins are accommodated during regular business hours. For minimal wait times, please call ahead at (626) 579-9541 to check current scheduling.",
    },
    {
      title: "Flu Vaccinations & Immunizations Available",
      badge: "Health Notice",
      date: "Ongoing",
      content: "Seasonal flu vaccines and routine pediatric immunizations are available for all established and new patients.",
    },
  ];

  if (!md) return defaultAnnouncements;

  const items: AnnouncementItem[] = [];
  const blocks = md.split(/\n(?=-|\*|\d+\.)/);

  for (const block of blocks) {
    const lines = block.split(/\r?\n/);
    const item: Partial<AnnouncementItem> = {};

    for (const line of lines) {
      const titleMatch = line.match(/(?:-|\\*|\\d+\\.)?\\s*title\\s*:\\s*(.*)/i);
      if (titleMatch) item.title = titleMatch[1].trim();

      const badgeMatch = line.match(/badge\\s*:\\s*(.*)/i);
      if (badgeMatch) item.badge = badgeMatch[1].trim();

      const dateMatch = line.match(/date\\s*:\\s*(.*)/i);
      if (dateMatch) item.date = dateMatch[1].trim();

      const contentMatch = line.match(/(?:content|message)\\s*:\\s*(.*)/i);
      if (contentMatch) item.content = contentMatch[1].trim();
    }

    if (item.title && item.content) {
      if (!item.badge) item.badge = "Notice";
      items.push(item as AnnouncementItem);
    }
  }

  return items.length > 0 ? items : defaultAnnouncements;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [schedule, setSchedule] = useState<ScheduleData>({});
  const [holiday, setHoliday] = useState<HolidayNotice>({
    active: false,
    title: "Clinic Notice",
    message: "",
  });
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [careers, setCareers] = useState<JobOpening[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const loadAllContent = async () => {
    setIsLoaded(false);
    try {
      const [schedMd, holMd, teamMd, carMd, annMd] = await Promise.all([
        fetchContentFile("SCHEDULE.md"),
        fetchContentFile("HOLIDAYS.md"),
        fetchContentFile("TEAM.md"),
        fetchContentFile("CAREERS.md"),
        fetchContentFile("ANNOUNCEMENTS.md"),
      ]);

      setSchedule(parseSchedule(schedMd));
      setHoliday(parseHoliday(holMd));
      setTeam(parseTeam(teamMd));
      setCareers(parseCareers(carMd));
      setAnnouncements(parseAnnouncements(annMd));
    } catch (err) {
      console.error("Error loading dynamic content:", err);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    loadAllContent();
  }, []);

  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayHours = schedule[todayName] || "Closed";

  return (
    <ContentContext.Provider
      value={{
        schedule,
        holiday,
        team,
        careers,
        announcements,
        isLoaded,
        reload: loadAllContent,
        todayHours,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export function useContent(): ContentContextType {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}
