import React from 'react';
import ContentHeader from '../shared/ContentHeader';
import { useSelector } from 'react-redux';

const ProductsTab = () => {
  const products = useSelector((state) => state.products);
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300">
      <ContentHeader title="Products" />
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unit Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tax
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price with Tax
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Discount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{product["Product Name"]}</td>
              <td className="border px-4 py-2">{product["Quantity"]}</td>
              <td className="border px-4 py-2">{product["Unit Price"]}</td>
              <td className="border px-4 py-2">{product["Tax"]}</td>
              <td className="border px-4 py-2">{product["Price with Tax"]}</td>
              <td className="border px-4 py-2">{product["Discount"]}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTab;