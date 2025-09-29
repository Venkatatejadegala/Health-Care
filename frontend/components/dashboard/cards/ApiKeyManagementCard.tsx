'use client';

import React, { useState } from 'react';
import { 
  Key, 
  Plus, 
  Eye, 
  EyeOff, 
  Copy, 
  Trash2, 
  Edit3,
  CheckCircle,
  AlertTriangle,
  Shield,
  Clock
} from 'lucide-react';

const ApiKeyManagementCard: React.FC = () => {
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const apiKeys = [
    {
      id: '1',
      name: 'Gemini API Key',
      key: 'AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      status: 'active',
      lastUsed: '2 hours ago',
      usage: '85%',
      description: 'Used for food analysis and recommendations'
    },
    {
      id: '2',
      name: 'OpenAI API Key',
      key: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      status: 'active',
      lastUsed: '1 day ago',
      usage: '45%',
      description: 'Used for natural language processing'
    },
    {
      id: '3',
      name: 'USDA API Key',
      key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      status: 'expired',
      lastUsed: '1 week ago',
      usage: '100%',
      description: 'Used for nutrition database access'
    }
  ];

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const copyToClipboard = async (key: string, keyId: string) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedKey(keyId);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Failed to copy key:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'expired':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return CheckCircle;
      case 'expired':
        return AlertTriangle;
      case 'warning':
        return Clock;
      default:
        return Shield;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 card-hover">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Key className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">API Key Management</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage your API integrations</p>
          </div>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Key</span>
        </button>
      </div>

      <div className="space-y-4">
        {apiKeys.map((apiKey) => {
          const StatusIcon = getStatusIcon(apiKey.status);
          const isVisible = showKeys[apiKey.id];
          const isCopied = copiedKey === apiKey.id;
          
          return (
            <div key={apiKey.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{apiKey.name}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(apiKey.status)}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {apiKey.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{apiKey.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3">
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono text-gray-800 dark:text-gray-200 flex-1 mr-2">
                    {isVisible ? apiKey.key : '••••••••••••••••••••••••••••••••'}
                  </code>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      {isCopied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 dark:text-gray-400">
                    Last used: {apiKey.lastUsed}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Usage: {apiKey.usage}
                  </span>
                </div>
                <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: apiKey.usage }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <Shield className="w-4 h-4 inline mr-1" />
            Secure API key storage
          </div>
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors">
            Manage all keys →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyManagementCard;
