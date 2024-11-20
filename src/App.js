import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/shared/Navbar';
import FileUpload from './components/shared/FileUpload';
import TabNavigation from './components/shared/TabNavigation';
import InvoicesTab from './components/Tabs/InvoicesTab';
import ProductsTab from './components/Tabs/ProductsTab';
import CustomersTab from './components/Tabs/CustomersTab';
// import TestGemini from './components/shared/TestGemini';

function App() {
  const [activeTab, setActiveTab] = useState('invoices');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'invoices':
        return <InvoicesTab />;
      case 'products':
        return <ProductsTab />;
      case 'customers':
        return <CustomersTab />;
      default:
        return <InvoicesTab />;
    }
  };

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        {/* <TestGemini /> */}
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="space-y-4 sm:space-y-8">
            <FileUpload />
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="transition-all duration-300 ease-in-out">
              {renderActiveTab()}
            </div>
          </div>
        </main>
      </div>
    </Provider>
  );
}

export default App;
