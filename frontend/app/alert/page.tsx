'use client';

export default function AlertPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans">
      <main className="p-6">
        <div className="bg-[#1e293b] rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-500">Alerts (Sensor Down)</h2>
          <p className="text-white">Tidak ada sensor yang down</p>
        </div>
      </main>
    </div>
  );
}