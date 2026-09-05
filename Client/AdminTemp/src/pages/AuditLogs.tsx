import { useStore } from '../mock/store';
export default function AuditLogs() {
  const { auditLogs } = useStore();
  const badge = (action: string) => {
    const map: any = { CREATE: 'text-[#7d9b6b] bg-[#7d9b6b]/10', UPDATE: 'text-[#e69865] bg-[#e69865]/10', DELETE: 'text-[#db7b5e] bg-[#db7b5e]/10' };
    return map[action] || 'text-gray-400 bg-gray-700/30';
  };
  return (
    <div className="max-w-5xl space-y-6">
      <div><h1 className="text-2xl font-semibold text-white tracking-tight">Audit Logs</h1><p className="text-gray-400 text-sm mt-1">Complete record of all Admin configuration changes</p></div>
      <div className="bg-[#151816] rounded-lg border border-[#212623] overflow-hidden">
        <table className="w-full text-left">
          <thead><tr className="border-b border-[#212623] bg-[#1a1e1b]">
            {['Timestamp','User','Action','Entity','Details'].map(h => <th key={h} className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">{h}</th>)}
          </tr></thead>
          <tbody className="divide-y divide-[#212623]">
            {auditLogs.map((log: any) => (
              <tr key={log.id} className="hover:bg-[#1a1e1b]/50 transition-colors">
                <td className="p-4 text-xs text-gray-400">{new Date(log.createdAt).toLocaleString()}</td>
                <td className="p-4 text-sm text-gray-300">{log.user}</td>
                <td className="p-4"><span className={'text-xs font-medium px-2 py-1 rounded ' + badge(log.action)}>{log.action}</span></td>
                <td className="p-4 text-sm text-gray-300">{log.entity}</td>
                <td className="p-4 text-sm text-gray-400">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
