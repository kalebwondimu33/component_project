import React from 'react';

export interface TimerDisplayProps {
    time: number;
}

export function TimerDisplay({ time }: TimerDisplayProps) {
    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const padNumber = (num: number): string => num.toString().padStart(2, '0');

        return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(remainingSeconds)}`;
    };

    return (
        <div className="text-center">
            <div className="text-6xl font-mono font-bold text-gray-800">
                {formatTime(time)}
            </div>
        </div>
    );
} 