'use client';

export default function DevicePage () {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans">
      <main className="p-6">
        <div className="bg-[#1e293b] rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Device</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Devices</th>
                  <th className="py-2 px-4">Sensors</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700 hover:bg-[#334155]">
                  <td className="py-3 px-4 flex items-center">
                    <span className="h-3 w-3 rounded-full bg-green-400 mr-2"></span>
                    Up
                  </td>
                  <td className="py-3 px-4">DESKTOP-QT2EVTR</td>
                  <td className="py-3 px-4">3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}