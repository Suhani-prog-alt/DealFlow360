// Common index.js entry point for hosting on Render or other platforms
console.log("Booting up DealFlow360 Backend...");

const { spawn } = require('child_process');

// Install backend dependencies just in case they aren't installed by the platform
console.log("Ensuring backend dependencies are installed...");
const install = spawn('npm', ['install'], { cwd: './server/sales_rep', stdio: 'inherit', shell: true });

install.on('close', () => {
  console.log("Starting the backend server...");
  // Use tsx to run the typescript backend natively
  spawn('npx', ['tsx', 'src/index.ts'], { cwd: './server/sales_rep', stdio: 'inherit', shell: true });
});
