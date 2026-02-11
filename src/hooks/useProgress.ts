'use client';

import { useState, useEffect } from 'react';

interface UserProgress {
  completedModules: string[];
  lastVisitedModule: string;
  lastVisitedAt: number;
}

const STORAGE_KEY = 'css-quest-progress';
const TOTAL_MODULES = 15;

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>({
    completedModules: [],
    lastVisitedModule: '',
    lastVisitedAt: 0,
  });

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as UserProgress;
        setProgress(parsed);
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  }, []);

  // Save to localStorage whenever progress changes
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const markCompleted = (moduleId: string) => {
    saveProgress({
      ...progress,
      completedModules: Array.from(new Set([...progress.completedModules, moduleId])),
    });
  };

  const markVisited = (moduleId: string) => {
    saveProgress({
      ...progress,
      lastVisitedModule: moduleId,
      lastVisitedAt: Date.now(),
    });
  };

  const isCompleted = (moduleId: string): boolean => {
    return progress.completedModules.includes(moduleId);
  };

  const completedCount = progress.completedModules.length;

  const resetProgress = () => {
    const emptyProgress: UserProgress = {
      completedModules: [],
      lastVisitedModule: '',
      lastVisitedAt: 0,
    };
    saveProgress(emptyProgress);
  };

  return {
    progress,
    markCompleted,
    markVisited,
    isCompleted,
    completedCount,
    totalModules: TOTAL_MODULES,
    resetProgress,
  };
}
