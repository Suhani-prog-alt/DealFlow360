import { useStore } from '../mock/store';
export default function Reports() {
  const { products, discountRules, upsellRules, subscriptionPlans, warehouses } = useStore();
  return (
    <div className="max-w-5xl space-y-6">
      <div><h1 className="text-2xl font-semibold text-white tracking-tight">Reports & Analytics</h1><p className="text-gray-400 text-sm mt-1">System-wide operational metrics</p></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Products', value: products.length },
          { label: 'Active Products', value: products.filter(p => p.isActive).length },
          { label: 'Discount Rules', value: discountRules.length },
          { label: 'Upsell Rules', value: upsellRules.length },
          { label: 'Subscription Plans', value: subscriptionPlans.length },
          { label: 'Active Warehouses', value: warehouses.filter(w => w.isActive).length },
          { label: 'Max Discount (Gold)', value: (discountRules.find((r: any) => r.customerTier === 'Gold')?.maxDiscount || 0) + '%' },
          { label: 'Active Cross-sells', value: upsellRules.filter((r: any) => r.ruleType === 'Cross-sell' && r.isActive).length },
        ].map(stat => (
          <div key={stat.label} className="bg-[#151816] p-5 rounded-lg border border-[#212623]">
            <p className="text-xs text-gray-400">{stat.label}</p>
            <p className="text-2xl font-semibold text-[#e69865] mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
