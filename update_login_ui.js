const fs = require('fs');
const p = 'client/sales_manager/src/pages/Login.tsx';
let c = fs.readFileSync(p, 'utf8');

if (!c.includes('const [loginType, setLoginType]')) {
  // 1. Add state
  c = c.replace(
    "const [role, setRole] = useState('sales_rep');",
    "const [role, setRole] = useState('sales_rep');\n  const [loginType, setLoginType] = useState('head');"
  );
  
  // 2. Add toggle UI right before Email Address
  const toggleUI = `          <div className="flex bg-[#111412] p-1 rounded-xl mb-6 border border-zinc-800/80">
            <button
              type="button"
              className={\`flex-1 py-2 text-sm font-semibold rounded-lg transition-all \${loginType === 'head' ? 'bg-[#1a1f1b] text-[#81c784] shadow-md border border-zinc-700/80' : 'text-zinc-500 hover:text-zinc-300'}\`}
              onClick={() => { setLoginType('head'); setRole('sales_rep'); }}
            >
              Staff Member
            </button>
            <button
              type="button"
              className={\`flex-1 py-2 text-sm font-semibold rounded-lg transition-all \${loginType === 'customer' ? 'bg-[#1a1f1b] text-[#81c784] shadow-md border border-zinc-700/80' : 'text-zinc-500 hover:text-zinc-300'}\`}
              onClick={() => { setLoginType('customer'); setRole('customer'); }}
            >
              Customer Portal
            </button>
          </div>

          <div className="space-y-1.5">`;
          
  c = c.replace('<div className="space-y-1.5">', toggleUI);
  
  // 3. Wrap Select Role dropdown in condition
  c = c.replace(
    '<div className="space-y-1.5">\n            <label className="block text-sm font-semibold text-zinc-300">Select Role</label>',
    '{loginType === \'head\' && (\n          <div className="space-y-1.5">\n            <label className="block text-sm font-semibold text-zinc-300">Select Role</label>'
  );
  
  c = c.replace(
    '<option value="customer">Customer Portal</option>\n              </select>\n              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={18} />\n            </div>\n          </div>',
    '</select>\n              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={18} />\n            </div>\n          </div>\n          )}'
  );
  
  fs.writeFileSync(p, c);
}

['Admin', 'Finance', 'sales_rep', 'Customer'].forEach(app => {
  const dest = 'client/' + app + '/src/pages/Login.tsx';
  fs.writeFileSync(dest, c);
});
