import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./VaccinationStatusChart.css"; // Import CSS for styling

const VaccinationStatusChart = () => {
  // Example data for the chart
  const data = [
    { name: "Vaccinated", value: 70 }, // 70% vaccinated
    { name: "Not Vaccinated", value: 30 }, // 30% not vaccinated
  ];

  // Colors for the chart sections
  const COLORS = ["#4CAF50", "#FF5252"]; // Green for vaccinated, Red for not vaccinated

  return (
    <div className="chart-container">
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default VaccinationStatusChart;
