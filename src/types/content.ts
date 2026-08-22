export interface ScheduleData {
  [day: string]: string;
}

export interface HolidayNotice {
  active: boolean;
  title: string;
  message: string;
  badge?: string;
  hours?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  specialty?: string;
  icon?: string;
}

export interface JobOpening {
  title: string;
  specialties: string[];
  positions: string;
  color?: string;
}

export interface AnnouncementItem {
  title: string;
  badge: string;
  date?: string;
  content: string;
}

export interface ContentContextType {
  schedule: ScheduleData;
  holiday: HolidayNotice;
  team: TeamMember[];
  careers: JobOpening[];
  announcements: AnnouncementItem[];
  isLoaded: boolean;
  reload: () => Promise<void>;
  todayHours: string;
}
