import React from 'react';
import { Task, TaskStatus } from '../../../utils/types/task';
import { TimeEntry } from '../../../task-tracker/src/components/time-tracker';

interface TaskStatsProps {
    tasks: Task[];
    timeEntries: TimeEntry[];
}

interface TaskStatusSummary {
    total: number;
    todo: number;
    inProgress: number;
    completed: number;
}

interface TimeSummary {
    totalTime: number;
    averageTimePerTask: number;
    tasksWithTime: number;
}

export function TaskStats({ tasks, timeEntries }: TaskStatsProps) {
    const statusSummary = React.useMemo(() => {
        const summary: TaskStatusSummary = {
            total: tasks.length,
            todo: 0,
            inProgress: 0,
            completed: 0,
        };

        tasks.forEach(task => {
            switch (task.status) {
                case 'todo':
                    summary.todo++;
                    break;
                case 'in-progress':
                    summary.inProgress++;
                    break;
                case 'completed':
                    summary.completed++;
                    break;
            }
        });

        return summary;
    }, [tasks]);

    const timeSummary = React.useMemo(() => {
        const taskTimeMap = new Map<string, number>();

        timeEntries.forEach(entry => {
            if (entry.taskId && entry.duration) {
                const currentTime = taskTimeMap.get(entry.taskId) || 0;
                taskTimeMap.set(entry.taskId, currentTime + entry.duration);
            }
        });

        const totalTime = Array.from(taskTimeMap.values()).reduce((sum, time) => sum + time, 0);
        const tasksWithTime = taskTimeMap.size;

        return {
            totalTime,
            averageTimePerTask: tasksWithTime > 0 ? totalTime / tasksWithTime : 0,
            tasksWithTime,
        };
    }, [timeEntries]);

    const formatDuration = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        const parts: string[] = [];
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0) parts.push(`${minutes}m`);
        if (parts.length === 0) parts.push('0m');

        return parts.join(' ');
    };

    const getStatusColor = (status: TaskStatus) => {
        switch (status) {
            case 'todo':
                return 'bg-gray-100 text-gray-800';
            case 'in-progress':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Task Statistics</h2>

            {/* Task Status Summary */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Task Status</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Total Tasks</div>
                        <div className="text-2xl font-bold text-gray-900">{statusSummary.total}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">To Do</div>
                        <div className="text-2xl font-bold text-gray-900">{statusSummary.todo}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">In Progress</div>
                        <div className="text-2xl font-bold text-gray-900">{statusSummary.inProgress}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Completed</div>
                        <div className="text-2xl font-bold text-gray-900">{statusSummary.completed}</div>
                    </div>
                </div>
            </div>

            {/* Time Tracking Summary */}
            <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Time Tracking</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Total Time Tracked</div>
                        <div className="text-2xl font-bold text-gray-900">
                            {formatDuration(timeSummary.totalTime)}
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Average Time per Task</div>
                        <div className="text-2xl font-bold text-gray-900">
                            {formatDuration(timeSummary.averageTimePerTask)}
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Tasks with Time</div>
                        <div className="text-2xl font-bold text-gray-900">
                            {timeSummary.tasksWithTime}
                        </div>
                    </div>
                </div>
            </div>

            {/* Task Status Distribution */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Status Distribution</h3>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="flex h-full">
                        {statusSummary.total > 0 && (
                            <>
                                <div
                                    className="bg-gray-400"
                                    style={{
                                        width: `${(statusSummary.todo / statusSummary.total) * 100}%`,
                                    }}
                                    title={`To Do: ${statusSummary.todo}`}
                                />
                                <div
                                    className="bg-blue-400"
                                    style={{
                                        width: `${(statusSummary.inProgress / statusSummary.total) * 100}%`,
                                    }}
                                    title={`In Progress: ${statusSummary.inProgress}`}
                                />
                                <div
                                    className="bg-green-400"
                                    style={{
                                        width: `${(statusSummary.completed / statusSummary.total) * 100}%`,
                                    }}
                                    title={`Completed: ${statusSummary.completed}`}
                                />
                            </>
                        )}
                    </div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <div>To Do</div>
                    <div>In Progress</div>
                    <div>Completed</div>
                </div>
            </div>
        </div>
    );
} 