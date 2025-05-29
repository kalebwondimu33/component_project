'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="text-xl font-bold text-gray-900"
                        >
                            Task Manager
                        </Link>
                    </div>
                    <div className="flex space-x-4">
                        <Link
                            href="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/')
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            Tasks
                        </Link>
                        <Link
                            href="/time-tracker"
                            className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/time-tracker')
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            Time Tracker
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
} 