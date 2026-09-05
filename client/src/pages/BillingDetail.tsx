import React from 'react';

const BillingDetail = () => {
  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Billing Settings & Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Manage global billing configurations and taxes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#141414] border border-[#222] rounded-lg p-6">
          <h4 className="text-white text-sm font-semibold mb-6">Default Tax Configurations</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-[#222]">
              <div>
                <p className="text-sm font-medium text-gray-300">Standard VAT (US)</p>
                <p className="text-xs text-gray-500">Applied to domestic physical products</p>
              </div>
              <span className="text-[#e87040] font-medium">8.5%</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-[#222]">
              <div>
                <p className="text-sm font-medium text-gray-300">Software Services (B2B)</p>
                <p className="text-xs text-gray-500">Applied to SaaS subscriptions</p>
              </div>
              <span className="text-[#e87040] font-medium">0%</span>
            </div>
            <div className="pt-2">
              <button className="text-sm text-[#4d6a45] hover:text-[#5b7c52] transition-colors">+ Add new tax rule</button>
            </div>
          </div>
        </div>

        <div className="bg-[#141414] border border-[#222] rounded-lg p-6">
          <h4 className="text-white text-sm font-semibold mb-6">Payment Gateways</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-[#222]">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-[#635BFF] font-bold text-xs">Stripe</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">Stripe Global</p>
                  <p className="text-xs text-gray-500">Primary card processor</p>
                </div>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#4d6a45]/10 text-[#4d6a45]">Active</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-[#222]">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
                  <span className="text-blue-900 font-bold text-xs">Pay</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">PayPal Business</p>
                  <p className="text-xs text-gray-500">Alternative checkout</p>
                </div>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#4d6a45]/10 text-[#4d6a45]">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingDetail;
