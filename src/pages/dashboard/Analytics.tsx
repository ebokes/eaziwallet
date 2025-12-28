import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import BackBtn from "../../components/common/BackBtn";
import { formatCurrency } from "../../utils/utils";

const SPENDING_DATA = [
  { day: "Mon", amount: 450, color: "#6F45E9" },
  { day: "Tue", amount: 320, color: "#6F45E9" },
  { day: "Wed", amount: 680, color: "#6F45E9" },
  { day: "Thu", amount: 240, color: "#6F45E9" },
  { day: "Fri", amount: 590, color: "#6F45E9" },
  { day: "Sat", amount: 850, color: "#6F45E9" },
  { day: "Sun", amount: 410, color: "#6F45E9" },
];

const CATEGORY_DATA = [
  { name: "Food & Drinks", value: 35, color: "#6F45E9" },
  { name: "Transport", value: 20, color: "#E05555" },
  { name: "Bills", value: 25, color: "#DDA921" },
  { name: "Others", value: 20, color: "#2A907E" },
];

const Analytics: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-primary pb-24">
      <div className="px-6 pt-6 flex flex-col gap-4">
        <BackBtn />
        <h1 className="text-B2 text-primary">Spending Analytics</h1>
      </div>

      <div className="px-6 mt-8 flex flex-col gap-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-mangolia p-4 rounded-2xl border border-lavender">
            <p className="text-R7 text-ocean-blue mb-1">Total Income</p>
            <p className="text-B5 text-indigo">{formatCurrency(12450.0)}</p>
          </div>
          <div className="bg-pale-pink/30 p-4 rounded-2xl border border-pale-pink">
            <p className="text-R7 text-jelly-bean mb-1">Total Expenses</p>
            <p className="text-B5 text-maroon">{formatCurrency(3540.0)}</p>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-primary p-6 rounded-3xl border border-light shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-B5 text-primary">Weekly Spending</h3>
            <span className="text-R7 text-secondary">Oct 21 - Oct 27</span>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SPENDING_DATA}>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#E1E3ED"
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#78838D", fontSize: 12 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-black text-white px-3 py-2 rounded-lg text-B7 shadow-lg">
                          {formatCurrency(payload[0].value as number)}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="amount" radius={[6, 6, 0, 0]} barSize={32}>
                  {SPENDING_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      fillOpacity={0.8}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-primary p-6 rounded-3xl border border-light shadow-sm">
          <h3 className="text-B5 text-primary mb-6">Category Breakdown</h3>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="h-[200px] w-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={CATEGORY_DATA}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {CATEGORY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 w-full grid grid-cols-1 gap-4">
              {CATEGORY_DATA.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-R6 text-secondary">{item.name}</span>
                  </div>
                  <span className="text-B6 text-primary">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
