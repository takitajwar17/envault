import React from 'react';
import { ArrowUpRight, ArrowDownRight, GitFork, Key, Shield, Activity } from 'lucide-react';

const stats = [
  { name: 'Active Repositories', value: '12', change: '+2.5%', changeType: 'positive', icon: GitFork },
  { name: 'Environment Variables', value: '284', change: '+18.3%', changeType: 'positive', icon: Key },
  { name: 'Security Score', value: '94%', change: '-0.5%', changeType: 'negative', icon: Shield },
  { name: 'API Requests', value: '8.2k', change: '+12.1%', changeType: 'positive', icon: Activity },
];

const recentActivity = [
  { id: 1, type: 'update', repo: 'web-platform', env: 'production', user: 'Sarah Chen', time: '2 hours ago' },
  { id: 2, type: 'create', repo: 'mobile-app', env: 'staging', user: 'Mike Johnson', time: '4 hours ago' },
  { id: 3, type: 'delete', repo: 'api-service', env: 'development', user: 'Alex Kim', time: '6 hours ago' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{stat.name}</dt>
                    <dd>
                      <div className="flex items-baseline">
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                        <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.changeType === 'positive' ? (
                            <ArrowUpRight className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                          )}
                          <span className="ml-1">{stat.change}</span>
                        </p>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Quick Actions</h3>
            <div className="mt-6 grid grid-cols-1 gap-4">
              <button className="flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50">
                <span>Create New Environment Template</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50">
                <span>Bulk Import Variables</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50">
                <span>Security Scan</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h3>
            <div className="mt-6 flow-root">
              <ul className="-mb-8">
                {recentActivity.map((item, itemIdx) => (
                  <li key={item.id}>
                    <div className="relative pb-8">
                      {itemIdx !== recentActivity.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-800 ${
                            item.type === 'update'
                              ? 'bg-blue-500'
                              : item.type === 'create'
                              ? 'bg-green-500'
                              : 'bg-red-500'
                          }`}>
                            {item.type === 'update' ? (
                              <Activity className="h-5 w-5 text-white" />
                            ) : item.type === 'create' ? (
                              <Key className="h-5 w-5 text-white" />
                            ) : (
                              <Shield className="h-5 w-5 text-white" />
                            )}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              <a href="#" className="font-medium text-gray-900 dark:text-white">
                                {item.user}
                              </a>{' '}
                              {item.type === 'update'
                                ? 'updated variables in'
                                : item.type === 'create'
                                ? 'created new variables in'
                                : 'deleted variables from'}{' '}
                              <a href="#" className="font-medium text-gray-900 dark:text-white">
                                {item.repo}
                              </a>{' '}
                              ({item.env})
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{item.time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}