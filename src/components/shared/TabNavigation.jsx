import React from 'react';
import { FiFileText, FiGrid, FiUsers } from 'react-icons/fi';

const tabs = [
  { name: 'Invoices', icon: FiFileText, key: 'invoices'  },
  { name: 'Products', icon: FiGrid, key: 'products' },
  { name: 'Customers', icon: FiUsers, key: 'customers' },
];

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-6 overflow-x-auto">
      <nav className="flex space-x-2 md:space-x-4 min-w-max" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`${
              activeTab === tab.key
                ? 'bg-white text-swipe-green shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            } px-3 md:px-4 py-2 rounded-md flex items-center space-x-1 md:space-x-2 transition-all duration-200 text-sm md:text-base`}
          >
            <tab.icon className="h-4 w-4 md:h-5 md:w-5" />
            <span className="hidden sm:inline">{tab.name}</span>
            <span className="sm:hidden">{tab.name.charAt(0)}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;