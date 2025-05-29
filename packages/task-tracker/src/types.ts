export interface TimeEntry {
    id: string;
    taskId: string | null;
    startTime: Date;
    endTime: Date | null;
    duration: number; // in milliseconds
} 