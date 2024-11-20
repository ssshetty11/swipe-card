import React from 'react';
import ContentHeader from '../shared/ContentHeader';
import { useSelector } from 'react-redux';

const InvoicesTab = () => {
  const invoices = useSelector((state) => state.invoices);
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300">
      <ContentHeader title="Invoices" />
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Serial Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tax
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {invoices.map((invoice, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{invoice["Serial Number"]}</td>
              <td className="border px-4 py-2">{invoice["Customer Name"]}</td>
              <td className="border px-4 py-2">{invoice["Product Name"]}</td>
              <td className="border px-4 py-2">{invoice["Quantity"]}</td>
              <td className="border px-4 py-2">{invoice["Tax"]}</td>
              <td className="border px-4 py-2">{invoice["Total Amount"]}</td>
              <td className="border px-4 py-2">{invoice["Date"]}</td>
              
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesTab;