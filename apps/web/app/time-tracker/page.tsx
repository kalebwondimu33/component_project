'use client';

import React from 'react';
import { TimeTracker } from 'ui';

export default function TimeTrackerPage() {
    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Time Tracking</h1>
                <p className="mt-2 text-gray-600">
                    Track your time spent on tasks and projects
                </p>
            </div>
            <TimeTracker />
        </main>
    );
} 