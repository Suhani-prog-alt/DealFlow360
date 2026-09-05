export const initialProducts = [
  { id: '1', name: 'Enterprise Laptop Pro', type: 'HARDWARE', price: 1500, unit: 'pcs', tax: 0.1, categoryId: 'cat-1', isActive: true },
  { id: '2', name: 'Server Rack 42U', type: 'HARDWARE', price: 5000, unit: 'pcs', tax: 0.1, categoryId: 'cat-1', isActive: true },
  { id: '3', name: 'Implementation Service', type: 'SERVICE', price: 2000, unit: 'hrs', tax: 0, categoryId: 'cat-2', isActive: true },
  { id: '4', name: 'Network Switch 48-port', type: 'HARDWARE', price: 1200, unit: 'pcs', tax: 0.1, categoryId: 'cat-1', isActive: true },
  { id: '5', name: 'Cloud Backup 1TB', type: 'SUBSCRIPTION', price: 50, unit: 'mth', tax: 0.05, categoryId: 'cat-3', isActive: true },
  { id: '6', name: 'Security Audit', type: 'SERVICE', price: 5000, unit: 'hrs', tax: 0, categoryId: 'cat-2', isActive: true },
  { id: '7', name: 'Enterprise Support', type: 'SUBSCRIPTION', price: 500, unit: 'mth', tax: 0, categoryId: 'cat-3', isActive: true },
  { id: '8', name: 'Office Workstation', type: 'HARDWARE', price: 800, unit: 'pcs', tax: 0.1, categoryId: 'cat-1', isActive: false },
];

export const initialCategories = [
  { id: 'cat-1', name: 'Hardware', description: 'Physical equipment' },
  { id: 'cat-2', name: 'Services', description: 'Consulting and implementation' },
  { id: 'cat-3', name: 'Subscriptions', description: 'Recurring billing services' }
];

export const initialPriceLists = [
  { id: '1', name: 'Bronze Tier Pricing', customerTier: 'Bronze', currency: 'USD', isActive: true },
  { id: '2', name: 'Silver Tier Pricing', customerTier: 'Silver', currency: 'USD', isActive: true },
  { id: '3', name: 'Gold Tier Pricing', customerTier: 'Gold', currency: 'USD', isActive: true }
];

export const initialDiscountRules = [
  { id: '1', customerTier: 'Bronze', categoryId: null, maxDiscount: 5, createdAt: new Date().toISOString() },
  { id: '2', customerTier: 'Silver', categoryId: null, maxDiscount: 10, createdAt: new Date().toISOString() },
  { id: '3', customerTier: 'Gold', categoryId: null, maxDiscount: 15, createdAt: new Date().toISOString() },
  { id: '4', customerTier: 'Gold', categoryId: 'cat-2', maxDiscount: 10, createdAt: new Date().toISOString() }, // Stricter on services
];

export const initialApprovalChains = [
  { id: '1', name: 'Manager Review', level: 1, threshold: 10, role: 'MANAGER', isActive: true },
  { id: '2', name: 'Finance Review', level: 2, threshold: 15, role: 'FINANCE', isActive: true }
];

export const initialWarehouses = [
  { id: '1', name: 'North Depot', location: 'New York', shippingWeight: null, isActive: true },
  { id: '2', name: 'West Coast Hub', location: 'Los Angeles', shippingWeight: 5000, isActive: true },
  { id: '3', name: 'Central Warehouse', location: 'Chicago', shippingWeight: 3000, isActive: true }
];

export const initialSubscriptionPlans = [
  { id: '1', name: 'Cloud Backup 1TB', frequency: 'MONTHLY', prorationRule: 'Daily', cancelRule: 'End of Cycle', isActive: true },
  { id: '2', name: 'Enterprise Support', frequency: 'YEARLY', prorationRule: 'Monthly', cancelRule: 'Immediate with fee', isActive: true },
  { id: '3', name: 'Data Analytics Pro', frequency: 'QUARTERLY', prorationRule: 'Daily', cancelRule: 'End of Cycle', isActive: true }
];

export const initialUpsellRules = [
  { id: '1', sourceProduct: 'Enterprise CRM Suite', recommendedProduct: 'Sales Intelligence Add-on', ruleType: 'Cross-sell', minMargin: 15, promotion: 'Bundle Discount 10%', priority: 'High', isActive: true },
  { id: '2', sourceProduct: 'Enterprise CRM Suite', recommendedProduct: 'Premium Support', ruleType: 'Upsell', minMargin: 20, promotion: '1st Month Free', priority: 'Medium', isActive: true },
  { id: '3', sourceProduct: 'Cloud Analytics Pro', recommendedProduct: 'Advanced Analytics Add-on', ruleType: 'Upsell', minMargin: 25, promotion: 'Included Training', priority: 'High', isActive: true },
  { id: '4', sourceProduct: 'Sales Automation', recommendedProduct: 'Workflow Automation', ruleType: 'Cross-sell', minMargin: 10, promotion: 'None', priority: 'Low', isActive: true },
  { id: '5', sourceProduct: 'CRM Suite', recommendedProduct: 'Cloud Analytics Pro', ruleType: 'Cross-sell', minMargin: 15, promotion: 'Data Migration included', priority: 'High', isActive: true },
  { id: '6', sourceProduct: 'Standard License', recommendedProduct: 'Enterprise License', ruleType: 'Upsell', minMargin: 30, promotion: 'Priority Onboarding', priority: 'Medium', isActive: false },
  { id: '7', sourceProduct: 'Server Rack 42U', recommendedProduct: 'Enterprise Support', ruleType: 'Cross-sell', minMargin: 12, promotion: 'Extended Warranty', priority: 'Medium', isActive: true }
];

export const initialAuditLogs = [
  { id: '1', user: 'Admin', action: 'CREATE', entity: 'Product', details: 'Added Enterprise Laptop Pro', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: '2', user: 'Admin', action: 'UPDATE', entity: 'DiscountRule', details: 'Hardware category discount limit lowered to 15%', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() },
  { id: '3', user: 'Admin', action: 'CREATE', entity: 'Warehouse', details: 'Admin added North Warehouse location', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() },
  { id: '4', user: 'Admin', action: 'UPDATE', entity: 'SubscriptionPlan', details: 'Silver Tier subscription proration updated', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
  { id: '5', user: 'Admin', action: 'CREATE', entity: 'ApprovalChain', details: 'Added Manager Review', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString() },
  { id: '6', user: 'Admin', action: 'UPDATE', entity: 'PriceList', details: 'Updated Gold Tier Pricing', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
  { id: '7', user: 'Admin', action: 'CREATE', entity: 'UpsellRule', details: 'Added cross-sell for Laptop -> Switch', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { id: '8', user: 'System', action: 'DELETE', entity: 'Product', details: 'Removed old workstation', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString() },
  { id: '9', user: 'Admin', action: 'UPDATE', entity: 'Warehouse', details: 'Updated Central Warehouse capacity', createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: '10', user: 'Admin', action: 'UPDATE', entity: 'DiscountRule', details: 'Modified Bronze Tier max discount', createdAt: new Date().toISOString() }
];
