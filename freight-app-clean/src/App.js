import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Shipments from './pages/Shipments';
import Tracking from './pages/Tracking';
import Quotes from './pages/Quotes';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function AppLayout({ children }) {
  return (
    <div className="app-layout noise">
      <Sidebar/>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/dashboard"  element={<AppLayout><Dashboard/></AppLayout>}/>
        <Route path="/shipments"  element={<AppLayout><Shipments/></AppLayout>}/>
        <Route path="/tracking"   element={<AppLayout><Tracking/></AppLayout>}/>
        <Route path="/quotes"     element={<AppLayout><Quotes/></AppLayout>}/>
        <Route path="/customers"  element={<AppLayout><Customers/></AppLayout>}/>
        <Route path="/analytics"  element={<AppLayout><Analytics/></AppLayout>}/>
        <Route path="/settings"   element={<AppLayout><Settings/></AppLayout>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </BrowserRouter>
  );
}
