import React from 'react';
import { Package, Truck, AlertCircle } from 'lucide-react';

const MOCK_SPLIT = {
  'Main Warehouse': [
    { id: '1', name: 'Enterprise Server X1', qty: 2, status: 'In Stock' }
  ],
  'East Depot': [
    { id: '2', name: 'Networking Switch V2', qty: 5, status: 'Low Stock' }
  ]
};

export default function Fulfillment() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Fulfillment Split</h1>
        <p className="text-zinc-400">Order #ORD-9932 (Acme Corp)</p>
      </div>

      <div className="bg-[#81c784]/10 border border-[#81c784] rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="text-[#81c784] mt-0.5" size={20} />
        <div>
          <h3 className="text-[#81c784] font-bold">Suggested Split Applied</h3>
          <p className="text-sm text-[#81c784]/80 mt-1">To minimize shipping delays, this order has been automatically split across 2 warehouses based on live inventory.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        {Object.entries(MOCK_SPLIT).map(([warehouse, items]) => (
          <div key={warehouse} className="bg-[#1f2921] border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#111412] rounded-lg border border-zinc-700">
                <Truck className="text-zinc-300" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{warehouse}</h2>
                <p className="text-sm text-zinc-400">Shipment 1 of 2</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-zinc-800 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <Package className="text-zinc-500" size={18} />
                    <div>
                      <p className="text-zinc-200">{item.name}</p>
                      <p className="text-xs text-zinc-500">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${item.status === 'In Stock' ? 'bg-[#81c784]/20 text-[#81c784]' : 'bg-[#ffb74d]/20 text-[#ffb74d]'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
              <button 
                onClick={() => alert(`Opening manual override panel for ${warehouse}...`)}
                className="text-sm text-zinc-300 border border-zinc-700 px-4 py-2 rounded hover:bg-zinc-800 transition-colors"
              >
                Manual Override
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
