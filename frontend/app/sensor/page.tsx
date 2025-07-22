'use client';

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  { time: '14:15:00', Ping: 50, HTTP: 650, CPU: 83 },
  { time: '14:20:00', Ping: 60, HTTP: 1200, CPU: 84 },
  { time: '14:25:00', Ping: 45, HTTP: 850, CPU: 85 },
  { time: '14:30:00', Ping: 52, HTTP: 950, CPU: 84 },
  { time: '14:35:00', Ping: 55, HTTP: 1750, CPU: 84 }
];


export default function SensorPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans">
      <main className="p-6">
        <div className="bg-[#1e293b] rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Sensor</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Ping" stroke="#10b981" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="HTTP" stroke="#3b82f6" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="CPU" stroke="#facc15" dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6">
            <div className="flex bg-[#0f172a] px-4 py-2 rounded-t-md font-semibold text-gray-400">
              <div className="w-1/2">Type</div>
              <div className="w-1/2">Last Value</div>
            </div>
            <div className="flex bg-[#0f172a] px-4 py-3 border-t border-gray-700">
              <div className="w-1/2">Ping v2</div>
              <div className="w-1/2">0 msec</div>
            </div>
            <div className="flex bg-[#0f172a] px-4 py-3 border-t border-gray-700">
              <div className="w-1/2">Http v2</div>
              <div className="w-1/2">877 msec</div>
            </div>
            <div className="flex bg-[#0f172a] px-4 py-3 border-t border-gray-700 rounded-b-md">
              <div className="w-1/2">CPU Load</div>
              <div className="w-1/2">84%</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}