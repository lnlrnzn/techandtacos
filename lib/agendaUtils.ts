import { Session, TrackFilter, TimeFilter, SortOption } from './agendaData';

export function searchSessions(sessions: Session[], query: string): Session[] {
  if (!query.trim()) return sessions;

  const lowerQuery = query.toLowerCase();
  return sessions.filter(session =>
    session.title.toLowerCase().includes(lowerQuery) ||
    session.subtitle.toLowerCase().includes(lowerQuery) ||
    session.speaker.toLowerCase().includes(lowerQuery)
  );
}

export function filterByTrack(sessions: Session[], track: TrackFilter): Session[] {
  if (track === 'All') return sessions;
  return sessions.filter(session => session.track === track);
}

export function filterByTime(sessions: Session[], timeFilter: TimeFilter): Session[] {
  if (timeFilter === 'All') return sessions;

  return sessions.filter(session => {
    const hour = parseInt(session.time.split(':')[0]);

    switch (timeFilter) {
      case 'Morning':
        return hour < 12;
      case 'Afternoon':
        return hour >= 12 && hour < 17;
      case 'Evening':
        return hour >= 17;
      default:
        return true;
    }
  });
}

export function filterPopular(sessions: Session[], onlyPopular: boolean): Session[] {
  if (!onlyPopular) return sessions;
  return sessions.filter(session => {
    const totalReactions = session.reactions.thumbsUp + session.reactions.thumbsDown + session.reactions.heart;
    return totalReactions > 50;
  });
}

export function sortSessions(sessions: Session[], sortBy: SortOption): Session[] {
  const sorted = [...sessions];

  switch (sortBy) {
    case 'time':
      return sorted.sort((a, b) => a.time.localeCompare(b.time));

    case 'hearts':
      return sorted.sort((a, b) => b.reactions.heart - a.reactions.heart);

    case 'reactions':
      const getTotalReactions = (s: Session) =>
        s.reactions.thumbsUp + s.reactions.thumbsDown + s.reactions.heart;
      return sorted.sort((a, b) => getTotalReactions(b) - getTotalReactions(a));

    case 'speaker':
      return sorted.sort((a, b) => a.speaker.localeCompare(b.speaker));

    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    default:
      return sorted;
  }
}

export function getMostLovedSession(sessions: Session[]): string | null {
  if (sessions.length === 0) return null;

  const sorted = [...sessions].sort((a, b) => b.reactions.heart - a.reactions.heart);
  return sorted[0].id;
}

export function getTimeLabel(time: string): string {
  const hour = parseInt(time.split(':')[0]);

  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  return 'Evening';
}

export function groupSessionsByTime(sessions: Session[]): Map<string, Session[]> {
  const groups = new Map<string, Session[]>();

  sessions.forEach(session => {
    const timeLabel = getTimeLabel(session.time);
    const existing = groups.get(timeLabel) || [];
    groups.set(timeLabel, [...existing, session]);
  });

  return groups;
}
