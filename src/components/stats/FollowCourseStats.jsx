import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

function FollowCourseStats({ data }) {
  const courseData = Object.keys(data).map((key) => ({
    name: key,
    value: data[key],
  }));

  return (
    <BarChart
      width={400}
      height={250}
      data={courseData}
      margin={{
        top: 7,
        right: 40,
        left: 40,
        bottom: 7,
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
}
export default FollowCourseStats;
