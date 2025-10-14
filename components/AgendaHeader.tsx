'use client';

import { useState, useEffect } from 'react';

interface AgendaHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resultCount: number;
  totalCount: number;
}

export default function AgendaHeader({
  searchQuery,
  setSearchQuery,
  resultCount,
  totalCount
}: AgendaHeaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Event Agenda
        </h1>
        <p className="text-lg text-muted-foreground">
          Browse sessions, react to your favorites, and plan your day
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, speaker, or subtitle..."
            className="w-full px-6 py-4 pr-12 border-2 border-border bg-background text-foreground font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            style={{ boxShadow: 'var(--shadow-md)' }}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <svg
              className="w-6 h-6 text-muted-foreground"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Results Count */}
        {mounted && (
          <div className="mt-3 text-sm text-muted-foreground">
            {resultCount === totalCount ? (
              <span>Showing all {totalCount} sessions</span>
            ) : (
              <span>
                Showing {resultCount} of {totalCount} sessions
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
