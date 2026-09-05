import React from 'react';
import CrudPage from '../components/CrudPage';

export default function ApprovalChains() {
  const columns = [
    { key: 'name', label: 'Chain Name' },
    { key: 'role', label: 'Approver Role', options: ['MANAGER', 'FINANCE', 'DIRECTOR', 'VP'] },
    { key: 'threshold', label: 'Trigger Threshold (%)' },
    { key: 'level', label: 'Sequence Level' },
    { key: 'isActive', label: 'Status', render: (val: boolean) => (val ? <span className="text-green-500">Active</span> : <span className="text-red-500">Inactive</span>) }
  ];

  return <CrudPage title="Approval Chains" description="Manage hierarchical approval escalation logic." model="approvalChains" columns={columns} />;
}
