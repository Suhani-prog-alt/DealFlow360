import React, { useState } from 'react';

const initialSplits = [
  { id: 'ORD-9921', sku: 'SKU-A01', missing: 40, depots: ['North Depot', 'West Warehouse'], status: 'pending' },
  { id: 'ORD-9954', sku: 'SKU-B12', missing: 15, depots: ['East Hub', 'Central Warehouse'], status: 'pending' },
  { id: 'ORD-1002', sku: 'SKU-C33', missing: 120, depots: ['South Depot', 'Main Warehouse'], status: 'pending' },
];

const WarehouseSplits = () => {
  const [splits, setSplits] = useState(initialSplits);

  const handleSplit = (id: string) => {
    setSplits(splits.map(s => s.id === id ? { ...s, status: 'completed' } : s));
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center">
          <span className="w-3 h-3 rounded-full bg-[#e87040] mr-3 shadow-[0_0_10px_rgba(232,112,64,0.8)] animate-pulse"></span>
          Warehouse Splits Management
        </h1>
        <p className="text-gray-400 text-sm mt-2">Review and authorize inventory splits for backordered items across multiple depots.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {splits.map((split) => (
          <div key={split.id} className={`bg-[#141414] border rounded-xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${split.status === 'completed' ? 'border-[#4d6a45]/50 opacity-60' : 'border-[#333] hover:border-[#e87040]/50'}`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-white">{split.id}</h3>
              {split.status === 'completed' ? (
                <span className="px-2 py-1 bg-[#4d6a45]/20 text-[#4d6a45] text-xs font-semibold rounded">Resolved</span>
              ) : (
                <span className="px-2 py-1 bg-[#e87040]/20 text-[#e87040] text-xs font-semibold rounded">Action Required</span>
              )}
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between border-b border-[#222] pb-2">
                <span className="text-gray-500 text-sm">SKU</span>
                <span className="text-gray-300 text-sm font-mono">{split.sku}</span>
              </div>
              <div className="flex justify-between border-b border-[#222] pb-2">
                <span className="text-gray-500 text-sm">Shortage</span>
                <span className="text-red-400 text-sm font-bold">{split.missing} Units</span>
              </div>
              <div className="flex flex-col pt-2">
                <span className="text-gray-500 text-sm mb-2">Recommended Split</span>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-[#222] text-gray-300 text-xs rounded">{split.depots[0]}</span>
                  <span className="text-gray-600 text-xs">+</span>
                  <span className="px-2 py-1 bg-[#222] text-gray-300 text-xs rounded">{split.depots[1]}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => handleSplit(split.id)} 
              disabled={split.status === 'completed'}
              className={`w-full py-2.5 rounded text-sm font-medium transition-colors ${split.status === 'completed' ? 'bg-[#222] text-gray-500 cursor-not-allowed' : 'bg-[#e87040] hover:bg-[#d4653a] text-white'}`}
            >
              {split.status === 'completed' ? 'Split Authorized' : 'Authorize Split'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WarehouseSplits;
