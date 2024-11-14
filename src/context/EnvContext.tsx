import React, { createContext, useContext, useState } from 'react';
import type { Repository, EnvVariable } from '../types';

interface EnvContextType {
  selectedRepo: Repository | null;
  setSelectedRepo: (repo: Repository | null) => void;
  selectedEnv: string;
  setSelectedEnv: (env: string) => void;
  variables: EnvVariable[];
  addVariable: (variable: EnvVariable) => void;
  updateVariable: (id: number, variable: Partial<EnvVariable>) => void;
  deleteVariable: (id: number) => void;
}

const EnvContext = createContext<EnvContextType | undefined>(undefined);

const initialVariables: EnvVariable[] = [
  {
    id: 1,
    name: 'DATABASE_URL',
    value: 'postgresql://localhost:5432/mydb',
    environment: 'development',
    isSecret: true,
  },
  {
    id: 2,
    name: 'API_KEY',
    value: 'sk_test_123456789',
    environment: 'development',
    isSecret: true,
  },
];

export function EnvProvider({ children }: { children: React.ReactNode }) {
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [selectedEnv, setSelectedEnv] = useState('development');
  const [variables, setVariables] = useState<EnvVariable[]>(initialVariables);

  const addVariable = (variable: EnvVariable) => {
    setVariables(prev => [...prev, { ...variable, id: Date.now() }]);
  };

  const updateVariable = (id: number, updates: Partial<EnvVariable>) => {
    setVariables(prev => 
      prev.map(v => v.id === id ? { ...v, ...updates } : v)
    );
  };

  const deleteVariable = (id: number) => {
    setVariables(prev => prev.filter(v => v.id !== id));
  };

  return (
    <EnvContext.Provider value={{
      selectedRepo,
      setSelectedRepo,
      selectedEnv,
      setSelectedEnv,
      variables,
      addVariable,
      updateVariable,
      deleteVariable,
    }}>
      {children}
    </EnvContext.Provider>
  );
}

export const useEnv = () => {
  const context = useContext(EnvContext);
  if (context === undefined) {
    throw new Error('useEnv must be used within an EnvProvider');
  }
  return context;
};