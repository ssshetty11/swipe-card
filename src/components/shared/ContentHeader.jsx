import React from 'react';


const ContentHeader = ({ title }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
      </div>
    </div>
  );
};

export default ContentHeader;