const fs = require('fs');

['Admin', 'Finance', 'sales_manager', 'sales_rep', 'Customer'].forEach(app => {
  const p = 'client/' + app + '/src/pages/Login.tsx';
  if (!fs.existsSync(p)) return;
  
  let c = fs.readFileSync(p, 'utf8');
  
  // Add Customer to portMap
  c = c.replace("'sales_manager': '5176'", "'sales_manager': '5176',\n          'customer': '5177'");
  
  // Add Customer to dropdown
  if (!c.includes('value="customer"')) {
    c = c.replace('<option value="admin">System Admin</option>', '<option value="admin">System Admin</option>\n                <option value="customer">Customer Portal</option>');
  }
  
  fs.writeFileSync(p, c);
});
