import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Bell, User } from 'lucide-react';
import { mockUser } from '../mockData';
import { useStore } from '../store';

const CustomerLayout: React.FC = () => {
  const location = useLocation();
  const notifications = useStore(s => s.notifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Quotations', path: '/quotations', icon: FileText },
    { name: 'Notifications', path: '/notifications', icon: Bell, badge: unreadCount },
    { name: 'Account / Profile', path: '/account', icon: User },
  ];

  return (
    <div className="flex h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)]">
      <aside className="w-64 bg-[var(--color-bg-card)] border-r border-[var(--color-border-subtle)] flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold text-[var(--color-accent-green)]">DealFlow360</h1>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">Customer Portal</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 flex flex-col">
          {navItems.map(item => {
            const active = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${active ? 'bg-[var(--color-border-subtle)] text-[var(--color-accent-green)]' : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-border-subtle)]'}`}>
                <Icon size={18} />
                <span>{item.name}</span>
                {item.badge && item.badge > 0 ? (
                  <span className="ml-auto bg-[var(--color-accent-green)] text-[var(--color-bg-base)] text-xs font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
                ) : null}
              </Link>
            )
          })}
          
          <div className="mt-auto pt-4 border-t border-[var(--color-border-subtle)]">
            <button onClick={() => { localStorage.removeItem('jwt_token'); window.location.href = '/'; }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-red-400 hover:bg-red-500/10">
              <span className="ml-1">Logout</span>
            </button>
          </div>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col bg-[var(--color-bg-base)]">
        <header className="flex items-center justify-end px-8 py-4 border-b border-[var(--color-border-subtle)] shrink-0">
          <Link to="/account" className="flex items-center gap-3 hover:bg-[var(--color-border-subtle)] p-1.5 pr-3 rounded-full transition-colors cursor-pointer border border-transparent hover:border-[var(--color-border-subtle)]">
            <div className="w-8 h-8 rounded-full bg-[var(--color-border-subtle)] flex items-center justify-center font-bold text-[var(--color-accent-green)]">
              {mockUser.name.charAt(0)}
            </div>
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">{mockUser.name}</span>
          </Link>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default CustomerLayout;
