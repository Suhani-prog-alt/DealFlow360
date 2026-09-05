
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import CustomerLayout from './components/CustomerLayout';
import Dashboard from './pages/Dashboard';
import MyQuotations from './pages/MyQuotations';
import QuotationDetail from './pages/QuotationDetail';
import Notifications from './pages/Notifications';
import Account from './pages/Account';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="quotations" element={<MyQuotations />} />
          <Route path="quotations/:id" element={<QuotationDetail />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
