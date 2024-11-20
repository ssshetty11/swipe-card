import React from 'react';
import { FiSearch, FiDownload } from 'react-icons/fi';

const ContentHeader = ({ title }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-swipe-green focus:border-transparent w-full sm:w-auto"
          />
        </div>
        <button className="px-4 py-2 bg-swipe-green text-white rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center justify-center">
          <FiDownload className="mr-2" />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
};

export default ContentHeader;