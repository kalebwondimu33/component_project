'use client';

import React, { useState } from 'react';
import { TaskStats } from './components/task-stats';
import { useTasks } from 'ui';
import { TimeEntry } from 'task-tracker';


export default function TaskStatsPage() {
    const { tasks } = useTasks();
    const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(() => {
        // Load time entries from localStorage
        const savedEntries = localStorage.getItem('timeEntries');
        if (savedEntries) {
            try {
                const parsed = JSON.parse(savedEntries);
                // Convert string dates back to Date objects
                return parsed.map((entry: any) => ({
                    ...entry,
                    startTime: new Date(entry.startTime),
                    endTime: entry.endTime ? new Date(entry.endTime) : null,
                }));
            } catch (e) {
                console.error('Error loading time entries:', e);
                return [];
            }
        }
        return [];
    });

    // Listen for time entry updates
    React.useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'timeEntries' && e.newValue) {
                try {
                    const parsed = JSON.parse(e.newValue);
                    setTimeEntries(parsed.map((entry: any) => ({
                        ...entry,
                        startTime: new Date(entry.startTime),
                        endTime: entry.endTime ? new Date(entry.endTime) : null,
                    })));
                } catch (e) {
                    console.error('Error updating time entries:', e);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Task Statistics</h1>
                <p className="mt-2 text-gray-600">
                    Overview of task status and time tracking metrics
                </p>
            </div>
            <TaskStats tasks={tasks} timeEntries={timeEntries} />
        </main>
    );
} 