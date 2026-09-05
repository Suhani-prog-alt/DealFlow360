import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useStore } from '../mock/store';

interface Column {
  key: string;
  label: string;
  render?: (val: any) => React.ReactNode;
  options?: string[];
}
interface CrudPageProps { title: string; description: string; model: string; columns: Column[]; }

export default function CrudPage({ title, description, model, columns }: CrudPageProps) {
  const store = useStore();
  const data = (store as any)[model] || [];
  const { addRecord, deleteRecord, updateRecord } = store;
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const toast = (msg: string) => { setToastMsg(msg); setTimeout(() => setToastMsg(null), 3000); };
  const handleAdd = () => { setEditingId(null); setFormData({}); setShowModal(true); };
  const handleEdit = (row: any) => { setEditingId(row.id); setFormData({ ...row }); setShowModal(true); };
  const handleDelete = (id: string) => { if (confirm('Delete this record?')) { deleteRecord(model, id); toast('Deleted'); } };
  const handleSave = () => {
    if (editingId) { updateRecord(model, editingId, formData); toast('Updated successfully'); }
    else { addRecord(model, formData); toast('Created successfully'); }
    setShowModal(false); setFormData({});
  };

  const renderInput = (col: Column) => {
    const val = formData[col.key];
    const isBool = typeof val === 'boolean' || col.key === 'isActive';
    const isNum = typeof val === 'number' || ['margin','price','discount','weight','tax','threshold','level'].some(k => col.key.toLowerCase().includes(k));
    if (col.options) return (
      <select className="w-full bg-[#0f1110] border border-[#212623] text-sm text-gray-200 p-2 rounded focus:border-[#7d9b6b] outline-none" value={val || col.options[0]} onChange={e => setFormData({ ...formData, [col.key]: e.target.value })}>
        {col.options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    );
    if (isBool) return (
      <select className="w-full bg-[#0f1110] border border-[#212623] text-sm text-gray-200 p-2 rounded focus:border-[#7d9b6b] outline-none" value={val ? 'true' : 'false'} onChange={e => setFormData({ ...formData, [col.key]: e.target.value === 'true' })}>
        <option value="true">Active / Yes</option><option value="false">Inactive / No</option>
      </select>
    );
    return <input type={isNum ? 'number' : 'text'} className="w-full bg-[#0f1110] border border-[#212623] text-sm text-gray-200 p-2 rounded focus:border-[#7d9b6b] outline-none" value={val !== undefined ? val : ''} onChange={e => setFormData({ ...formData, [col.key]: isNum ? Number(e.target.value) : e.target.value })} />;
  };

  return (
    <div className="max-w-5xl space-y-6 font-sans relative">
      {toastMsg && <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-[#7d9b6b] text-[#0f1110] px-4 py-2 rounded shadow-lg text-sm font-medium z-50">{toastMsg}</div>}
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-semibold text-white tracking-tight">{title}</h1><p className="text-gray-400 text-sm mt-1">{description}</p></div>
        <button onClick={handleAdd} className="bg-[#7d9b6b] hover:bg-[#8cae78] text-[#0f1110] font-medium px-4 py-2 rounded-md text-sm flex items-center"><Plus size={16} className="mr-2" /> Add New</button>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#151816] border border-[#212623] p-6 rounded-lg w-96 space-y-4 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg text-white font-medium">{editingId ? 'Edit Record' : 'Create New'}</h2>
            {columns.filter(c => c.key !== 'createdAt').map(col => (
              <div key={col.key}><label className="block text-xs text-gray-400 mb-1">{col.label}</label>{renderInput(col)}</div>
            ))}
            <div className="flex justify-end space-x-2 pt-4">
              <button onClick={() => setShowModal(false)} className="px-3 py-1.5 text-sm text-gray-400 hover:text-white border border-[#212623] rounded">Cancel</button>
              <button onClick={handleSave} className="px-3 py-1.5 text-sm bg-[#7d9b6b] text-[#0f1110] font-medium rounded">Save</button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-[#151816] rounded-lg border border-[#212623] overflow-hidden">
        {data.length === 0 ? <div className="p-8 text-center text-gray-500">No {title.toLowerCase()} found.</div> : (
          <table className="w-full text-left border-collapse">
            <thead><tr className="border-b border-[#212623] bg-[#1a1e1b]">
              {columns.map(col => <th key={col.key} className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider">{col.label}</th>)}
              <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-[#212623]">
              {data.map((row: any, i: number) => (
                <tr key={row.id || i} className="hover:bg-[#1a1e1b]/50 transition-colors">
                  {columns.map(col => <td key={col.key} className="p-4 text-sm text-gray-300">{col.render ? col.render(row[col.key]) : String(row[col.key] ?? '')}</td>)}
                  <td className="p-4 text-sm text-gray-300 text-right">
                    <button onClick={() => handleEdit(row)} className="text-gray-500 hover:text-white mr-3"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(row.id)} className="text-gray-500 hover:text-red-400"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
