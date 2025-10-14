'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ReactionSystemProps {
  sessionId: string;
  initialReactions: {
    thumbsUp: number;
    thumbsDown: number;
    heart: number;
  };
}

type ReactionType = 'thumbsUp' | 'thumbsDown' | 'heart';

interface UserReaction {
  sessionId: string;
  reaction: ReactionType | null;
}

export default function ReactionSystem({ sessionId, initialReactions }: ReactionSystemProps) {
  const [reactions, setReactions] = useState(initialReactions);
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Load user's previous reaction from localStorage
    const storedReactions = localStorage.getItem('sessionReactions');
    if (storedReactions) {
      try {
        const parsed: UserReaction[] = JSON.parse(storedReactions);
        const userSessionReaction = parsed.find(r => r.sessionId === sessionId);
        if (userSessionReaction) {
          setUserReaction(userSessionReaction.reaction);
        }
      } catch (e) {
        console.error('Failed to parse stored reactions:', e);
      }
    }

    // Load reaction counts from localStorage
    const storedCounts = localStorage.getItem(`reactions_${sessionId}`);
    if (storedCounts) {
      try {
        const parsed = JSON.parse(storedCounts);
        setReactions(parsed);
      } catch (e) {
        console.error('Failed to parse stored counts:', e);
      }
    }
  }, [sessionId]);

  const handleReaction = (type: ReactionType) => {
    if (!mounted) return;

    let newReactions = { ...reactions };
    let newUserReaction: ReactionType | null = null;

    // If user clicked the same reaction, remove it
    if (userReaction === type) {
      newReactions[type] = Math.max(0, newReactions[type] - 1);
      newUserReaction = null;
    } else {
      // Remove previous reaction count
      if (userReaction) {
        newReactions[userReaction] = Math.max(0, newReactions[userReaction] - 1);
      }
      // Add new reaction count
      newReactions[type] = newReactions[type] + 1;
      newUserReaction = type;
    }

    setReactions(newReactions);
    setUserReaction(newUserReaction);

    // Save to localStorage
    try {
      // Save reaction counts
      localStorage.setItem(`reactions_${sessionId}`, JSON.stringify(newReactions));

      // Save user's reaction choice
      const storedReactions = localStorage.getItem('sessionReactions');
      let allReactions: UserReaction[] = storedReactions ? JSON.parse(storedReactions) : [];

      // Update or add this session's reaction
      const existingIndex = allReactions.findIndex(r => r.sessionId === sessionId);
      if (existingIndex >= 0) {
        allReactions[existingIndex].reaction = newUserReaction;
      } else {
        allReactions.push({ sessionId, reaction: newUserReaction });
      }

      localStorage.setItem('sessionReactions', JSON.stringify(allReactions));
    } catch (e) {
      console.error('Failed to save reactions:', e);
    }
  };

  if (!mounted) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👍</span>
          <span className="text-sm font-semibold">{initialReactions.thumbsUp}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">👎</span>
          <span className="text-sm font-semibold">{initialReactions.thumbsDown}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">❤️</span>
          <span className="text-sm font-semibold">{initialReactions.heart}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleReaction('thumbsUp')}
        className={`flex items-center gap-2 p-2 border-2 border-border transition-colors ${
          userReaction === 'thumbsUp' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-accent/20'
        }`}
        style={{ boxShadow: 'var(--shadow)' }}
      >
        <span className="text-2xl">👍</span>
        <span className="text-sm font-semibold">{reactions.thumbsUp}</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleReaction('thumbsDown')}
        className={`flex items-center gap-2 p-2 border-2 border-border transition-colors ${
          userReaction === 'thumbsDown' ? 'bg-destructive text-destructive-foreground' : 'bg-background hover:bg-accent/20'
        }`}
        style={{ boxShadow: 'var(--shadow)' }}
      >
        <span className="text-2xl">👎</span>
        <span className="text-sm font-semibold">{reactions.thumbsDown}</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleReaction('heart')}
        className={`flex items-center gap-2 p-2 border-2 border-border transition-colors ${
          userReaction === 'heart' ? 'bg-accent text-accent-foreground' : 'bg-background hover:bg-accent/20'
        }`}
        style={{ boxShadow: 'var(--shadow)' }}
      >
        <span className="text-2xl">❤️</span>
        <span className="text-sm font-semibold">{reactions.heart}</span>
      </motion.button>
    </div>
  );
}
