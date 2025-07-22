'use client';

export default function AlertPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans">
      <header className="bg-[#1e293b] p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">PRESSOC</h1>
        <div className="space-y-1 cursor-pointer">
          <div className="w-8 h-1 bg-white rounded"></div>
          <div className="w-8 h-1 bg-white rounded"></div>
          <div className="w-8 h-1 bg-white rounded"></div>
        </div>
      </header>

      <main className="p-6">
        <div className="bg-[#1e293b] rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-500">Alerts (Sensor Down)</h2>
          <p className="text-white">Tidak ada sensor yang down</p>
        </div>
      </main>
    </div>
  );
}