'use client';

import { motion } from 'framer-motion';
import { Session } from '@/lib/agendaData';
import ReactionSystem from './ReactionSystem';
import { getTimeLabel } from '@/lib/agendaUtils';

interface SessionCardProps {
  session: Session;
  index: number;
}

const trackColors: Record<Session['track'], string> = {
  Tech: 'bg-primary text-primary-foreground',
  Design: 'bg-accent text-accent-foreground',
  Business: 'bg-secondary text-secondary-foreground',
  Workshop: 'bg-muted text-muted-foreground'
};

export default function SessionCard({ session, index }: SessionCardProps) {
  const timeLabel = getTimeLabel(session.time);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-card border-2 border-border p-6 hover:translate-x-1 hover:translate-y-1 transition-transform"
      style={{ boxShadow: 'var(--shadow-lg)' }}
    >
      {/* Header: Time and Track */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg">{session.time}</span>
          <span className="text-sm text-muted-foreground px-2 py-1 border border-border bg-background">
            {timeLabel}
          </span>
        </div>
        <span
          className={`px-3 py-1 text-sm font-semibold border-2 border-border ${trackColors[session.track]}`}
          style={{ boxShadow: 'var(--shadow)' }}
        >
          {session.track}
        </span>
      </div>

      {/* Title and Subtitle */}
      <div className="mb-4">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">{session.title}</h3>
        <p className="text-base text-muted-foreground">{session.subtitle}</p>
      </div>

      {/* Speaker */}
      <div className="mb-4">
        <span className="text-sm font-semibold text-foreground/70">Speaker:</span>
        <span className="ml-2 font-semibold">{session.speaker}</span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        {session.description}
      </p>

      {/* Reactions */}
      <div className="pt-4 border-t-2 border-border">
        <ReactionSystem sessionId={session.id} initialReactions={session.reactions} />
      </div>
    </motion.div>
  );
}
