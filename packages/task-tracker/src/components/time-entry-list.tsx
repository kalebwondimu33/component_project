import React from 'react';
import { TimeEntry } from './time-tracker';
import { Task } from '../../../utils/types/task';

export interface TimeEntryListProps {
    entries: TimeEntry[];
    tasks: Task[];
}

export function TimeEntryList({ entries, tasks }: TimeEntryListProps) {
    const formatDate = (date: Date): string => {
        return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        }).format(date);
    };

    const formatDuration = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const parts: string[] = [];
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0) parts.push(`${minutes}m`);
        if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);

        return parts.join(' ');
    };

    const getTaskStatus = (taskId: string | null) => {
        if (!taskId) return null;
        const task = tasks.find(t => t.id === taskId);
        return task?.status || null;
    };

    if (entries.length === 0) {
        return (
            <div className="text-center text-gray-500 py-4">
                No time entries yet
            </div>
        );
    }

    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Time Entries</h3>
            <div className="space-y-2">
                {entries.map((entry) => (
                    <div
                        key={entry.id}
                        className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                {entry.taskId && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-gray-900">
                                            {entry.taskName || 'Unknown Task'}
                                        </span>
                                        {getTaskStatus(entry.taskId) && (
                                            <span className={`px-2 py-0.5 text-xs rounded-full ${getTaskStatus(entry.taskId) === 'completed'
                                                ? 'bg-green-100 text-green-800'
                                                : getTaskStatus(entry.taskId) === 'in-progress'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {getTaskStatus(entry.taskId)}
                                            </span>
                                        )}
                                    </div>
                                )}
                                <div className="text-sm text-gray-600">
                                    {formatDate(entry.startTime)} - {entry.endTime ? formatDate(entry.endTime) : 'Running'}
                                </div>
                                {entry.description && (
                                    <div className="text-gray-700">{entry.description}</div>
                                )}
                            </div>
                            <div className="text-lg font-semibold text-gray-800">
                                {formatDuration(entry.duration)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 