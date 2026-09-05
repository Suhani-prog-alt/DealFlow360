import CrudPage from '../components/CrudPage';
export default function ApprovalChains() {
  const columns = [
    { key: 'name', label: 'Chain Name' },
    { key: 'role', label: 'Approver Role', options: ['MANAGER', 'FINANCE', 'DIRECTOR', 'VP'] },
    { key: 'threshold', label: 'Trigger Threshold (%)' },
    { key: 'level', label: 'Sequence Level' },
    { key: 'isActive', label: 'Status', render: (v: boolean) => v ? <span className="text-[#7d9b6b]">Active</span> : <span className="text-[#db7b5e]">Inactive</span> }
  ];
  return <CrudPage title="Approval Chains" description="Manage hierarchical approval escalation logic." model="approvalChains" columns={columns} />;
}
