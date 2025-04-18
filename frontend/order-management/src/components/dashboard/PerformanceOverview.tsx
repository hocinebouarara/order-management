import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Week 1", orders: 350, confirmed: 280 },
  { name: "Week 2", orders: 420, confirmed: 350 },
  { name: "Week 3", orders: 380, confirmed: 310 },
  { name: "Week 4", orders: 450, confirmed: 380 },
  { name: "Week 5", orders: 500, confirmed: 420 },
  { name: "Week 6", orders: 470, confirmed: 400 },
  { name: "Week 7", orders: 520, confirmed: 450 },
  { name: "Week 8", orders: 580, confirmed: 490 },
  { name: "Week 9", orders: 550, confirmed: 470 },
  { name: "Week 10", orders: 600, confirmed: 510 },
  { name: "Week 11", orders: 650, confirmed: 570 },
  { name: "Week 12", orders: 700, confirmed: 620 },
];

export function PerformanceOverview() {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              border: "1px solid #e2e8f0",
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="orders"
            name="Total Orders"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
            activeDot={{ r: 8 }}
          />
          <Area
            type="monotone"
            dataKey="confirmed"
            name="Confirmed Orders"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
