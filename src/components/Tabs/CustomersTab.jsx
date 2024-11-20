import React from 'react';
import ContentHeader from '../shared/ContentHeader';
import { useSelector } from 'react-redux';

const CustomersTab = () => {
  const customers = useSelector((state) => state.customers);
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300">
      <ContentHeader title="Customers" />
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Purchase Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Purchase Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {customers.map((customer, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="border px-4 py-2">{customer["Customer Name"]}</td>
            <td className="border px-4 py-2">{customer["Phone Number"]}</td>
            <td className="border px-4 py-2">{customer["Total Purchase Amount"]}</td>
            <td className="border px-4 py-2">{customer["Address"] || "N/A"}</td>
          </tr>
        ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersTab;







