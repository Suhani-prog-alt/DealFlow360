import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';


const QuotationDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const quotation = useStore(s => s.quotations.find(q => q.id === id));
  const messages = useStore(s => s.messages[id || ''] || []);
  const addMessage = useStore(s => s.addMessage);
  const updateStatus = useStore(s => s.updateQuotationStatus);
  
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [counterDiscount, setCounterDiscount] = useState('');

  if (!quotation) return <div>Quotation not found.</div>;

  let subtotal = 0;
  let totalDiscount = 0;
  let totalTax = 0;

  quotation.lines.forEach(line => {
    const lineSub = line.quantity * line.unitPrice;
    subtotal += lineSub;
    const lineDisc = lineSub * (line.discount / 100);
    totalDiscount += lineDisc;
    const afterDisc = lineSub - lineDisc;
    totalTax += afterDisc * (line.tax / 100);
  });

  const grandTotal = subtotal - totalDiscount + totalTax;

  const handleNegotiate = () => {
    if (!comment) return;
    addMessage(quotation.id, {
      sender: 'Customer',
      text: comment,
      counterDiscount: counterDiscount ? parseFloat(counterDiscount) : undefined,
      lineId: selectedLineId || undefined
    });
    updateStatus(quotation.id, 'Under Negotiation');
    setComment('');
    setCounterDiscount('');
  };

  const handleConfirm = () => {
    updateStatus(quotation.id, 'Accepted');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <button onClick={() => navigate('/quotations')} className="text-[var(--color-text-secondary)] hover:text-white text-sm mb-4 inline-flex items-center gap-2">
        &larr; Back to Quotations
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-4">
            {quotation.quoteNumber}
            <span className="px-3 py-1 text-sm rounded-full bg-[var(--color-border-subtle)] font-medium">
              {quotation.status}
            </span>
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-1">Sales Rep: {quotation.salesRep} | Valid Until: {quotation.validUntil}</p>
        </div>
        {quotation.status !== 'Accepted' && quotation.status !== 'Expired' && (
          <button onClick={handleConfirm} className="bg-[var(--color-accent-green)] hover:bg-[var(--color-accent-green-hover)] text-[var(--color-bg-base)] px-6 py-2 rounded-lg font-medium transition-colors">
            Confirm Quotation
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[var(--color-border-subtle)]">
              <h2 className="font-bold">Line Items</h2>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">Select a line item to negotiate specifically.</p>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] text-sm">
                  <th className="p-4 font-medium w-8"></th>
                  <th className="p-4 font-medium">Product</th>
                  <th className="p-4 font-medium">Qty</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Disc %</th>
                  <th className="p-4 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {quotation.lines.map(line => {
                  const lineSub = line.quantity * line.unitPrice;
                  const lineDisc = lineSub * (line.discount / 100);
                  const afterDisc = lineSub - lineDisc;
                  const lineTotal = afterDisc + (afterDisc * (line.tax / 100));
                  return (
                    <tr 
                      key={line.id} 
                      onClick={() => setSelectedLineId(line.id === selectedLineId ? null : line.id)}
                      className={`border-b border-[var(--color-border-subtle)] last:border-0 cursor-pointer transition-colors ${selectedLineId === line.id ? 'bg-[var(--color-border-subtle)]' : 'hover:bg-[var(--color-border-subtle)]/50'}`}
                    >
                      <td className="p-4">
                        <input type="radio" checked={selectedLineId === line.id} readOnly className="accent-[var(--color-accent-green)]" />
                      </td>
                      <td className="p-4">{line.product}</td>
                      <td className="p-4">{line.quantity}</td>
                      <td className="p-4">${line.unitPrice.toLocaleString()}</td>
                      <td className="p-4">{line.discount}%</td>
                      <td className="p-4">${lineTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-xl p-6">
            <h2 className="font-bold mb-4">Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[var(--color-text-secondary)]"><span>Subtotal:</span> <span>${subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></div>
              <div className="flex justify-between text-[var(--color-text-secondary)]"><span>Discount:</span> <span>-${totalDiscount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></div>
              <div className="flex justify-between text-[var(--color-text-secondary)]"><span>Tax:</span> <span>${totalTax.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></div>
              <div className="border-t border-[var(--color-border-subtle)] pt-2 mt-2 flex justify-between font-bold text-lg">
                <span>Grand Total:</span> <span>${grandTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 space-y-6">
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-xl flex flex-col h-[600px]">
            <div className="p-4 border-b border-[var(--color-border-subtle)]">
              <h2 className="font-bold">Negotiation</h2>
            </div>
            
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <p className="text-sm text-[var(--color-text-secondary)] text-center mt-10">No negotiation history yet.</p>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className={`p-3 rounded-lg text-sm ${msg.sender === 'Customer' ? 'bg-[var(--color-border-subtle)] ml-4' : 'border border-[var(--color-border-subtle)] mr-4'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-xs text-[var(--color-accent-green)]">{msg.sender}</span>
                      <span className="text-[10px] text-[var(--color-text-secondary)]">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>
                    {msg.lineId && (
                      <div className="text-[10px] bg-[var(--color-bg-base)] px-2 py-1 rounded mb-2 text-[var(--color-text-secondary)]">
                        Regarding: {quotation.lines.find(l => l.id === msg.lineId)?.product}
                      </div>
                    )}
                    <p>{msg.text}</p>
                    {msg.counterDiscount !== undefined && (
                      <p className="mt-2 font-medium text-xs">Proposed Discount: {msg.counterDiscount}%</p>
                    )}
                  </div>
                ))
              )}
            </div>

            {quotation.status !== 'Accepted' && (
              <div className="p-4 border-t border-[var(--color-border-subtle)] space-y-3">
                {selectedLineId && (
                  <div className="text-xs bg-[var(--color-border-subtle)] p-2 rounded text-[var(--color-accent-green)]">
                    Negotiating: {quotation.lines.find(l => l.id === selectedLineId)?.product}
                  </div>
                )}
                <textarea 
                  className="w-full bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-lg p-2 text-sm focus:outline-none focus:border-[var(--color-accent-green)]"
                  placeholder="Enter your comment or request..."
                  rows={3}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
                <div className="flex gap-2">
                  <input 
                    type="number"
                    placeholder="Counter %"
                    className="w-1/3 bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)] rounded-lg p-2 text-sm focus:outline-none focus:border-[var(--color-accent-green)]"
                    value={counterDiscount}
                    onChange={e => setCounterDiscount(e.target.value)}
                  />
                  <button 
                    onClick={handleNegotiate}
                    className="flex-1 bg-[var(--color-border-subtle)] hover:bg-[var(--color-accent-green)] hover:text-[var(--color-bg-base)] transition-colors rounded-lg font-medium text-sm"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationDetail;
