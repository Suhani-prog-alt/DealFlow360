import React from 'react';

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 w-full">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Finance & Operations Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Second-level approvals, fulfillment management, and billing reconciliation</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#141414] p-6 rounded-lg border border-red-900/30">
          <p className="text-xs font-medium text-red-400 mb-2">High-Risk Discounts</p>
          <h3 className="text-3xl font-light text-red-500">04</h3>
          <p className="text-xs text-gray-500 mt-2">awaiting 2nd level approval</p>
        </div>
        
        <div className="bg-[#141414] p-6 rounded-lg border border-[#222]">
          <p className="text-xs font-medium text-gray-400 mb-2">Pending Fulfillment Splits</p>
          <h3 className="text-3xl font-light text-[#e87040]">12</h3>
          <p className="text-xs text-gray-500 mt-2">backorders requiring action</p>
        </div>
        
        <div className="bg-[#141414] p-6 rounded-lg border border-[#222]">
          <p className="text-xs font-medium text-gray-400 mb-2">Unreconciled Billing</p>
          <h3 className="text-3xl font-light text-[#e87040]">28</h3>
          <p className="text-xs text-gray-500 mt-2">recurring subscriptions</p>
        </div>

        <div className="bg-[#141414] p-6 rounded-lg border border-[#222]">
          <p className="text-xs font-medium text-gray-400 mb-2">Active Credit Notes</p>
          <h3 className="text-3xl font-light text-[#e87040]">$14.2k</h3>
          <p className="text-xs text-gray-500 mt-2">needs accounting review</p>
        </div>
      </div>

      <div className="flex space-x-3">
        <button className="bg-[#4d6a45] hover:bg-[#5b7c52] text-white text-sm font-medium py-2 px-6 rounded transition-colors">
          Review High-Risk Approvals
        </button>
        <button className="bg-transparent border border-[#333] hover:border-[#555] text-gray-300 text-sm font-medium py-2 px-6 rounded transition-colors">
          Manage Warehouse Splits
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Approvals & Fulfillment */}
        <div className="space-y-8">
          <div className="bg-[#141414] p-6 rounded-lg border border-red-900/20">
            <h4 className="text-white text-sm font-semibold mb-4 flex items-center">
               <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
               High Risk Discount Queue
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-start pb-3 border-b border-[#222]">
                <div>
                  <p className="text-sm text-gray-300 font-medium">Deal: MegaCorp Enterprise License</p>
                  <p className="text-xs text-gray-500 mt-1">Requested by: Sales Director (Approved Level 1)</p>
                </div>
                <div className="text-right">
                  <span className="text-red-400 text-sm font-bold">22% Discount</span>
                  <p className="text-[10px] text-gray-500">Tier Limit: 15%</p>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-300 font-medium">Deal: Nexus Systems Hardware</p>
                  <p className="text-xs text-gray-500 mt-1">Requested by: John Doe (Approved Level 1)</p>
                </div>
                <div className="text-right">
                  <span className="text-red-400 text-sm font-bold">18% Discount</span>
                  <p className="text-[10px] text-gray-500">Tier Limit: 12%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#141414] p-6 rounded-lg border border-[#222]">
            <h4 className="text-white text-sm font-semibold mb-4">Fulfillment & Backorder Alerts</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-[#1a1a1a] rounded border border-[#333]">
                <div className="text-[#e87040]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <div>
                   <p className="text-sm text-gray-300">Order #ORD-9921 missing 40 units of SKU-A01.</p>
                   <p className="text-xs text-gray-500 mt-0.5">Split required between North Depot & West Warehouse.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Billing Reconciliation */}
        <div className="bg-[#141414] p-6 rounded-lg border border-[#222]">
          <h4 className="text-white text-sm font-semibold mb-4">Billing Reconciliation</h4>
          <div className="space-y-4">
            <div className="pb-3 border-b border-[#222]">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-300">Recurring Subscriptions (Oct)</p>
                <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-xs rounded-full">In Progress</span>
              </div>
              <div className="w-full bg-[#222] rounded-full h-1.5 mb-1">
                <div className="bg-[#4d6a45] h-1.5 rounded-full w-[70%]"></div>
              </div>
              <p className="text-xs text-gray-500 text-right">340 / 412 Reconciled</p>
            </div>

            <div>
               <h5 className="text-xs font-medium text-gray-400 mb-3">Pending Credit Notes</h5>
               <div className="space-y-2">
                  <div className="flex justify-between p-2 hover:bg-[#1a1a1a] rounded cursor-pointer transition-colors">
                     <span className="text-sm text-gray-300">CN-2023-011</span>
                     <span className="text-sm text-gray-400">SLA Breach Refund</span>
                     <span className="text-sm font-bold text-white">$2,450</span>
                  </div>
                  <div className="flex justify-between p-2 hover:bg-[#1a1a1a] rounded cursor-pointer transition-colors">
                     <span className="text-sm text-gray-300">CN-2023-012</span>
                     <span className="text-sm text-gray-400">Prorated Downgrade</span>
                     <span className="text-sm font-bold text-white">$890</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
