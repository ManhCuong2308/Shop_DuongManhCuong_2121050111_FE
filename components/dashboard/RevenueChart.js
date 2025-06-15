"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useState } from "react";

export const RevenueChart = ({ orders, period }) => {
  const [chartType, setChartType] = useState("line");

  const generateChartData = () => {
    const now = new Date();
    const data = [];

    if (period === "week") {
      // Generate data for the last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];

        const dayOrders = orders.filter(
          (order) => new Date(order.date).toISOString().split("T")[0] === dateStr
        );

        const revenue = dayOrders.reduce((sum, order) => sum + order.total, 0);

        data.push({
          date: date.toLocaleDateString("vi-VN", {
            weekday: "short",
            day: "numeric",
          }),
          revenue: revenue,
          orders: dayOrders.length,
        });
      }
    } else {
      // Generate data for the last 4 weeks
      for (let i = 3; i >= 0; i--) {
        const startDate = new Date(now);
        startDate.setDate(now.getDate() - (i + 1) * 7);
        const endDate = new Date(now);
        endDate.setDate(now.getDate() - i * 7);

        const weekOrders = orders.filter((order) => {
          const orderDate = new Date(order.date);
          return orderDate >= startDate && orderDate < endDate;
        });

        const revenue = weekOrders.reduce((sum, order) => sum + order.total, 0);

        data.push({
          date: `Tuần ${4 - i}`,
          revenue: revenue,
          orders: weekOrders.length,
        });
      }
    }

    return data;
  };

  const chartData = generateChartData();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-blue-600">
            Doanh thu: {payload[0].value.toLocaleString("vi-VN")} đ
          </p>
          <p className="text-gray-600">Đơn hàng: {payload[0].payload.orders}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          Doanh thu {period === "week" ? "7 ngày" : "4 tuần"} qua
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType("line")}
            className={`px-3 py-1 rounded text-sm ${
              chartType === "line"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Đường
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={`px-3 py-1 rounded text-sm ${
              chartType === "bar"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Cột
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                tickFormatter={(value) => value.toLocaleString("vi-VN")}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          ) : (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                tickFormatter={(value) => value.toLocaleString("vi-VN")}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" fill="#3b82f6" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};