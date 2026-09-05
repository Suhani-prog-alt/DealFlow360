import CrudPage from '../components/CrudPage';
export default function Warehouses() {
  const columns = [
    { key: 'name', label: 'Warehouse Name' },
    { key: 'location', label: 'Location' },
    { key: 'shippingWeight', label: 'Shipping Weight (kg)' },
    { key: 'isActive', label: 'Status', render: (v: boolean) => v ? <span className="text-[#7d9b6b]">Active</span> : <span className="text-[#db7b5e]">Inactive</span> }
  ];
  return <CrudPage title="Warehouses" description="Manage warehouse locations and inventory shipping rules." model="warehouses" columns={columns} />;
}
