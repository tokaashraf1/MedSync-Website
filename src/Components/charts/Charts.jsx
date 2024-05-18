import React from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  BarChart,
} from "recharts";
import { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import "./charts.css";

function Charts({ patient, doctor, medications }) {
  const data = [
    { name: "Patients", value: patient },
    { name: "Doctors", value: doctor },
  ];
  return (
    <div className="row admin-charts ">
      <BarChart
        width={500}
        height={350}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={30}
        className="mt-3"
      >
        <XAxis
          dataKey="name"
          scale="point"
          padding={{ left: 80, right: 100 }}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar
          dataKey="value"
          fill="rgba(0, 74, 173, 1)"
          background={{ fill: "#eee" }}
        />
      </BarChart>

      <PieChart width={800} height={360} className="">
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="rgba(91, 217, 91, 0.86)"
          label
        />
        <Tooltip />
      </PieChart>
    </div>
  );
}

export default Charts;
