import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../mock/store';

interface Column {
  key: string;
  label: string;
  render?: (val: any) => React.ReactNode;
  options?: string[];
}

interface CrudPageProps {
  title: string;
  description: string;
  model: string;
  columns: Column[];
}

const PAGE_SIZE = 15;

export default function CrudPage({ title, description, model, columns }: CrudPageProps) {
  const store = useStore();
  const data = (store as any)[model] || [];
  const addRecord = store.addRecord;
  const deleteRecord = store.deleteRecord;
  const updateRecord = store.updateRecord;

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data by search query
  const filtered = data.filter((row: any) =>
    columns.some(col => {
      const val = row[col.key];
      if (val === null || val === undefined) return false;
      return String(val).toLowerCase().includes(search.toLowerCase());
    })
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedData = filtered.slice((safeCurrentPage - 1) * PAGE_SIZE, safeCurrentPage * PAGE_SIZE);

  const handleAdd = () => {
    setEditingId(null);
    setFormData({});
    setShowModal(true);
  };

  const handleEdit = (row: any) => {
    setEditingId(row.id);
    setFormData({ ...row });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this record?')) {
      deleteRecord(model, id);
      showToast('Record deleted successfully');
    }
  };

  const handleSave = () => {
    if (editingId) {
      updateRecord(model, editingId, formData);
      showToast('Record updated successfully');
    } else {
      addRecord(model, formData);
      showToast('Record created successfully');
    }
    setShowModal(false);
    setFormData({});
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const renderInput = (col: Column) => {
    const val = formData[col.key];
    const isBool = typeof val === 'boolean' || col.key === 'isActive';
    const isNum = typeof val === 'number' || col.key.toLowerCase().includes('margin') || col.key.toLowerCase().includes('price') || col.key.toLowerCase().includes('discount') || col.key.toLowerCase().includes('weight') || col.key.toLowerCase().includes('threshold') || col.key.toLowerCase().includes('level');

    if (col.options) {
      return (
        <select
          className="w-full bg-[#0f1110] border border-[#212623] text-sm text-gray-200 p-2 rounded focus:border-[#7d9b6b] outline-none"
          value={val || col.options[0]}
          onChange={e => setFormData({ ...formData, [col.key]: e.target.value })}
        >
          {col.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      );
    }

    if (isBool) {
      return (
        <select
          className="w-full bg-[#0f1110] border border-[#212623] text-sm text-gray-200 p-2 rounded focus:border-[#7d9b6b] outline-none"
          value={val ? 'true' : 'false'}
          onChange={e => setFormData({ ...formData, [col.key]: e.target.value === 'true' })}
        >
          <option value="true">Active / Yes</option>
          <option value="false">Inactive / No</option>
        </select>
      );
    }

    return (
      <input
        type={isNum ? 'number' : 'text'}
        className="w-full bg-[#0f1110] border border-[#212623] text-sm text-gray-200 p-2 rounded focus:border-[#7d9b6b] outline-none"
        value={val !== undefined ? val : ''}
        onChange={e => setFormData({ ...formData, [col.key]: isNum ? Number(e.target.value) : e.target.value })}
      />
    );
  };

  return (
    <div className="max-w-6xl space-y-6 font-sans relative">
      {toastMsg && (
        <div className="fixed top-4 right-4 bg-[#7d9b6b] text-[#0f1110] px-4 py-2 rounded shadow-lg text-sm font-medium z-40 transition-opacity">
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">{title}</h1>
          <p className="text-gray-400 text-sm mt-1">{description}</p>
        </div>
        <button onClick={handleAdd} className="bg-[#7d9b6b] hover:bg-[#8cae78] text-[#0f1110] font-medium px-4 py-2 rounded-md text-sm transition-colors flex items-center shrink-0">
          <Plus size={16} className="mr-2" /> Add New
        </button>
      </div>

      {/* Search + Count */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={search}
            onChange={handleSearchChange}
            className="w-full bg-[#151816] border border-[#212623] text-sm text-gray-200 pl-8 pr-3 py-2 rounded-md focus:border-[#7d9b6b] outline-none placeholder-gray-600"
          />
        </div>
        <span className="text-xs text-gray-500 shrink-0">
          {filtered.length} record{filtered.length !== 1 ? 's' : ''}
          {search ? ` matching "${search}"` : ''}
        </span>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#151816] border border-[#212623] p-6 rounded-lg w-96 space-y-4 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg text-white font-medium">{editingId ? 'Edit Record' : 'Create New'}</h2>
            {columns.map(col => col.key !== 'createdAt' ? (
              <div key={col.key}>
                <label className="block text-xs text-gray-400 mb-1">{col.label}</label>
                {renderInput(col)}
              </div>
            ) : null)}
            <div className="flex justify-end space-x-2 pt-4">
              <button onClick={() => setShowModal(false)} className="px-3 py-1.5 text-sm text-gray-400 hover:text-white border border-[#212623] rounded">Cancel</button>
              <button onClick={handleSave} className="px-3 py-1.5 text-sm bg-[#7d9b6b] text-[#0f1110] font-medium rounded">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-[#151816] rounded-lg border border-[#212623] overflow-hidden">
        {paginatedData.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {search ? `No results found for "${search}".` : `No ${title.toLowerCase()} found.`}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#212623] bg-[#1a1e1b]">
                  {columns.map(col => (
                    <th key={col.key} className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      {col.label}
                    </th>
                  ))}
                  <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#212623]">
                {paginatedData.map((row: any, i: number) => (
                  <tr key={row.id || i} className="hover:bg-[#1a1e1b]/50 transition-colors">
                    {columns.map(col => (
                      <td key={col.key} className="p-4 text-sm text-gray-300 whitespace-nowrap max-w-xs truncate">
                        {col.render ? col.render(row[col.key]) : (row[col.key] === null || row[col.key] === undefined ? <span className="text-gray-600 italic">—</span> : String(row[col.key]))}
                      </td>
                    ))}
                    <td className="p-4 text-sm text-gray-300 text-right">
                      <button onClick={() => handleEdit(row)} className="text-gray-500 hover:text-white mr-3"><Edit2 size={15} /></button>
                      <button onClick={() => handleDelete(row.id)} className="text-gray-500 hover:text-red-400"><Trash2 size={15} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Page {safeCurrentPage} of {totalPages} — showing {((safeCurrentPage - 1) * PAGE_SIZE) + 1}–{Math.min(safeCurrentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={safeCurrentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded border border-[#212623] text-gray-400 hover:text-white hover:bg-[#1a1e1b] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let page = i + 1;
              if (totalPages > 5) {
                if (safeCurrentPage <= 3) page = i + 1;
                else if (safeCurrentPage >= totalPages - 2) page = totalPages - 4 + i;
                else page = safeCurrentPage - 2 + i;
              }
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded border text-sm transition-colors ${safeCurrentPage === page ? 'bg-[#7d9b6b] text-[#0f1110] border-[#7d9b6b] font-medium' : 'border-[#212623] text-gray-400 hover:text-white hover:bg-[#1a1e1b]'}`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded border border-[#212623] text-gray-400 hover:text-white hover:bg-[#1a1e1b] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
