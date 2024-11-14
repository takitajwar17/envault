import React from 'react';
import { Clock, User, Edit, Trash, Key } from 'lucide-react';
import type { AuditLogEntry } from '../types';

const mockLogs: AuditLogEntry[] = [
  {
    id: 1,
    action: 'updated',
    variable: 'API_KEY',
    user: 'John Doe',
    timestamp: '2024-03-10 14:30',
    environment: 'production',
  },
  {
    id: 2,
    action: 'created',
    variable: 'DATABASE_URL',
    user: 'Jane Smith',
    timestamp: '2024-03-10 13:15',
    environment: 'staging',
  },
];

export default function AuditLog() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Audit Log
        </h3>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {mockLogs.map((log) => (
          <div key={log.id} className="px-4 py-4 flex items-center">
            <div className="flex-shrink-0">
              {log.action === 'updated' ? (
                <Edit className="h-5 w-5 text-yellow-500" />
              ) : log.action === 'created' ? (
                <Key className="h-5 w-5 text-green-500" />
              ) : (
                <Trash className="h-5 w-5 text-red-500" />
              )}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {log.variable}
                <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  {log.environment}
                </span>
              </p>
              <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <User className="h-4 w-4 mr-1" />
                {log.user}
                <Clock className="h-4 w-4 ml-4 mr-1" />
                {log.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}