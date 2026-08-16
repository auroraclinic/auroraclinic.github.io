export interface ScheduleData {
  [day: string]: string;
}

export interface ScheduleContextType {
  schedule: ScheduleData;
  isLoaded: boolean;
  reload: () => Promise<void>;
  todayHours: string;
}

export interface HolidayStatus {
  isSpecial: boolean;
  hours: string | null;
  message: string | null;
}
