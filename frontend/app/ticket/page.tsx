'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Data Ticket Dummy
const ticketData = [
  {
    title: "CPU Down - DB Server",
    status: "Open",
    priority: "Medium",
    sensor: "CPU Load",
    assignedTo: "Unassigned",
    lastUpdate: "2 Menit Lalu",
    downtimeMinutes: 900 // 15 jam
  },
  {
    title: "SLA Violation - Network Switch",
    status: "Resolved",
    priority: "High",
    sensor: "Packet Loss",
    assignedTo: "Dimas",
    lastUpdate: "30 Menit Lalu",
    downtimeMinutes: 600 // 10 jam
  },
  {
    title: "High Ping - Firewall",
    status: "Resolved",
    priority: "Low",
    sensor: "Ping",
    assignedTo: "Rauf",
    lastUpdate: "1 Jam Lalu",
    downtimeMinutes: 300 // 5 jam
  }
];

// Perhitungan SLA
const totalMinutesInJuly = 31 * 24 * 60; // 44.640 menit
const totalDowntime = ticketData.reduce((acc, curr) => acc + curr.downtimeMinutes, 0);
const uptimePercentage = ((totalMinutesInJuly - totalDowntime) / totalMinutesInJuly) * 100;

// Data Pie Chart
const slaData = [
  { name: 'Uptime', value: parseFloat(uptimePercentage.toFixed(2)) },
  { name: 'Downtime', value: parseFloat((100 - uptimePercentage).toFixed(2)) }
];
const COLORS = ['#34d399', '#1e293b'];

export default function SLAAndTicketPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans">
      <main className="p-6 space-y-6">

        {/* SLA Card */}
        <div className="bg-[#1e293b] rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold">Rekap SLA</h2>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-x-20">
            <div className="flex flex-col items-center relative">
              <div className="h-40 w-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={slaData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {slaData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-lg font-bold">Juli</p>
                <p className="text-xl">{uptimePercentage.toFixed(2)}%</p>
              </div>
            </div>

            <div className="flex flex-col items-end space-y-2 mt-4 lg:mt-0">
              <p className="text-xl">95% +</p>
              <p className={`font-semibold ${
                uptimePercentage >= 95 ? 'text-green-400' : 'text-red-400'
              }`}>
                {uptimePercentage >= 95 ? 'Sesuai Standar' : 'Tidak Sesuai Standar'}
              </p>
              <div className="w-full lg:w-auto">
                <label className="block text-sm mb-1">Uptime</label>
                <select className="bg-[#0f172a] border border-gray-700 rounded-md p-2 w-full">
                  <option>Juli</option>
                  <option>Juni</option>
                  <option>Mei</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Status Box */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#1e293b] rounded-md p-4 text-center">
            <p>Open</p>
            <p className="text-2xl font-bold">{ticketData.filter(t => t.status === 'Open').length}</p>
          </div>
          <div className="bg-[#1e293b] rounded-md p-4 text-center">
            <p>In Progress</p>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="bg-[#1e293b] rounded-md p-4 text-center">
            <p>Resolved</p>
            <p className="text-2xl font-bold">{ticketData.filter(t => t.status === 'Resolved').length}</p>
          </div>
        </div>

        {/* Ticket List */}
        <div className="bg-[#1e293b] rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Ticket List</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="py-2 px-4">Title</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Priority</th>
                  <th className="py-2 px-4">Sensor</th>
                  <th className="py-2 px-4">Assigned To</th>
                  <th className="py-2 px-4">Last Update</th>
                  <th className="py-2 px-4">Downtime (Menit)</th>
                </tr>
              </thead>
              <tbody>
                {ticketData.map((ticket, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-3 px-4">{ticket.title}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-md ${
                        ticket.status === 'Open' ? 'bg-red-800' : 'bg-green-800'
                      }`}>{ticket.status}</span>
                    </td>
                    <td className={`py-3 px-4 ${
                      ticket.priority === 'High' ? 'text-red-400'
                        : ticket.priority === 'Medium' ? 'text-yellow-400'
                        : 'text-green-400'
                    }`}>{ticket.priority}</td>
                    <td className="py-3 px-4">{ticket.sensor}</td>
                    <td className="py-3 px-4">{ticket.assignedTo}</td>
                    <td className="py-3 px-4">{ticket.lastUpdate}</td>
                    <td className="py-3 px-4">{ticket.downtimeMinutes} Menit</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}