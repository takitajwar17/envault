import React, { useState } from 'react';
import { Plus, Save, Download, History, Shield, Eye, EyeOff, Search, X } from 'lucide-react';
import { useEnv } from '../context/EnvContext';

const environments = ['development', 'staging', 'production'];

export default function EnvEditor() {
  const { selectedRepo, selectedEnv, setSelectedEnv, variables, addVariable, updateVariable, deleteVariable } = useEnv();
  const [showSecrets, setShowSecrets] = useState<Record<number, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVariable, setNewVariable] = useState({ name: '', value: '', isSecret: true });

  const toggleSecret = (id: number) => {
    setShowSecrets(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredVariables = variables
    .filter(v => v.environment === selectedEnv)
    .filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAddVariable = () => {
    if (newVariable.name && newVariable.value) {
      addVariable({
        id: Date.now(),
        ...newVariable,
        environment: selectedEnv,
      });
      setNewVariable({ name: '', value: '', isSecret: true });
      setShowAddModal(false);
    }
  };

  const handleExport = () => {
    const envContent = filteredVariables
      .map(v => `${v.name}=${v.value}`)
      .join('\n');
    const blob = new Blob([envContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedRepo?.name}-${selectedEnv}.env`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Environment Variables
              {selectedRepo && (
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  {selectedRepo.name}
                </span>
              )}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Variable
              </button>
              <button
                onClick={handleExport}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex space-x-2">
              {environments.map((env) => (
                <button
                  key={env}
                  onClick={() => setSelectedEnv(env)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedEnv === env
                      ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {env}
                </button>
              ))}
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search variables..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <div className="space-y-4">
            {filteredVariables.map(variable => (
              <div
                key={variable.id}
                className="group flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={variable.name}
                      onChange={(e) =>
                        updateVariable(variable.id, { name: e.target.value })
                      }
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      placeholder="Variable name"
                    />
                    {variable.isSecret && (
                      <Shield className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                </div>
                <div className="flex-1 px-4">
                  <div className="relative">
                    <input
                      type={showSecrets[variable.id] ? 'text' : 'password'}
                      value={variable.value}
                      onChange={(e) =>
                        updateVariable(variable.id, { value: e.target.value })
                      }
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      placeholder="Variable value"
                    />
                    <button
                      onClick={() => toggleSecret(variable.id)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showSecrets[variable.id] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <History className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => deleteVariable(variable.id)}
                    className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-colors">
                    <Save className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            {filteredVariables.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  {searchTerm
                    ? 'No variables found matching your search'
                    : 'No variables added yet'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Add New Variable
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Variable Name
                </label>
                <input
                  type="text"
                  value={newVariable.name}
                  onChange={(e) => setNewVariable(prev => ({ ...prev, name: e.target.value }))}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="DATABASE_URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Variable Value
                </label>
                <input
                  type="text"
                  value={newVariable.value}
                  onChange={(e) => setNewVariable(prev => ({ ...prev, value: e.target.value }))}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="postgresql://localhost:5432/mydb"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isSecret"
                  checked={newVariable.isSecret}
                  onChange={(e) => setNewVariable(prev => ({ ...prev, isSecret: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isSecret" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Treat as secret
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVariable}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Add Variable
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}