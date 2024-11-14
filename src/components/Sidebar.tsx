import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  GitFork,
  BarChart2,
  Users,
  Puzzle,
  CreditCard,
  Settings,
  HelpCircle
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Repositories', icon: GitFork, href: '/repositories' },
  { name: 'Analytics', icon: BarChart2, href: '/analytics' },
  { name: 'Team', icon: Users, href: '/team' },
  { name: 'Integrations', icon: Puzzle, href: '/integrations' },
  { name: 'Pricing', icon: CreditCard, href: '/pricing' },
];

export default function Sidebar() {
  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`
                }
              >
                <item.icon
                  className="mr-3 flex-shrink-0 h-6 w-6"
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto px-2 space-y-1">
            <NavLink
              to="/settings"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Settings className="mr-3 flex-shrink-0 h-6 w-6" />
              Settings
            </NavLink>
            <a
              href="#"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <HelpCircle className="mr-3 flex-shrink-0 h-6 w-6" />
              Help & Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}