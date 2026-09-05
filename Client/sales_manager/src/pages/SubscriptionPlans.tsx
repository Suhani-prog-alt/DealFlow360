import { useState, useEffect } from 'react';
import axios from 'axios';

interface SubscriptionPlan {
  id: string;
  name: string;
  billingCycle: string;
  price: number;
}

export default function SubscriptionPlans() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/config/subscriptions')
      .then(res => setPlans(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Subscription Plans</h1>
          <p className="text-textMuted">Manage recurring billing services</p>
        </div>
        <button className="btn bg-primary text-white px-4 py-2 rounded-md font-medium">Add Plan</button>
      </div>

      <div className="card bg-[#1a1a1a] p-6 rounded-lg border border-[#333]">
        {loading ? (
          <div className="text-textMuted py-8 text-center">Loading...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#333] text-sm text-textMuted">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Billing Cycle</th>
                <th className="pb-3 font-medium">Base Price</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {plans.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-textMuted">No subscription plans found.</td>
                </tr>
              ) : (
                plans.map((plan) => (
                  <tr key={plan.id} className="border-b border-[#222] hover:bg-white/5">
                    <td className="py-4 text-white">{plan.name}</td>
                    <td className="py-4 text-textMuted">{plan.billingCycle}</td>
                    <td className="py-4 text-white">${plan.price.toLocaleString()}</td>
                    <td className="py-4 text-right">
                      <button className="text-indigo-400 hover:text-indigo-300 font-medium">Edit</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
