import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {
  //Function to alternate colors
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white shadow-md rounded-lg p-3 border border-gray-300 min-w-[180px]">
          {/* For Income: show month, amount, source */}
          {item.month && (
            <p className="text-xs font-semibold text-purple-800 mb-1">{item.month}</p>
          )}
          {item.category && (
            <p className="text-xs font-semibold text-purple-800 mb-1">{item.category}</p>
          )}
          <p className="text-sm text-gray-600 mb-1">
            Amount: <span className="text-sm font-medium text-gray-900">${item.amount}</span>
          </p>
          {item.source && (
            <p className="text-xs text-gray-500">Source: {item.source}</p>
          )}
        </div>
      );
    }
    return null;
  };
  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />

          <XAxis
            dataKey="amount"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />

          <Tooltip content={CustomTooltip} />

          <Bar
            dataKey="amount"
            fill="#FF8042"
            radius={[10, 10, 0, 0]}
            activeDot={{ fill: "green" }}
          >
            {data && data.map((entry, index) => (
              <Cell key={ index } fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
