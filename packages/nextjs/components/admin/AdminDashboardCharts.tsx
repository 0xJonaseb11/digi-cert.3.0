import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Users, Clock } from "lucide-react";

const lineData = [
  {
    id: "Certificates",
    color: "#60a5fa",
    data: [
      { x: "Jan", y: 30 },
      { x: "Feb", y: 50 },
      { x: "Mar", y: 80 },
      { x: "Apr", y: 65 },
      { x: "May", y: 120 },
      { x: "Jun", y: 90 },
    ],
  },
];

const statCards = [
  {
    label: "Approved Users",
    value: 23350,
    icon: <Users className="w-5 h-5 text-blue-300 drop-shadow-glow" />,
    sub: "All time",
  },
  {
    label: "Pending Approvals",
    value: 2334,
    icon: <Clock className="w-5 h-5 text-yellow-300 drop-shadow-glow" />,
    sub: "This month",
  },
];

export default function AdminDashboardCharts() {
  return (
    <div className="w-full">
      <div className="rounded-2xl shadow-xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 flex flex-col lg:flex-row gap-8 items-stretch min-h-[320px]">
        {/* Chart */}
        <div className="flex-1 min-w-[250px] flex flex-col justify-between">
          <h3 className="font-semibold mb-2 text-blue-200">Certificates Issued Over Time</h3>
          <div className="h-48 w-full">
            <ResponsiveLine
              data={lineData}
              margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
              xScale={{ type: "point" }}
              yScale={{ type: "linear", min: "auto", max: "auto", stacked: false, reverse: false }}
              axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: "Month", legendOffset: 36, legendPosition: "middle", tickColor: "#fff", legendTextColor: "#fff" }}
              axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: "Certificates", legendOffset: -40, legendPosition: "middle", tickColor: "#fff", legendTextColor: "#fff" }}
              colors={["#60a5fa"]}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              enableArea={true}
              areaOpacity={0.25}
              areaBlendMode="normal"
              useMesh={true}
              theme={{
                axis: { ticks: { text: { fontSize: 12, fill: "#fff" } }, legend: { text: { fontSize: 14, fill: "#fff" } } },
                tooltip: { container: { fontSize: 14, background: "#1e293b", color: "#fff" } },
                grid: { line: { stroke: "#334155", strokeDasharray: "4 4" } },
              }}
              enableGridX={false}
              enableGridY={true}
              areaBaselineValue={0}
              defs={[
                {
                  id: "gradientA",
                  type: "linearGradient",
                  colors: [
                    { offset: 0, color: "#60a5fa", opacity: 0.5 },
                    { offset: 100, color: "#1e293b", opacity: 0.1 },
                  ],
                },
              ]}
              fill={[{ match: "*", id: "gradientA" }]}
              animate={true}
              motionConfig="wobbly"
            />
          </div>
        </div>
        {/* Stat Cards */}
        <div className="flex flex-col gap-6 justify-end w-full max-w-xs mx-auto lg:mx-0">
          {statCards.map(card => (
            <div key={card.label} className={`rounded-2xl shadow-xl bg-blue-800/60 flex items-center p-5 gap-4 transition hover:scale-[1.03] hover:shadow-2xl group`}>
              <div className="rounded-xl p-3 bg-blue-900 flex items-center justify-center shadow-glow">{card.icon}</div>
              <div className="flex-1">
                <div className="text-xs text-blue-200 font-medium mb-1 group-hover:text-white transition">{card.label}</div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-white group-hover:text-blue-200 transition">{card.value.toLocaleString()}</span>
                  <span className="text-xs text-blue-300 mb-1">{card.sub}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Add this to your global CSS for glowing effect:
// .drop-shadow-glow { filter: drop-shadow(0 0 8px #60a5fa); }
// .shadow-glow { box-shadow: 0 0 16px 0 #60a5fa33; } 