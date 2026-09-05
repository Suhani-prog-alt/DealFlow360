import { useState, useEffect } from 'react';
import axios from 'axios';

interface PriceList {
  id: string;
  name: string;
  customerTier: string;
  currency: string;
}

export default function PriceLists() {
  const [lists, setLists] = useState<PriceList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/config/pricelists')
      .then(res => setLists(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Price Lists</h1>
          <p className="text-textMuted">Manage custom pricing for different customer tiers</p>
        </div>
        <button className="btn bg-primary text-white px-4 py-2 rounded-md font-medium">Create Price List</button>
      </div>

      <div className="card bg-[#1a1a1a] p-6 rounded-lg border border-[#333]">
        {loading ? (
          <div className="text-textMuted py-8 text-center">Loading...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#333] text-sm text-textMuted">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Target Tier</th>
                <th className="pb-3 font-medium">Currency</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {lists.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-textMuted">No price lists found.</td>
                </tr>
              ) : (
                lists.map((list) => (
                  <tr key={list.id} className="border-b border-[#222] hover:bg-white/5">
                    <td className="py-4 text-white">{list.name}</td>
                    <td className="py-4 text-textMuted">{list.customerTier}</td>
                    <td className="py-4 text-textMuted">{list.currency}</td>
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
