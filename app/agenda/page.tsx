'use client';

import { useState, useEffect, useMemo } from 'react';
import { sessions } from '@/lib/agendaData';
import type { TrackFilter, TimeFilter, SortOption } from '@/lib/agendaData';
import {
  searchSessions,
  filterByTrack,
  filterByTime,
  filterPopular,
  sortSessions
} from '@/lib/agendaUtils';
import NetworkGraph from '@/components/NetworkGraph';
import Navbar from '@/components/Navbar';
import AgendaHeader from '@/components/AgendaHeader';
import FilterPanel from '@/components/FilterPanel';
import SessionList from '@/components/SessionList';

export default function AgendaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [trackFilter, setTrackFilter] = useState<TrackFilter>('All');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('All');
  const [sortBy, setSortBy] = useState<SortOption>('time');
  const [onlyPopular, setOnlyPopular] = useState(false);

  // Apply all filters and sorting
  const filteredSessions = useMemo(() => {
    let result = sessions;

    // Search
    result = searchSessions(result, searchQuery);

    // Track filter
    result = filterByTrack(result, trackFilter);

    // Time filter
    result = filterByTime(result, timeFilter);

    // Popular filter
    result = filterPopular(result, onlyPopular);

    // Sort
    result = sortSessions(result, sortBy);

    return result;
  }, [searchQuery, trackFilter, timeFilter, sortBy, onlyPopular]);

  return (
    <>
      <NetworkGraph />
      <Navbar />

      <div className="min-h-screen pt-16 relative z-10">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Search */}
        <div className="mb-12">
          <AgendaHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            resultCount={filteredSessions.length}
            totalCount={sessions.length}
          />
        </div>

        {/* Filter Panel (Mobile) */}
        <div className="md:hidden mb-6">
          <FilterPanel
            trackFilter={trackFilter}
            setTrackFilter={setTrackFilter}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onlyPopular={onlyPopular}
            setOnlyPopular={setOnlyPopular}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filter Panel (Desktop) */}
          <aside className="hidden md:block md:col-span-1">
            <FilterPanel
              trackFilter={trackFilter}
              setTrackFilter={setTrackFilter}
              timeFilter={timeFilter}
              setTimeFilter={setTimeFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onlyPopular={onlyPopular}
              setOnlyPopular={setOnlyPopular}
            />
          </aside>

          {/* Session List */}
          <div className="md:col-span-3">
            <SessionList sessions={filteredSessions} />
          </div>
        </div>
      </main>
      </div>
    </>
  );
}
