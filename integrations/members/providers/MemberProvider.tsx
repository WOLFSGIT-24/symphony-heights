import React, { useState, useCallback, ReactNode } from 'react';
import { MemberActions, MemberContext, MemberState } from '.';
import { Member } from '..';

const MEMBER_STORAGE_KEY = 'member-store';

interface MemberProviderProps {
  children: ReactNode;
}

export const MemberProvider: React.FC<MemberProviderProps> = ({ children }) => {
  const [state, setState] = useState<MemberState>(() => {
    let storedMemberData: Member | null = null;
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(MEMBER_STORAGE_KEY);
        if (stored) {
          storedMemberData = JSON.parse(stored);
        }
      } catch (error) {
        console.error('Error loading member state from localStorage:', error);
      }
    }

    return {
      member: storedMemberData,
      isAuthenticated: !!storedMemberData,
      isLoading: false,
      error: null,
    };
  });

  const updateState = useCallback((updates: Partial<MemberState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const actions: MemberActions = {
    loadCurrentMember: useCallback(async () => {
      updateState({ isLoading: false });
    }, [updateState]),

    login: useCallback(() => {
      console.log('Login triggered in local mode');
    }, []),

    logout: useCallback(() => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem(MEMBER_STORAGE_KEY);
        } catch (error) {
          console.error('Error clearing member state from localStorage:', error);
        }
      }
      updateState({
        member: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }, [updateState]),

    clearMember: useCallback(() => {
      updateState({
        member: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }, [updateState]),
  };

  const contextValue = {
    ...state,
    actions,
  };

  return (
    <MemberContext.Provider value={contextValue}>
      {children}
    </MemberContext.Provider>
  );
};
