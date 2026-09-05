import React from 'react';
import { useStore } from '../store';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Notifications: React.FC = () => {
  const notifications = useStore(s => s.notifications);
  const markRead = useStore(s => s.markNotificationRead);
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-xl overflow-hidden divide-y divide-[var(--color-border-subtle)]">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-[var(--color-text-secondary)]">No notifications.</div>
        ) : (
          notifications.map(n => (
            <div 
              key={n.id} 
              className={`p-4 flex items-start gap-4 transition-colors cursor-pointer hover:bg-[var(--color-border-subtle)] ${n.read ? 'opacity-70' : 'bg-[var(--color-border-subtle)]/30'}`}
              onClick={() => {
                if (!n.read) markRead(n.id);
                if (n.quoteId) navigate(`/quotations/${n.quoteId}`);
              }}
            >
              <div className={`mt-1 ${n.read ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-accent-green)]'}`}>
                <Bell size={20} />
              </div>
              <div className="flex-1 cursor-pointer">
                <p className={`text-sm ${n.read ? '' : 'font-medium'}`}>{n.message}</p>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1">{n.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
