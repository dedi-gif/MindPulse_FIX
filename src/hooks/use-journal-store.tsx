"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
  useCallback,
} from 'react';
import type { JournalEntry } from '@/lib/types';

type JournalState = {
  entries: JournalEntry[];
  isInitialized: boolean;
};

type JournalAction =
  | { type: 'ADD_ENTRY'; payload: JournalEntry }
  | { type: 'SET_INITIAL_STATE'; payload: JournalEntry[] };

const JournalContext = createContext<
  | {
      state: JournalState;
      addEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
    }
  | undefined
>(undefined);

const journalReducer = (
  state: JournalState,
  action: JournalAction
): JournalState => {
  switch (action.type) {
    case 'ADD_ENTRY': {
      const newEntries = [...state.entries, action.payload];
      if (typeof window !== 'undefined') {
        localStorage.setItem('journalEntries', JSON.stringify(newEntries));
      }
      return { ...state, entries: newEntries };
    }
    case 'SET_INITIAL_STATE':
      return { entries: action.payload, isInitialized: true };
    default:
      return state;
  }
};

export const JournalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(journalReducer, {
    entries: [],
    isInitialized: false,
  });

  useEffect(() => {
    try {
      const storedEntries = localStorage.getItem('journalEntries');
      if (storedEntries) {
        dispatch({
          type: 'SET_INITIAL_STATE',
          payload: JSON.parse(storedEntries),
        });
      } else {
        dispatch({ type: 'SET_INITIAL_STATE', payload: [] });
      }
    } catch (error) {
      console.error('Failed to load journal entries from localStorage', error);
      dispatch({ type: 'SET_INITIAL_STATE', payload: [] });
    }
  }, []);

  const addEntry = useCallback(
    (entry: Omit<JournalEntry, 'id' | 'date'>) => {
      const newEntry: JournalEntry = {
        ...entry,
        id: new Date().toISOString() + Math.random(),
        date: new Date().toISOString(),
      };
      dispatch({ type: 'ADD_ENTRY', payload: newEntry });
    },
    []
  );

  return (
    <JournalContext.Provider value={{ state, addEntry }}>
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};
