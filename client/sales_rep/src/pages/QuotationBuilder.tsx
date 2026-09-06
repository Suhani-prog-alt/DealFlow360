import React, { useState, useEffect } from 'react';
import { Plus, Check, AlertTriangle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Enterprise Server X1', category: 'Hardware', price: 5000, margin: 40, maxDiscount: 15 },
  { id: '2', name: 'Cloud Setup & Migration', category: 'Service', price: 2000, margin: 20, maxDiscount: 10 },
  { id: '3', name: 'DealFlow Pro License (Yearly)', category: 'Subscription', price: 1200, margin: 80, maxDiscount: 20 }
];

// Using the keys you provided
const supabase = createClient(
  'https://pqqqpnfbanjrhvgasjuq.supabase.co', 
  'sb_publishable_Pslou1XLe6oqkKmAoU2OHw_bwIM9-qq'
);

const QuotationBuilder = () => {
  const [cart, setCart] = useState<{product: any, qty: number, discount: number}[]>([]);
  const [customer, setCustomer] = useState('Acme Corp');
  const [availableProducts, setAvailableProducts] = useState<any[]>([]);

  useEffect(() => {
    // Attempt to fetch from your partner's live Supabase database
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('Product').select('*');
      
      if (error || !data || data.length === 0) {
        console.error("Supabase RLS blocked the request. Falling back to mock data.", error);
        setAvailableProducts(MOCK_PRODUCTS);
      } else {
        // Map Prisma DB schema to our frontend schema
        const mappedData = data.map(p => ({
          id: p.id,
          name: p.name,
          category: p.category,
          price: p.unitPrice,
          margin: 30, // Mock margin as it's not in DB schema
          maxDiscount: 15 // Mock maxDiscount as it's handled by rules in DB
        }));
        setAvailableProducts(mappedData);
      }
    };
    
    fetchProducts();
  }, []);

  const addToCart = (product: any) => {
    if (!cart.find(item => item.product.id === product.id)) {
      setCart([...cart, { product, qty: 1, discount: 0 }]);
    }
  };

  const updateDiscount = (id: string, discount: number) => {
    // Prevent negative discounts and max at 100%
    const clampedDiscount = Math.max(0, Math.min(100, discount));
    setCart(cart.map(item => item.product.id === id ? { ...item, discount: clampedDiscount } : item));
  };

  const calculateRiskScore = () => {
    let riskPoints = 0;
    cart.forEach(item => {
      if (item.discount > item.product.maxDiscount) {
        riskPoints += (item.discount - item.product.maxDiscount);
      }
    });
    return riskPoints;
  };

  const riskScore = calculateRiskScore();
  const needsApproval = riskScore > 0;
  const total = cart.reduce((acc, item) => acc + (item.product.price * item.qty * (1 - item.discount / 100)), 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">New Quotation</h1>
          <p className="text-zinc-400">Build a quote for your client</p>
        </div>
        <div className="bg-[#1f2921] border border-zinc-700/80 rounded-xl p-3 shadow-lg min-w-[250px]">
          <label className="block text-xs font-semibold text-zinc-400 mb-1">Select Customer</label>
          <select 
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="w-full bg-[#111412] text-white border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#81c784]"
          >
            <option value="Acme Corp">Acme Corp (Tier: Gold)</option>
            <option value="Globex Inc">Globex Inc (Tier: Silver)</option>
            <option value="Stark Ind">Stark Industries (Tier: Platinum)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[#1f2921] border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Cart items</h2>
            {cart.length === 0 ? (
              <p className="text-zinc-500">No items in cart.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {cart.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center border-b border-zinc-800 pb-4">
                    <div>
                      <p className="text-zinc-200 font-medium">{item.product.name}</p>
                      <p className="text-xs text-zinc-500">{item.product.category} - Max discount allowed: {item.product.maxDiscount}%</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-zinc-400">Discount:</span>
                        <input 
                          type="number" 
                          min="0"
                          max="100"
                          value={item.discount}
                          onChange={(e) => updateDiscount(item.product.id, Number(e.target.value))}
                          className="bg-[#111412] border border-zinc-700 rounded px-2 py-1 w-16 text-white outline-none focus:border-[#81c784]" 
                        />
                        <span className="text-zinc-400">%</span>
                      </div>
                      <p className="text-white font-bold min-w-[80px] text-right">
                        ${(item.product.price * item.qty * (1 - item.discount / 100)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[#1f2921] border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Product Catalog</h2>
            <div className="flex flex-col gap-3">
              {availableProducts.map(product => (
                <div key={product.id} className="flex justify-between items-center bg-[#111412] p-4 rounded border border-zinc-800">
                  <div>
                    <p className="text-white">{product.name}</p>
                    <p className="text-sm text-zinc-500">${product.price}</p>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="flex items-center gap-1 text-[#81c784] hover:bg-[#81c784]/10 px-3 py-1.5 rounded transition-colors"
                  >
                    <Plus size={16} /> Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-[#1f2921] border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Summary</h2>
            <div className="flex justify-between items-center mb-4 text-xl">
              <span className="text-zinc-300">Total</span>
              <span className="text-white font-bold">${total.toFixed(2)}</span>
            </div>
            
            <div className={`p-4 rounded border ${needsApproval ? 'border-[#ff8a65] bg-[#ff8a65]/10 text-[#ff8a65]' : 'border-[#81c784] bg-[#81c784]/10 text-[#81c784]'} mb-6`}>
              <div className="flex items-center gap-2 font-bold mb-1">
                {needsApproval ? <AlertTriangle size={18} /> : <Check size={18} />}
                {needsApproval ? 'Approval Required' : 'Auto-Approve Eligible'}
              </div>
              <p className="text-sm opacity-90">
                Blended Risk Score: {riskScore} points
              </p>
              {needsApproval && (
                <p className="text-xs mt-2 opacity-80">
                  One or more lines exceed allowed discount ceilings. This quote will be routed to the Sales Manager.
                </p>
              )}
            </div>

            <button 
              onClick={async () => {
                if (cart.length === 0) {
                  alert('Please add items to the cart first.');
                  return;
                }
                
                try {
                  const response = await fetch('http://localhost:3001/api/quotations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      customerName: customer,
                      customerTier: 'Standard',
                      items: cart
                    })
                  });
                  const result = await response.json();
                  if (result.success) {
                    alert(result.message);
                    setCart([]);
                  } else {
                    alert('Error submitting quotation');
                  }
                } catch (e) {
                  alert('Failed to connect to backend.');
                }
              }}
              className="w-full bg-[#81c784] text-black font-bold py-3 rounded hover:bg-[#6fbf73] transition-colors"
            >
              {needsApproval ? 'Submit for Approval' : 'Confirm Order'}
            </button>
          </div>

          <div className="bg-[#1f2921] border border-[#ffb74d]/50 rounded-xl p-6 mt-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#ffb74d] text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
              AI Suggestion
            </div>
            <h2 className="text-xl font-bold text-white mb-4">Upsell Opportunities</h2>
            <div className="flex flex-col gap-3">
              <div className="bg-[#111412] p-4 rounded-lg border border-zinc-700 flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">Premium Support SLA</p>
                  <p className="text-xs text-zinc-400">Frequently bought with Enterprise Server X1</p>
                </div>
                <button 
                  onClick={() => alert('Added Premium Support SLA to quote!')}
                  className="text-sm text-[#ffb74d] hover:text-white border border-[#ffb74d] hover:bg-[#ffb74d] hover:border-transparent px-3 py-1 rounded transition-colors"
                >
                  + Add ($500/mo)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationBuilder;
