import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, AlertTriangle, CheckCircle, ChevronDown, Plus, Settings2, Users, Building2, Repeat, TrendingUp, ShieldCheck, Activity } from 'lucide-react';
import { useStore } from '../mock/store';

export default function Dashboard() {
  const navigate = useNavigate();
  const { products, discountRules, subscriptionPlans, warehouses, auditLogs, approvalChains, upsellRules, customers, priceLists } = useStore();

  const activeProducts = products.filter(p => p.isActive).length;
  const activeWarehouses = warehouses.filter(w => w.isActive).length;
  const activeSubs = subscriptionPlans.filter(p => p.isActive).length;
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  const goldCustomers = customers.filter(c => c.tier === 'Gold').length;
  const silverCustomers = customers.filter(c => c.tier === 'Silver').length;
  const bronzeCustomers = customers.filter(c => c.tier === 'Bronze').length;
  const totalRevenue = customers.reduce((sum: number, c: any) => sum + (c.totalRevenue || 0), 0);
  const topCustomers = [...customers].sort((a: any, b: any) => b.totalRevenue - a.totalRevenue).slice(0, 5);
  const topProducts = [...products].filter(p => p.isActive).slice(0, 5);
  const totalSubscribers = subscriptionPlans.reduce((sum: number, s: any) => sum + (s.subscribers || 0), 0);

  const [simRes, setSimRes] = useState<any>(null);
  const [tier, setTier] = useState('Gold');
  const [reqDisc, setReqDisc] = useState(18);
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [activityPage, setActivityPage] = useState(1);
  const ACTIVITY_PER_PAGE = 8;

  const handleSimulate = () => {
    const rule = discountRules.find((r: any) => r.customerTier === tier && !r.categoryId) || { maxDiscount: 0 };
    const allowed = rule.maxDiscount;
    const exceeded = reqDisc > allowed ? reqDisc - allowed : 0;
    let risk = 'Low';
    let reqAppr: string[] = [];
    if (exceeded > 0) {
      risk = exceeded > 5 ? 'High' : 'Medium';
      approvalChains.forEach((c: any) => {
        if (reqDisc >= c.threshold) reqAppr.push(c.role);
      });
    }
    setSimRes({ allowedDiscount: allowed, exceededBy: exceeded, riskLevel: risk, requiredApprovals: reqAppr });
  };

  const displayedLogs = auditLogs.slice(0, activityPage * ACTIVITY_PER_PAGE);

  return (
    <div className="max-w-6xl space-y-8 font-sans">
      <div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">Admin Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Central configuration hub for DealFlow operations</p>
      </div>

      {/* KPI Row 1 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Active Products" value={activeProducts} subtitle="in catalog" icon={<Package size={16} />} />
        <StatCard title="Total Customers" value={activeCustomers} subtitle={`${goldCustomers} Gold · ${silverCustomers} Silver · ${bronzeCustomers} Bronze`} icon={<Users size={16} />} />
        <StatCard title="Active Warehouses" value={activeWarehouses} subtitle="fulfillment locations" icon={<Building2 size={16} />} />
        <StatCard title="Subscription Plans" value={activeSubs} subtitle={`${totalSubscribers} subscribers`} icon={<Repeat size={16} />} accent="text-[#7d9b6b]" />
      </div>

      {/* KPI Row 2 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Discount Rules" value={discountRules.length} subtitle="configured ceilings" icon={<ShieldCheck size={16} />} accent="text-[#e69865]" />
        <StatCard title="Approval Chains" value={approvalChains.filter((a: any) => a.isActive).length} subtitle="active escalations" icon={<Settings2 size={16} />} accent="text-[#e69865]" />
        <StatCard title="Upsell Rules" value={upsellRules.filter((u: any) => u.isActive).length} subtitle="cross/upsell active" icon={<TrendingUp size={16} />} accent="text-[#db7b5e]" />
        <StatCard title="Total Revenue" value={`$${(totalRevenue / 1000000).toFixed(1)}M`} subtitle="lifetime from customers" icon={<Activity size={16} />} accent="text-[#7d9b6b]" />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 relative">
        <button
          onClick={() => setShowNewMenu(!showNewMenu)}
          className="bg-[#7d9b6b] hover:bg-[#8cae78] text-[#0f1110] font-medium px-4 py-2 rounded-md text-sm transition-colors flex items-center"
        >
          <Plus size={16} className="mr-2" /> New configuration
        </button>
        {showNewMenu && (
          <div className="absolute top-12 left-0 w-52 bg-[#151816] border border-[#212623] rounded-md shadow-xl py-2 z-50">
            {[['Products', '/products'], ['Price Lists', '/pricing'], ['Discount Tiers', '/governance'], ['Approval Chain', '/approvals'], ['Warehouse', '/warehouses'], ['Subscription Plan', '/subscriptions'], ['Upsell Rule', '/upsells']].map(([label, path]) => (
              <button key={path} onClick={() => { navigate(path); setShowNewMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1e1b] hover:text-white">{label}</button>
            ))}
          </div>
        )}
        <button onClick={() => navigate('/approvals')} className="bg-transparent hover:bg-[#151816] text-white px-4 py-2 rounded-md text-sm border border-[#3b413c] transition-colors flex items-center">
          <Settings2 size={16} className="mr-2 text-gray-400" /> View approvals
        </button>
        <button onClick={() => navigate('/reports')} className="bg-transparent hover:bg-[#151816] text-white px-4 py-2 rounded-md text-sm border border-[#3b413c] transition-colors flex items-center">
          <Activity size={16} className="mr-2 text-gray-400" /> View reports
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Rule Simulator */}
        <div className="bg-[#151816] p-6 rounded-lg border border-[#212623]">
          <h2 className="text-base font-semibold text-white mb-5">Discount Rule Simulator</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Customer Tier</label>
                <select value={tier} onChange={e => setTier(e.target.value)} className="block w-full bg-[#0f1110] border border-[#212623] rounded-md text-sm text-gray-200 p-2.5 focus:border-[#7d9b6b] focus:ring-0 outline-none">
                  <option>Gold</option><option>Silver</option><option>Bronze</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Requested Discount (%)</label>
                <input type="number" value={reqDisc} onChange={e => setReqDisc(Number(e.target.value))} className="block w-full bg-[#0f1110] border border-[#212623] rounded-md text-sm text-gray-200 p-2.5 focus:border-[#7d9b6b] focus:ring-0 outline-none" />
              </div>
            </div>
            <button onClick={handleSimulate} className="w-full bg-[#212623] text-gray-200 p-2.5 rounded-md hover:bg-[#2c332f] transition-colors text-sm font-medium border border-[#3b413c]">
              Simulate Rule
            </button>
            {simRes && (
              <div className={`p-4 rounded-md flex items-start space-x-3 border ${simRes.riskLevel === 'High' ? 'bg-[#1e1515] border-[#3d2323]' : simRes.riskLevel === 'Medium' ? 'bg-[#1e1c15] border-[#3d3523]' : 'bg-[#151e18] border-[#233d2a]'}`}>
                <AlertTriangle className={simRes.riskLevel === 'High' ? 'text-[#db7b5e]' : simRes.riskLevel === 'Medium' ? 'text-[#e69865]' : 'text-[#7d9b6b]'} size={16} />
                <div>
                  <h3 className="font-medium text-sm text-gray-200">{simRes.riskLevel} Risk Quotation</h3>
                  <p className="text-xs mt-1 text-gray-400">
                    Allowed: <strong className="text-gray-300">{simRes.allowedDiscount}%</strong>.{' '}
                    {simRes.exceededBy > 0 && <>Exceeds ceiling by <strong className="text-[#db7b5e]">{simRes.exceededBy}%</strong>. </>}
                    Required approvals: <strong className="text-gray-300">{simRes.requiredApprovals.length ? [...new Set(simRes.requiredApprovals)].join(' → ') : 'None (auto-approved)'}</strong>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Configuration Health */}
        <div className="space-y-4">
          <div className="bg-[#151816] p-6 rounded-lg border border-[#212623]">
            <h2 className="text-base font-semibold text-white mb-4">Configuration Health</h2>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm"><CheckCircle className="text-[#7d9b6b] mt-0.5 shrink-0" size={16} /><span className="text-gray-300">Discount ceilings configured for all 3 tiers across 4 categories</span></li>
              <li className="flex items-start space-x-3 text-sm"><CheckCircle className="text-[#7d9b6b] mt-0.5 shrink-0" size={16} /><span className="text-gray-300">4-level approval chain active (Auto → Manager → Finance → VP)</span></li>
              <li className="flex items-start space-x-3 text-sm"><AlertTriangle className="text-[#db7b5e] mt-0.5 shrink-0" size={16} /><span className="text-gray-300">Warehouse 'North Depot' missing shipping weight configuration</span></li>
              <li className="flex items-start space-x-3 text-sm"><CheckCircle className="text-[#7d9b6b] mt-0.5 shrink-0" size={16} /><span className="text-gray-300">{activeProducts} products active across 4 categories</span></li>
              <li className="flex items-start space-x-3 text-sm"><CheckCircle className="text-[#7d9b6b] mt-0.5 shrink-0" size={16} /><span className="text-gray-300">{activeSubs} subscription plans live with {totalSubscribers} active subscribers</span></li>
              <li className="flex items-start space-x-3 text-sm"><AlertTriangle className="text-[#e69865] mt-0.5 shrink-0" size={16} /><span className="text-gray-300">Central Returns Center (WH008) currently inactive</span></li>
            </ul>
          </div>

          {/* Tier Breakdown */}
          <div className="bg-[#151816] p-5 rounded-lg border border-[#212623]">
            <h2 className="text-sm font-semibold text-white mb-3">Customer Tier Distribution</h2>
            <div className="space-y-2">
              {[['Gold', goldCustomers, '#e69865'], ['Silver', silverCustomers, '#9ca3af'], ['Bronze', bronzeCustomers, '#c2875a']].map(([label, count, color]) => (
                <div key={label as string} className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-12">{label}</span>
                  <div className="flex-1 bg-[#212623] rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: `${Math.round((Number(count) / customers.length) * 100)}%`, backgroundColor: color as string }} />
                  </div>
                  <span className="text-xs text-gray-400 w-8 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Customers + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#151816] p-6 rounded-lg border border-[#212623]">
          <h2 className="text-base font-semibold text-white mb-4">Top Customers by Revenue</h2>
          <div className="space-y-3">
            {topCustomers.map((c: any, i: number) => (
              <div key={c.id} className="flex items-center justify-between py-2 border-b border-[#212623] last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-600 w-4">{i + 1}</span>
                  <div>
                    <p className="text-sm text-gray-200">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.industry} · <span className={`${c.tier === 'Gold' ? 'text-[#e69865]' : c.tier === 'Silver' ? 'text-gray-400' : 'text-[#c2875a]'}`}>{c.tier}</span></p>
                  </div>
                </div>
                <span className="text-sm text-[#7d9b6b] font-medium">${(c.totalRevenue / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-0">
            {displayedLogs.map((log: any) => (
              <div key={log.id} className="flex justify-between items-start py-3 border-b border-[#212623] text-sm gap-3">
                <div className="flex items-start gap-2">
                  <span className={`text-xs px-1.5 py-0.5 rounded font-mono shrink-0 ${log.action === 'CREATE' ? 'bg-[#7d9b6b]/20 text-[#7d9b6b]' : log.action === 'DELETE' ? 'bg-[#db7b5e]/20 text-[#db7b5e]' : 'bg-[#e69865]/20 text-[#e69865]'}`}>
                    {log.action}
                  </span>
                  <span className="text-gray-400 text-xs leading-relaxed">{log.details}</span>
                </div>
                <span className="text-gray-600 text-xs whitespace-nowrap shrink-0">{new Date(log.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
          {displayedLogs.length < auditLogs.length && (
            <div className="flex justify-center mt-3">
              <button onClick={() => setActivityPage(p => p + 1)} className="w-8 h-8 rounded-full border border-[#212623] bg-[#151816] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <ChevronDown size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon, accent = 'text-[#e69865]' }: { title: string; value: string | number; subtitle: string; icon?: React.ReactNode; accent?: string }) {
  return (
    <div className="bg-[#151816] p-5 rounded-lg border border-[#212623] shadow-sm flex flex-col justify-between h-28">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-300">{title}</p>
        {icon && <span className="text-gray-600">{icon}</span>}
      </div>
      <div>
        <h3 className={`text-2xl font-semibold ${accent}`}>{value}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}
