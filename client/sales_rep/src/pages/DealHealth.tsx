import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', won: 4000, lost: 2400, pending: 2400 },
  { name: 'Week 2', won: 3000, lost: 1398, pending: 2210 },
  { name: 'Week 3', won: 2000, lost: 9800, pending: 2290 },
  { name: 'Week 4', won: 2780, lost: 3908, pending: 2000 },
  { name: 'Week 5', won: 1890, lost: 4800, pending: 2181 },
  { name: 'Week 6', won: 2390, lost: 3800, pending: 2500 },
  { name: 'Week 7', won: 3490, lost: 4300, pending: 2100 },
];

const DealHealth = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Deal Health Analytics</h1>
        <p className="text-zinc-400">Track your win/loss velocity and pipeline health</p>
      </div>

      <div className="bg-[#1f2921] border border-zinc-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Pipeline Velocity (Revenue)</h2>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#81c784" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#81c784" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e57373" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#e57373" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111412', borderColor: '#333', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="won" stroke="#81c784" fillOpacity={1} fill="url(#colorWon)" />
              <Area type="monotone" dataKey="lost" stroke="#e57373" fillOpacity={1} fill="url(#colorLost)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DealHealth;
