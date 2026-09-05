import CrudPage from '../components/CrudPage';
export default function Pricing() {
  const columns = [
    { key: 'name', label: 'Price List Name' },
    { key: 'customerTier', label: 'Tier', options: ['Bronze', 'Silver', 'Gold'] },
    { key: 'currency', label: 'Currency', options: ['USD', 'EUR', 'GBP'] },
    { key: 'isActive', label: 'Status', render: (v: boolean) => v ? <span className="text-[#7d9b6b]">Active</span> : <span className="text-[#db7b5e]">Inactive</span> }
  ];
  return <CrudPage title="Price Lists" description="Manage regional and tier-based pricing structures." model="priceLists" columns={columns} />;
}
