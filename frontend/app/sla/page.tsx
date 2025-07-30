"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const dummySLAData = [
  { label: "Senin", sla: 98 },
  { label: "Selasa", sla: 96.5 },
  { label: "Rabu", sla: 97.8 },
  { label: "Kamis", sla: 94 },
  { label: "Jumat", sla: 95.6 },
  { label: "Sabtu", sla: 96.2 },
  { label: "Minggu", sla: 97 },
];

export default function SLA() {
  return (
    <div className='min-h-screen bg-[#0F1A24] text-white p-6'>
      {/* Box Rekap SLA: judul + SVG + info */}
      <div className='bg-[#15222F] rounded mb-6 p-6 flex flex-col md:flex-row items-center justify-center gap-10 relative'>
        {/* Judul pojok kiri */}
        <div className='absolute top-4 left-4 text-lg font-bold text-white'>
          Rekap SLA
        </div>

        {/* Grafik SVG */}
        <div className='relative w-[120px] h-[120px] mt-8 md:mt-0'>
          <svg width='120' height='120'>
            <circle
              cx='60'
              cy='60'
              r='50'
              stroke='#1B2D3C'
              strokeWidth='10'
              fill='none'
            />
            <circle
              cx='60'
              cy='60'
              r='50'
              stroke='#72DBC5'
              strokeWidth='10'
              fill='none'
              strokeDasharray={`${314 * 0.964} ${314 * (1 - 0.964)}`}
              strokeDashoffset='0'
              transform='rotate(-90 60 60)'
            />
            <text x='60' y='65' textAnchor='middle' fontSize='20' fill='white'>
              96.4%
            </text>
            <text
              x='60'
              y='90'
              textAnchor='middle'
              fontSize='14'
              fill='#72DBC5'
            >
              Jul
            </text>
          </svg>
        </div>

        {/* Info SLA */}
        <div className='flex flex-col items-center text-center md:items-start md:text-left'>
          <div className='mb-2'>
            <p className='text-2xl font-bold text-[#72DBC5]'>95% +</p>
            <p className='text-[#72DBC5]'>Sesuai Standar</p>
          </div>
          <select className='bg-[#1F2C3B] p-2 rounded text-sm mb-2'>
            <option>Per Minggu (1W)</option>
          </select>
          <p className='text-sm'>Periode Uptime: 1 Jul - 5 Jul 2025</p>
          <p className='text-sm'>
            Downtime Total <span className='font-bold'>3 Jam</span>
          </p>
        </div>
      </div>

      {/* Chart Tren SLA */}
      <div className='bg-[#15222F] rounded p-6'>
        <h2 className='text-lg font-semibold mb-4'>SLA Trend</h2>
        <ResponsiveContainer width='100%' height={300}>
          <AreaChart
            data={dummySLAData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id='colorSLA' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#72DBC5' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#72DBC5' stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey='label' stroke='#AAA' />
            <YAxis domain={[90, 100]} stroke='#AAA' />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2C3B",
                borderColor: "#72DBC5",
                color: "#fff",
              }}
            />
            <Legend />
            <Area
              type='monotone'
              dataKey='sla'
              stroke='#72DBC5'
              fillOpacity={1}
              fill='url(#colorSLA)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
