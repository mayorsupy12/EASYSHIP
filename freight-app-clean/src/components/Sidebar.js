import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, MapPin, FileText, Users,
  BarChart3, Settings, LogOut, Menu, X, Anchor, Bell, ChevronRight
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { to:'/dashboard', icon: LayoutDashboard, label:'Dashboard' },
  { to:'/shipments',  icon: Package,          label:'Shipments' },
  { to:'/tracking',   icon: MapPin,           label:'Tracking' },
  { to:'/quotes',     icon: FileText,         label:'Quotes' },
  { to:'/customers',  icon: Users,            label:'Customers' },
  { to:'/analytics',  icon: BarChart3,        label:'Analytics' },
  { to:'/settings',   icon: Settings,         label:'Settings' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => navigate('/');

  return (
    <>
      {/* Mobile toggle */}
      <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
      </button>

      {/* Overlay */}
      {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)}/>}

      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-icon"><Anchor size={18}/></div>
          {!collapsed && (
            <div className="logo-text">
              <span className="logo-name">Beacon</span>
              <span className="logo-sub">Freight Solutions</span>
            </div>
          )}
          <button className="collapse-btn desktop-only" onClick={() => setCollapsed(!collapsed)}>
            <ChevronRight size={14} style={{ transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition:'transform 0.2s' }}/>
          </button>
        </div>

        {/* Notifications badge */}
        {!collapsed && (
          <div className="sidebar-alert">
            <Bell size={13}/>
            <span>3 shipments need attention</span>
          </div>
        )}

        {/* Nav */}
        <nav className="sidebar-nav">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? label : undefined}
            >
              <Icon size={18}/>
              {!collapsed && <span>{label}</span>}
              {!collapsed && <ChevronRight size={13} className="nav-arrow"/>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          {!collapsed && (
            <div className="user-info">
              <div className="user-avatar">AO</div>
              <div className="user-details">
                <span className="user-name">Admin Ops</span>
                <span className="user-role">Super Admin</span>
              </div>
            </div>
          )}
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <LogOut size={16}/>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
