import CrudPage from '../components/CrudPage';
export default function Products() {
  const columns = [
    { key: 'name', label: 'Product Name' },
    { key: 'type', label: 'Category', options: ['HARDWARE', 'SERVICE', 'SUBSCRIPTION'] },
    { key: 'price', label: 'Base Price', render: (v: number) => '$' + v?.toFixed(2) },
    { key: 'unit', label: 'Unit' },
    { key: 'tax', label: 'Tax Rate', render: (v: number) => (v * 100).toFixed(1) + '%' },
    { key: 'isActive', label: 'Status', render: (v: boolean) => v ? <span className="text-[#7d9b6b]">Active</span> : <span className="text-[#db7b5e]">Inactive</span> }
  ];
  return <CrudPage title="Products Management" description="Manage your global product catalog." model="products" columns={columns} />;
}
