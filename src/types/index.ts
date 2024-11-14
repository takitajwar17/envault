export interface Repository {
  id: number;
  name: string;
  private: boolean;
  envCount: number;
}

export interface EnvVariable {
  id: number;
  name: string;
  value: string;
  environment: string;
  isSecret: boolean;
}

export interface AuditLogEntry {
  id: number;
  action: 'created' | 'updated' | 'deleted';
  variable: string;
  user: string;
  timestamp: string;
  environment: string;
}