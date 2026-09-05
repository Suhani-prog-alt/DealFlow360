const fs = require('fs');
const pages = ['Products', 'Pricing', 'DiscountTiers', 'ApprovalChains', 'Warehouses', 'SubscriptionPlans', 'Upsells', 'AuditLogs'];
pages.forEach(p => {
  const path = 'src/pages/' + p + '.tsx';
  let c = fs.readFileSync(path, 'utf8');
  let modelName = p.charAt(0).toLowerCase() + p.slice(1);
  if (modelName === 'discountTiers') modelName = 'discountRules';
  if (modelName === 'pricing') modelName = 'priceLists';
  c = c.replace(/endpoint="[^"]+"/, 'model="' + modelName + '"');
  fs.writeFileSync(path, c);
});
