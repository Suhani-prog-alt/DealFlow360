import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle, ChevronDown, Plus, Settings2 } from 'lucide-react';
import { useStore } from '../mock/store';

export default function Dashboard() {
  const navigate = useNavigate();
  const { products, discountRules, subscriptionPlans, warehouses, auditLogs, approvalChains, upsellRules } = useStore();
  const stats = {
    productsCount: products.filter(p => p.isActive).length,
    rulesCount: discountRules.length,
    warehousesCount: warehouses.filter(w => w.isActive).length,
    upsellsCount: upsellRules.length
  };
  const [simRes, setSimRes] = useState<any>(null);
  const [tier, setTier] = useState('Gold');
  const [reqDisc, setReqDisc] = useState(18);
  const [showNewMenu, setShowNewMenu] = useState(false);

  const handleSimulate = () => {
    const rule: any = discountRules.find((r: any) => r.customerTier === tier) || { maxDiscount: 0 };
    const allowed = rule.maxDiscount;
    const exceeded = reqDisc > allowed ? reqDisc - allowed : 0;
    let risk = 'Low';
    let reqAppr: string[] = [];
    if (exceeded > 0) {
      risk = exceeded > 5 ? 'High' : 'Medium';
      approvalChains.forEach((c: any) => { if (reqDisc >= c.threshold) reqAppr.push(c.role); });
    }
    setSimRes({ allowedDiscount: allowed, exceededBy: exceeded, riskLevel: risk, requiredApprovals: reqAppr });
  };

  const menuLinks = [
    ['/products','Product'],['/pricing','Price List'],['/governance','Discount Tier'],
    ['/approvals','Approval Chain'],['/warehouses','Warehouse'],['/subscriptions','Subscription Plan'],['/upsells','Upsell Rule']
  ];

  return (
    <div className="max-w-5xl space-y-8 font-sans">
      <div><h1 className="text-2xl font-semibold text-white tracking-tight">Admin Dashboard</h1><p className="text-gray-400 text-sm mt-1">Central configuration hub for DealFlow operations</p></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Active products" value={'0' + stats.productsCount} subtitle="in catalog" />
        <StatCard title="Discount rules" value={stats.rulesCount} subtitle="active ceilings" />
        <StatCard title="Warehouses" value={'0' + stats.warehousesCount} subtitle="locations" />
        <StatCard title="Upsell rules" value={'0' + stats.upsellsCount} subtitle="cross/upsell" accent="text-[#db7b5e]" />
      </div>
      <div className="flex space-x-3 relative">
        <button onClick={() => setShowNewMenu(!showNewMenu)} className="bg-[#7d9b6b] hover:bg-[#8cae78] text-[#0f1110] font-medium px-4 py-2 rounded-md text-sm flex items-center">
          <Plus size={16} className="mr-2" /> New configuration
        </button>
        {showNewMenu && (
          <div className="absolute top-12 left-0 w-48 bg-[#151816] border border-[#212623] rounded-md shadow-xl py-2 z-50">
            {menuLinks.map(([path, label]) => (
              <button key={path} onClick={() => { navigate(path); setShowNewMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1e1b] hover:text-white">{label}</button>
            ))}
          </div>
        )}
        <button onClick={() => navigate('/approvals')} className="bg-transparent hover:bg-[#151816] text-white px-4 py-2 rounded-md text-sm border border-[#3b413c] flex items-center">
          <Settings2 size={16} className="mr-2 text-gray-400" /> View approvals
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#151816] p-6 rounded-lg border border-[#212623]">
          <h2 className="text-base font-semibold text-white mb-5">Rule Simulator</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Customer Tier</label>
                <select value={tier} onChange={e => setTier(e.target.value)} className="block w-full bg-[#0f1110] border border-[#212623] rounded-md text-sm text-gray-200 p-2.5 focus:border-[#7d9b6b] outline-none">
                  <option>Gold</option><option>Silver</option><option>Bronze</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Category</label>
                <select className="block w-full bg-[#0f1110] border border-[#212623] rounded-md text-sm text-gray-200 p-2.5 focus:border-[#7d9b6b] outline-none">
                  <option>Services</option><option>Hardware</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Requested Discount (%)</label>
              <input type="number" value={reqDisc} onChange={e => setReqDisc(Number(e.target.value))} className="block w-full bg-[#0f1110] border border-[#212623] rounded-md text-sm text-gray-200 p-2.5 focus:border-[#7d9b6b] outline-none" />
            </div>
            <button onClick={handleSimulate} className="w-full bg-[#212623] text-gray-200 p-2.5 rounded-md hover:bg-[#2c332f] text-sm font-medium border border-[#3b413c]">Simulate Rule</button>
            {simRes && (
              <div className={'mt-4 p-4 rounded-md flex items-start space-x-3 border ' + (simRes.riskLevel === 'High' ? 'bg-[#1e1515] border-[#3d2323]' : 'bg-[#151e18] border-[#233d2a]')}>
                <AlertTriangle className={simRes.riskLevel === 'High' ? 'text-[#db7b5e]' : 'text-[#7d9b6b]'} size={16} />
                <div>
                  <h3 className="font-medium text-sm text-gray-200">{simRes.riskLevel} Risk Quotation</h3>
                  <p className="text-xs mt-1 text-gray-400">Allowed: {simRes.allowedDiscount}%. {simRes.exceededBy > 0 && 'Exceeds by ' + simRes.exceededBy + '%. '}Required Approvals: <strong className="text-gray-300">{simRes.requiredApprovals.join(', ') || 'None'}</strong>.</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-base font-semibold text-white mb-4">Recent activity</h2>
            <div className="space-y-0">
              {auditLogs.slice(0, 3).map((log: any) => (
                <div key={log.id} className="flex justify-between items-center py-3 border-b border-[#212623] text-sm">
                  <span className="text-gray-300">{log.details}</span>
                  <span className="text-gray-500 text-xs">{new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-2"><button className="w-8 h-8 rounded-full border border-[#212623] bg-[#151816] flex items-center justify-center text-gray-400 hover:text-white"><ChevronDown size={14} /></button></div>
          </div>
          <div className="bg-[#151816] p-6 rounded-lg border border-[#212623]">
            <h2 className="text-base font-semibold text-white mb-4">Configuration Health</h2>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm"><CheckCircle className="text-[#7d9b6b] mt-0.5" size={16} /><span className="text-gray-300">Discount ceilings configured for all tiers</span></li>
              <li className="flex items-start space-x-3 text-sm"><AlertTriangle className="text-[#db7b5e] mt-0.5" size={16} /><span className="text-gray-300">Warehouse North Depot missing shipping weight</span></li>
              <li className="flex items-start space-x-3 text-sm"><CheckCircle className="text-[#7d9b6b] mt-0.5" size={16} /><span className="text-gray-300">Approval chains are active</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, accent = 'text-[#e69865]' }: { title: string; value: string | number; subtitle: string; accent?: string }) {
  return (
    <div className="bg-[#151816] p-5 rounded-lg border border-[#212623] flex flex-col justify-between h-28">
      <p className="text-sm font-medium text-gray-300">{title}</p>
      <div><h3 className={'text-2xl font-semibold ' + accent}>{value}</h3><p className="text-xs text-gray-500 mt-0.5">{subtitle}</p></div>
    </div>
  );
}
