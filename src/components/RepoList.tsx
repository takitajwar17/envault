import React from 'react';
import { Lock, Unlock, ChevronRight, Search } from 'lucide-react';
import { useEnv } from '../context/EnvContext';
import type { Repository } from '../types';

const mockRepos: Repository[] = [
  { id: 1, name: 'web-platform', private: true, envCount: 12 },
  { id: 2, name: 'api-service', private: true, envCount: 8 },
  { id: 3, name: 'docs', private: false, envCount: 3 },
  { id: 4, name: 'mobile-app', private: true, envCount: 15 },
  { id: 5, name: 'design-system', private: false, envCount: 5 },
];

export default function RepoList() {
  const { selectedRepo, setSelectedRepo } = useEnv();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredRepos = mockRepos.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Your Repositories
        </h2>
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[calc(100vh-16rem)] overflow-y-auto">
        {filteredRepos.map((repo) => (
          <li key={repo.id}>
            <button
              onClick={() => setSelectedRepo(repo)}
              className={`w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                selectedRepo?.id === repo.id ? 'bg-blue-50 dark:bg-blue-900/30' : ''
              }`}
            >
              <div className="flex items-center min-w-0">
                {repo.private ? (
                  <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                ) : (
                  <Unlock className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                )}
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white truncate">
                  {repo.name}
                </span>
                <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  {repo.envCount} vars
                </span>
              </div>
              <ChevronRight className={`h-5 w-5 text-gray-400 dark:text-gray-500 transform transition-transform ${
                selectedRepo?.id === repo.id ? 'rotate-90' : ''
              }`} />
            </button>
          </li>
        ))}
        {filteredRepos.length === 0 && (
          <li className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
            No repositories found
          </li>
        )}
      </ul>
    </div>
  );
}