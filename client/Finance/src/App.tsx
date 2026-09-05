import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard';
import InvoicesList from './pages/InvoicesList';
import BillingDetail from './pages/BillingDetail';
import DiscountApprovals from './pages/DiscountApprovals';
import SubscriptionsList from './pages/SubscriptionsList';

const AdminReporting = () => (
  <div className="w-full animate-in fade-in duration-500">
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-white tracking-tight">Admin Reporting</h1>
      <p className="text-gray-500 text-sm mt-1">Global revenue and performance analytics</p>
    </div>
    <div className="bg-[#141414] border border-[#222] rounded-lg p-6 h-96 flex items-center justify-center">
      <p className="text-gray-500">Analytics visualization coming soon...</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/finance" replace />} />
        
        <Route path="/finance" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="invoices" element={<InvoicesList />} />
          <Route path="billing" element={<BillingDetail />} />
          <Route path="subscriptions" element={<SubscriptionsList />} />
          <Route path="reports" element={<AdminReporting />} />
          <Route path="discounts" element={<DiscountApprovals />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
