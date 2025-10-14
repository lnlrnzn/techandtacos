'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrackFilter, TimeFilter, SortOption } from '@/lib/agendaData';

interface FilterPanelProps {
  trackFilter: TrackFilter;
  setTrackFilter: (filter: TrackFilter) => void;
  timeFilter: TimeFilter;
  setTimeFilter: (filter: TimeFilter) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  onlyPopular: boolean;
  setOnlyPopular: (value: boolean) => void;
}

export default function FilterPanel({
  trackFilter,
  setTrackFilter,
  timeFilter,
  setTimeFilter,
  sortBy,
  setSortBy,
  onlyPopular,
  setOnlyPopular
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const trackOptions: TrackFilter[] = ['All', 'Tech', 'Design', 'Business', 'Workshop'];
  const timeOptions: TimeFilter[] = ['All', 'Morning', 'Afternoon', 'Evening'];
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'time', label: 'Time' },
    { value: 'hearts', label: 'Most Hearts' },
    { value: 'reactions', label: 'Most Reactions' },
    { value: 'speaker', label: 'Speaker' },
    { value: 'title', label: 'Title' }
  ];

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Track Filter */}
      <div>
        <label className="block text-sm font-semibold mb-3">Track</label>
        <div className="flex flex-wrap gap-2">
          {trackOptions.map((track) => (
            <button
              key={track}
              onClick={() => {
                setTrackFilter(track);
                if (window.innerWidth < 768) closeDrawer();
              }}
              className={`px-4 py-2 border-2 border-border font-semibold text-sm transition-colors ${
                trackFilter === track
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background hover:bg-accent/20'
              }`}
              style={{ boxShadow: 'var(--shadow)' }}
            >
              {track}
            </button>
          ))}
        </div>
      </div>

      {/* Time Filter */}
      <div>
        <label className="block text-sm font-semibold mb-3">Time of Day</label>
        <div className="flex flex-wrap gap-2">
          {timeOptions.map((time) => (
            <button
              key={time}
              onClick={() => {
                setTimeFilter(time);
                if (window.innerWidth < 768) closeDrawer();
              }}
              className={`px-4 py-2 border-2 border-border font-semibold text-sm transition-colors ${
                timeFilter === time
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background hover:bg-accent/20'
              }`}
              style={{ boxShadow: 'var(--shadow)' }}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-sm font-semibold mb-3">Sort By</label>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setSortBy(option.value);
                if (window.innerWidth < 768) closeDrawer();
              }}
              className={`px-4 py-2 border-2 border-border font-semibold text-sm transition-colors ${
                sortBy === option.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background hover:bg-accent/20'
              }`}
              style={{ boxShadow: 'var(--shadow)' }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Filter */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={onlyPopular}
            onChange={(e) => setOnlyPopular(e.target.checked)}
            className="w-5 h-5 border-2 border-border accent-primary"
          />
          <span className="font-semibold text-sm">Show only popular sessions (50+ reactions)</span>
        </label>
      </div>
    </div>
  );

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Desktop Filter Panel */}
      <div className="hidden md:block bg-card border-2 border-border p-6" style={{ boxShadow: 'var(--shadow-lg)' }}>
        <h3 className="text-xl font-bold mb-6">Filters</h3>
        <FilterContent />
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden">
        <button
          onClick={toggleDrawer}
          className="w-full px-6 py-4 bg-primary text-primary-foreground font-semibold border-2 border-border hover:translate-x-1 hover:translate-y-1 transition-transform"
          style={{ boxShadow: 'var(--shadow-md)' }}
        >
          Filters & Sort
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={closeDrawer}
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 right-0 bottom-0 max-h-[80vh] overflow-y-auto bg-card border-t-2 border-border z-50 md:hidden"
              style={{ boxShadow: 'var(--shadow-xl)' }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Filters & Sort</h3>
                  <button
                    onClick={closeDrawer}
                    className="p-2 hover:bg-accent/20 transition-colors"
                    aria-label="Close filters"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <FilterContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
