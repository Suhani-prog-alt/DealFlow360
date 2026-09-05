import { create } from 'zustand';
import { initialProducts, initialCategories, initialPriceLists, initialDiscountRules, initialApprovalChains, initialWarehouses, initialSubscriptionPlans, initialUpsellRules, initialAuditLogs } from './data';

interface StoreState {
  products: any[];
  categories: any[];
  priceLists: any[];
  discountRules: any[];
  approvalChains: any[];
  warehouses: any[];
  subscriptionPlans: any[];
  upsellRules: any[];
  auditLogs: any[];
  
  addRecord: (model: string, data: any) => void;
  deleteRecord: (model: string, id: string) => void;
  updateRecord: (model: string, id: string, data: any) => void;
}

export const useStore = create<StoreState>((set) => ({
  products: initialProducts,
  categories: initialCategories,
  priceLists: initialPriceLists,
  discountRules: initialDiscountRules,
  approvalChains: initialApprovalChains,
  warehouses: initialWarehouses,
  subscriptionPlans: initialSubscriptionPlans,
  upsellRules: initialUpsellRules,
  auditLogs: initialAuditLogs,

  addRecord: (model, data) => set((state) => {
    const newRecord = { ...data, id: Math.random().toString(36).substr(2, 9), createdAt: new Date().toISOString() };
    const newLog = { 
      id: Math.random().toString(36).substr(2, 9), 
      user: 'Admin', 
      action: 'CREATE', 
      entity: model, 
      details: `Added new ${model}`, 
      createdAt: new Date().toISOString() 
    };
    return {
      [model]: [...(state as any)[model], newRecord],
      auditLogs: [newLog, ...state.auditLogs]
    };
  }),

  deleteRecord: (model, id) => set((state) => {
    const newLog = { 
      id: Math.random().toString(36).substr(2, 9), 
      user: 'Admin', 
      action: 'DELETE', 
      entity: model, 
      details: `Deleted record from ${model}`, 
      createdAt: new Date().toISOString() 
    };
    return {
      [model]: (state as any)[model].filter((item: any) => item.id !== id),
      auditLogs: [newLog, ...state.auditLogs]
    };
  }),

  updateRecord: (model, id, data) => set((state) => {
    const newLog = { 
      id: Math.random().toString(36).substr(2, 9), 
      user: 'Admin', 
      action: 'UPDATE', 
      entity: model, 
      details: `Updated ${model} record`, 
      createdAt: new Date().toISOString() 
    };
    return {
      [model]: (state as any)[model].map((item: any) => item.id === id ? { ...item, ...data } : item),
      auditLogs: [newLog, ...state.auditLogs]
    };
  })
}));
