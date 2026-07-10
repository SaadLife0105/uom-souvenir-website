'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { authClient } from '@/lib/auth-client';

interface ReserveGateContextType {
  isGateOpen: boolean;
  closeGate: () => void;
  requireAuth: () => boolean;
}

const ReserveGateContext = createContext<ReserveGateContextType | undefined>(undefined);

export function ReserveGateProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const [isGateOpen, setIsGateOpen] = useState(false);

  const closeGate = () => setIsGateOpen(false);

  const requireAuth = () => {
    if (isPending) return false;
    if (session) return true;
    setIsGateOpen(true);
    return false;
  };

  return (
    <ReserveGateContext.Provider value={{ isGateOpen, closeGate, requireAuth }}>
      {children}
    </ReserveGateContext.Provider>
  );
}

export function useReserveGate() {
  const context = useContext(ReserveGateContext);
  if (!context) {
    throw new Error('useReserveGate must be used within ReserveGateProvider');
  }
  return context;
}
