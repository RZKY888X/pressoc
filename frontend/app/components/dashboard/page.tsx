"use client";

import { useEffect, useState } from "react";
import Card from "@/app/components/dashboard/Card";
import SensorChart from "@/app/components/dashboard/SensorChart";
import DeviceTable from "@/app/components/dashboard/DeviceTable";
import LogActivity from "@/app/components/dashboard/LogActivity";
import { LogItem, SensorData } from "@/app/lib/types";

export default function DashboardPages() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [websiteLogs, setWebsiteLogs] = useState<LogItem[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await fetch("http://localhost:5000/api/logs");
      const data: LogItem[] = await res.json();
      setLogs(data);
    };

    const fetchWebsiteLogs = async () => {
      const res = await fetch("http://localhost:5000/api/website_logs");
      const data: LogItem[] = await res.json();
      setWebsiteLogs(data);
    };

    fetchLogs();
    fetchWebsiteLogs();
    const interval = setInterval(() => {
      fetchLogs();
      fetchWebsiteLogs();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const allLogs = [...logs, ...websiteLogs];
  const normal = allLogs.filter((log) => log.status === "Up").length;
  const warning = allLogs.filter((log) => log.status === "Warning").length;
  const critical = allLogs.filter((log) => log.status === "Down").length;
  const total = allLogs.length;

  const groupByDevice = allLogs.reduce<Record<string, LogItem[]>>(
    (acc, log) => {
      acc[log.device] = acc[log.device] || [];
      acc[log.device].push(log);
      return acc;
    },
    {}
  );

  const parseSensorData = (data: LogItem[]): SensorData[] =>
    data.map((sensor) => ({
      name: sensor.sensor,
      value:
        parseFloat(sensor.lastvalue_raw) || parseFloat(sensor.lastvalue) || 0,
      unit: sensor.lastvalue?.replace(/[0-9., ]/g, "") || "",
    }));

  const desktopSensorData = parseSensorData(logs);
  const websiteSensorData = parseSensorData(websiteLogs);

  const recentLogs = allLogs
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, 10);

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <Card title='Normal' icon='✅' value={normal} />
        <Card title='Warning' icon='⚠️' value={warning} />
        <Card title='Critical' icon='❌' value={critical} />
        <Card title='Total Sensor' icon='📡' value={total} />
      </div>

      <div className='bg-[#1B263B] p-4 rounded mb-6'>
        <h2 className='text-lg font-semibold mb-4'>Sensor Value Trends</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <SensorChart
            title='Total Device'
            data={Object.entries(groupByDevice).map(([device, sensors]) => ({
              name: device,
              value: sensors.length,
              unit: "",
            }))}
          />
          <SensorChart title='DESKTOP-OT2EVTR' data={desktopSensorData} />
          <SensorChart title='Website Monitor' data={websiteSensorData} />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <DeviceTable deviceMap={groupByDevice} />

        <div className='bg-[#1B263B] p-4 rounded'>
          <h2 className='text-lg font-semibold mb-2'>Sensor Detail</h2>
          <div className='flex justify-between text-sm font-bold border-b border-gray-700 pb-1'>
            <span>Type</span>
            <span>Last Value</span>
          </div>
          {[...logs.slice(0, 5), ...websiteLogs.slice(0, 5)].map(
            (sensor, index) => (
              <div
                key={`${sensor.objid}-${index}`}
                className='flex justify-between text-sm py-1 border-b border-gray-700'
              >
                <span>{sensor.sensor}</span>
                <span>{sensor.lastvalue}</span>
              </div>
            )
          )}
        </div>
      </div>

      <LogActivity recentLogs={recentLogs} />
    </div>
  );
}
