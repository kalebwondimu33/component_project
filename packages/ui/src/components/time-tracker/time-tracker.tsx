'use client';

import React, { useState, useEffect } from 'react';
import { TimerDisplay } from './timer-display';
import { TimerControls } from './timer-controls';
import { TimeEntryList } from './time-entry-list';
import { useTasks } from '../../hooks/use-tasks';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../select';
import { Task } from '../../types/task';

export interface TimeEntry {
    id: string;
    taskId: string | null;
    taskName?: string;
    startTime: Date;
    endTime: Date | null;
    duration: number;
    description: string;
}

const PLACEHOLDER_VALUE = 'placeholder';

export function TimeTracker() {
    const { tasks } = useTasks();
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [entries, setEntries] = useState<TimeEntry[]>([]);
    const [currentEntry, setCurrentEntry] = useState<TimeEntry | null>(null);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval>;

        if (isRunning) {
            intervalId = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning]);

    const handleStart = () => {
        if (!isRunning) {
            const selectedTask = tasks.find(task => task.id === selectedTaskId);
            const newEntry: TimeEntry = {
                id: Date.now().toString(),
                taskId: selectedTaskId,
                taskName: selectedTask?.title,
                startTime: new Date(),
                endTime: null,
                duration: 0,
                description: '',
            };
            setCurrentEntry(newEntry);
            setIsRunning(true);
        }
    };

    const handleStop = () => {
        if (isRunning && currentEntry) {
            const updatedEntry = {
                ...currentEntry,
                endTime: new Date(),
                duration: time,
            };
            setEntries((prev) => [...prev, updatedEntry]);
            setCurrentEntry(null);
            setIsRunning(false);
            setTime(0);
            setSelectedTaskId(null);
        }
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setCurrentEntry(null);
        setSelectedTaskId(null);
    };

    const handleTaskSelect = (value: string) => {
        setSelectedTaskId(value === PLACEHOLDER_VALUE ? null : value);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Time Tracker</h2>
            <div className="space-y-6">
                {!isRunning && (
                    <div className="mb-4">
                        <label htmlFor="task-select" className="block text-sm font-medium text-gray-700 mb-2">
                            Select Task
                        </label>
                        <Select
                            value={selectedTaskId || PLACEHOLDER_VALUE}
                            onValueChange={handleTaskSelect}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a task" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={PLACEHOLDER_VALUE}>Select a task</SelectItem>
                                {tasks.map(task => (
                                    <SelectItem key={task.id} value={task.id}>
                                        {task.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
                <TimerDisplay time={time} />
                <TimerControls
                    isRunning={isRunning}
                    onStart={handleStart}
                    onStop={handleStop}
                    onReset={handleReset}
                    disabled={!selectedTaskId && !isRunning}
                />
                <TimeEntryList entries={entries} tasks={tasks} />
            </div>
        </div>
    );
} 