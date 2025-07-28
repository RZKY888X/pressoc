'use client';

import { useEffect, useState } from 'react';
import TicketDetail from './TicketDetail';

type Ticket = {
  id: number;
  title: string;
  status: string;
  priority: string;
  sensor: string;
  assignedTo: string;
  updatedAt: string;
};

const initialTickets: Ticket[] = [
  {
    id: 1,
    title: "CPU Down - DB Server",
    status: "Open",
    priority: "Medium",
    sensor: "CPU Load",
    assignedTo: "Rauf",
    updatedAt: "2025-07-18 10:00",
  },
  {
    id: 2,
    title: "Memory Warning - App Server",
    status: "In Progress",
    priority: "High",
    sensor: "Memory Usage",
    assignedTo: "Rani",
    updatedAt: "2025-07-27 12:30",
  },
];

export default function TicketPage() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const filteredTickets = tickets.filter((ticket) => {
    const matchStatus = statusFilter ? ticket.status === statusFilter : true;
    const matchPriority = priorityFilter ? ticket.priority === priorityFilter : true;
    return matchStatus && matchPriority;
  });

  // Prevent background scroll when panel open
  useEffect(() => {
    if (selectedTicket) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedTicket]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 relative overflow-hidden">
      <h1 className="text-2xl font-bold mb-6">Ticket List</h1>

      {/* Filter */}
      {!selectedTicket && (
        <div className="mb-4 flex flex-wrap gap-4">
          <div>
            <label className="block text-sm mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-800 border border-slate-600 px-2 py-1 rounded text-white"
            >
              <option value="">All</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-slate-800 border border-slate-600 px-2 py-1 rounded text-white"
            >
              <option value="">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      )}

      {/* Overlay + Slide Panel */}
      {selectedTicket && (
        <>
          {/* Overlay - full screen, z-40 */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={() => setSelectedTicket(null)}
          />

          {/* Slide-in Panel - z-50 */}
          <div className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-slate-900 z-50 shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out">
            <TicketDetail
              ticket={selectedTicket}
              onBack={() => setSelectedTicket(null)}
              onSave={(updated) => {
                setTickets((prev) =>
                  prev.map((t) => (t.id === updated.id ? updated : t))
                );
                setSelectedTicket(null);
              }}
            />
          </div>
        </>
      )}

      {/* Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-800 text-sm">
            <th className="p-3">Title</th>
            <th className="p-3">Status</th>
            <th className="p-3">Priority</th>
            <th className="p-3">Updated</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map((ticket) => (
            <tr key={ticket.id} className="border-t border-slate-700">
              <td className="p-3">{ticket.title}</td>
              <td className="p-3">
                <span className="px-2 py-1 rounded bg-sky-700 text-xs">
                  {ticket.status}
                </span>
              </td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    ticket.priority === "High"
                      ? "bg-red-700"
                      : ticket.priority === "Medium"
                      ? "bg-yellow-600"
                      : "bg-green-700"
                  }`}
                >
                  {ticket.priority}
                </span>
              </td>
              <td className="p-3 text-sm">{ticket.updatedAt}</td>
              <td className="p-3">
                <button
                  onClick={() => setSelectedTicket(ticket)}
                  className="text-blue-400 hover:underline text-sm"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
