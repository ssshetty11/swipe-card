import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FiUploadCloud } from 'react-icons/fi';
import { extractDataFromFile } from '../../services/geminiService';
import { setInvoices } from '../../store/slices/invoicesSlice';
import { setProducts } from '../../store/slices/productsSlice';
import { setCustomers } from '../../store/slices/customersSlice';

const FileUpload = () => {
  const dispatch = useDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleFile = async (file) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Validate file type
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      if (!validTypes.includes(file.type)) {
        throw new Error('Unsupported file type. Please upload PDF, Excel, or image files.');
      }

      // Extract data using Gemini API
      const result = await extractDataFromFile(file);
      
      if (!result.success) {
        // throw new Error(result.error);
      }

      // Process and dispatch extracted data
      // const { invoices, products, Customers } = processExtractedData(result.data);
      
      var res = result.data;
      // Update Redux store
      dispatch(setInvoices(res.Invoices));
      dispatch(setProducts(res.Products));
      dispatch(setCustomers(res.Customers));

    } catch (err) {
      // setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // const processExtractedData = (data) => {
  //   // Process and validate extracted data
  //   // Add validation logic here
  //   return {
  //     invoices: [/* processed invoice data */ ],
  //     products: [/* processed product data */],
  //     customers: [/* processed customer data */]
  //   };
  // };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-8">
      <div 
        className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center
          ${isDragging ? 'border-swipe-green bg-green-50' : 'border-gray-300'}
          ${error ? 'border-red-500 bg-red-50' : ''}
          transition-colors duration-200`}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files[0];
          handleFile(file);
        }}
      >
        {isProcessing ? (
          <div className="animate-pulse">
            <FiUploadCloud className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Processing file...</p>
          </div>
        ) : (
          <>
            <FiUploadCloud className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
            <div className="mt-4">
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.xlsx,.xls,image/*"
                  onChange={(e) => handleFile(e.target.files[0])}
                />
                <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-swipe-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-swipe-green transition-colors duration-200">
                  Upload Files
                </span>
              </label>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-gray-500">
              Support for PDF, Excel files, and Images
            </p>
            {/* {error && (
              // <p className="mt-2 text-sm text-red-600">{error}</p>
            )} */}
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;