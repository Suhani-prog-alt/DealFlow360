import { create } from 'zustand';
import { initialQuotations, initialMessages, initialNotifications } from './mockData';
import type { Quotation, NegotiationMessage, Notification } from './mockData';

interface StoreState {
  quotations: Quotation[];
  messages: Record<string, NegotiationMessage[]>;
  notifications: Notification[];
  addMessage: (quoteId: string, message: Omit<NegotiationMessage, 'id' | 'timestamp'>) => void;
  updateQuotationStatus: (quoteId: string, status: Quotation['status']) => void;
  markNotificationRead: (id: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  quotations: initialQuotations,
  messages: initialMessages,
  notifications: initialNotifications,
  addMessage: (quoteId, message) => set((state) => {
    const newMessage = { ...message, id: Date.now().toString(), timestamp: new Date().toISOString() };
    const quoteMessages = state.messages[quoteId] || [];
    return { messages: { ...state.messages, [quoteId]: [...quoteMessages, newMessage] } };
  }),
  updateQuotationStatus: (quoteId, status) => set((state) => ({
    quotations: state.quotations.map(q => q.id === quoteId ? { ...q, status } : q)
  })),
  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  }))
}));
