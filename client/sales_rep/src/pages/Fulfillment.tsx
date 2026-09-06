import React, { useState, useEffect } from 'react';
import { Package, Truck, AlertCircle, Loader } from 'lucide-react';

export default function Fulfillment() {
  const [order, setOrder] = useState<any>(null);
  const [splitData, setSplitData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch the latest accepted quotation to use as an "Order"
    fetch('http://localhost:3001/api/approvals?status=Accepted')
      .then(res => res.json())
      .then(data => {
        const acceptedQuotes = data.approvals || [];
        if (acceptedQuotes.length > 0) {
          const selectedOrder = acceptedQuotes[0];
          setOrder(selectedOrder);
          
          // 2. Parse the items (which are stored as a JSON string in the DB)
          let parsedItems = [];
          try {
            parsedItems = typeof selectedOrder.items === 'string' ? JSON.parse(selectedOrder.items) : selectedOrder.items;
          } catch (e) {
            console.error("Failed to parse items", e);
          }

          // 3. Request a fulfillment split
          fetch('http://localhost:3001/api/fulfillment/split', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: parsedItems })
          })
          .then(res => res.json())
          .then(splitResponse => {
            setSplitData(splitResponse.suggestedSplit);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-white flex items-center gap-2"><Loader className="animate-spin" /> Fetching fulfillment logic...</div>;
  }

  if (!order || !splitData) {
    return <div className="p-8 text-white">No active accepted orders available for fulfillment yet. Go accept a quotation in the Customer Portal!</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Fulfillment Split</h1>
        <p className="text-zinc-400">Order #{order.id.split('-')[0]} ({order.customer})</p>
      </div>

      <div className="bg-[#81c784]/10 border border-[#81c784] rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="text-[#81c784] mt-0.5" size={20} />
        <div>
          <h3 className="text-[#81c784] font-bold">Suggested Split Applied</h3>
          <p className="text-sm text-[#81c784]/80 mt-1">To minimize shipping delays, this order has been automatically split across warehouses based on live inventory.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        {Object.entries(splitData).map(([warehouse, items]: [string, any]) => {
          if (!items || items.length === 0) return null;
          return (
            <div key={warehouse} className="bg-[#1f2921] border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#111412] rounded-lg border border-zinc-700">
                  <Truck className="text-zinc-300" size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">{warehouse}</h2>
                  <p className="text-sm text-zinc-400">Shipment Queue</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center border-b border-zinc-800 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <Package className="text-zinc-500" size={18} />
                      <div>
                        <p className="text-zinc-200">{item.name || item.product}</p>
                        <p className="text-xs text-zinc-500">Qty: {item.qty || item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-[#81c784]/20 text-[#81c784]">
                      In Stock
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end gap-3">
                <button 
                  onClick={() => alert(`Opening manual override panel for ${warehouse}...`)}
                  className="text-sm text-zinc-300 border border-zinc-700 px-4 py-2 rounded hover:bg-zinc-800 transition-colors"
                >
                  Manual Override
                </button>
                <button 
                  onClick={() => alert(`Dispatching ${warehouse} shipment!`)}
                  className="text-sm bg-[#81c784] text-black font-semibold px-4 py-2 rounded hover:bg-[#6fbf73] transition-colors"
                >
                  Dispatch
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
