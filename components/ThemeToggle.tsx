'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage and system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-14 h-7 bg-muted/20 border-2 border-border" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 bg-secondary border-2 border-border transition-all hover:translate-x-0.5 hover:translate-y-0.5"
      style={{ boxShadow: 'var(--shadow-sm)' }}
      aria-label="Toggle theme"
    >
      <div
        className={`absolute top-0.5 w-5 h-5 bg-primary border border-border transition-all ${
          theme === 'dark' ? 'left-[1.875rem]' : 'left-0.5'
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center text-[10px]">
          {theme === 'dark' ? '🌙' : '☀️'}
        </div>
      </div>
    </button>
  );
}
