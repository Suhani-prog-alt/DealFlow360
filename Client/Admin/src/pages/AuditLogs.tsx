import React from 'react';
import CrudPage from '../components/CrudPage';

export default function AuditLogs() {
  const columns = [
    { key: 'user', label: 'User / Admin' },
    { key: 'action', label: 'Action Taken' },
    { key: 'entity', label: 'Entity Modified' },
    { key: 'details', label: 'Details' },
    { key: 'createdAt', label: 'Timestamp', render: (val: string) => new Date(val).toLocaleString() }
  ];

  return <CrudPage title="Audit Logs" description="Track all configuration changes for compliance." model="auditLogs" columns={columns} />;
}
