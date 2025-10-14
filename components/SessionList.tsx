'use client';

import { Session } from '@/lib/agendaData';
import SessionCard from './SessionCard';

interface SessionListProps {
  sessions: Session[];
}

export default function SessionList({ sessions }: SessionListProps) {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold mb-2">No sessions found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {sessions.map((session, index) => (
        <SessionCard key={session.id} session={session} index={index} />
      ))}
    </div>
  );
}
