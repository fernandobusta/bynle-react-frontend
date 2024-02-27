import React from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

function FollowYearStats({ data }) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  const yearData = Object.keys(data).map((key) => ({
    name: key,
    value: data[key],
  }));

  return (
    <PieChart width={300} height={300}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={yearData}
        cx={150}
        cy={100}
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {yearData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
export default FollowYearStats;
