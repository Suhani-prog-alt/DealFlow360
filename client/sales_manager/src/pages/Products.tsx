import { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string | null;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/config/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Products</h1>
          <p className="text-textMuted">Manage your product catalog and base prices</p>
        </div>
        <button className="btn btn-primary bg-primary text-white hover:bg-indigo-600 px-4 py-2 rounded-md font-medium">Add Product</button>
      </div>

      <div className="card bg-[#1a1a1a] p-6 rounded-lg border border-[#333]">
        {loading ? (
          <div className="text-textMuted py-8 text-center">Loading products...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#333] text-sm text-textMuted">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Price</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-textMuted">No products found.</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-[#222] hover:bg-white/5">
                    <td className="py-4 text-white">{product.name}</td>
                    <td className="py-4 text-textMuted">{product.category}</td>
                    <td className="py-4 text-white">${product.price.toLocaleString()}</td>
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
