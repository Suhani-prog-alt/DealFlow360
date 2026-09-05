import { useState, useEffect } from 'react';
import axios from 'axios';

interface Warehouse {
  id: string;
  name: string;
  location: string;
  shippingWeight: number;
}

export default function Warehouses() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/config/warehouses')
      .then(res => setWarehouses(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Warehouses</h1>
          <p className="text-textMuted">Manage physical locations and fulfillment nodes</p>
        </div>
        <button className="btn bg-primary text-white px-4 py-2 rounded-md font-medium">Add Warehouse</button>
      </div>

      <div className="card bg-[#1a1a1a] p-6 rounded-lg border border-[#333]">
        {loading ? (
          <div className="text-textMuted py-8 text-center">Loading...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#333] text-sm text-textMuted">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">Shipping Weight</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {warehouses.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-textMuted">No warehouses found.</td>
                </tr>
              ) : (
                warehouses.map((w) => (
                  <tr key={w.id} className="border-b border-[#222] hover:bg-white/5">
                    <td className="py-4 text-white">{w.name}</td>
                    <td className="py-4 text-textMuted">{w.location}</td>
                    <td className="py-4 text-textMuted">{w.shippingWeight}</td>
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
