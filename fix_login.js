const fs = require('fs');

const loginUpdate = `
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const roleParam = urlParams.get('role');
    if (token) {
      localStorage.setItem('jwt_token', token);
      window.history.replaceState({}, document.title, window.location.pathname);
      onLogin(roleParam || 'user');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {`;

['Admin', 'Finance', 'sales_manager', 'sales_rep'].forEach(app => {
  const p = 'client/' + app + '/src/pages/Login.tsx';
  let c = fs.readFileSync(p, 'utf8');
  
  if (!c.includes('useEffect(() => {')) {
    c = c.replace("import React, { useState } from 'react';", "import React, { useState, useEffect } from 'react';");
    c = c.replace('const handleSubmit = async (e: React.FormEvent) => {', loginUpdate);
    c = c.replace(/window\.location\.href = `http:\/\/localhost:\$\{targetPort\}`;/g, 'window.location.href = `http://localhost:${targetPort}/?token=${data.token}&role=${role}`;');
    fs.writeFileSync(p, c);
  }
});
