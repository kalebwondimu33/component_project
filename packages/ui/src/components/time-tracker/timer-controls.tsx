import React from 'react';

export interface TimerControlsProps {
    isRunning: boolean;
    onStart: () => void;
    onStop: () => void;
    onReset: () => void;
    disabled?: boolean;
}

export function TimerControls({
    isRunning,
    onStart,
    onStop,
    onReset,
    disabled = false,
}: TimerControlsProps) {
    return (
        <div className="flex justify-center space-x-4">
            {!isRunning ? (
                <button
                    onClick={onStart}
                    disabled={disabled}
                    className={`px-6 py-2 rounded-lg transition-colors ${disabled
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                >
                    Start
                </button>
            ) : (
                <button
                    onClick={onStop}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                    Stop
                </button>
            )}
            <button
                onClick={onReset}
                disabled={disabled && !isRunning}
                className={`px-6 py-2 rounded-lg transition-colors ${disabled && !isRunning
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-500 text-white hover:bg-gray-600'
                    }`}
            >
                Reset
            </button>
        </div>
    );
} 