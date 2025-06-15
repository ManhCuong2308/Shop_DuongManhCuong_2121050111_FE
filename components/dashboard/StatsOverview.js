"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, ShoppingCart, Users, DollarSign } from "lucide-react";

export const StatsOverview = ({ orders, period }) => {
  const now = new Date();
  const periodStart = new Date();

  if (period === "week") {
    periodStart.setDate(now.getDate() - 7);
  } else {
    periodStart.setMonth(now.getMonth() - 1);
  }

  const periodOrders = orders.filter(
    (order) => new Date(order.date) >= periodStart
  );

  const totalRevenue = periodOrders.reduce(
    (sum, order) => sum + order.total,
    0
  );
  const totalOrders = periodOrders.length;
  const uniqueCustomers = new Set(periodOrders.map((order) => order.customerId))
    .size;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const stats = [
    {
      title: `Doanh Thu ${period === "week" ? "Tuần" : "Tháng"}`,
      value: totalRevenue.toLocaleString("vi-VN") + " đ",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Tổng Đơn Hàng",
      value: totalOrders.toString(),
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Khách Hàng",
      value: uniqueCustomers.toString(),
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Giá Trị TB/Đơn",
      value: Math.round(averageOrderValue).toLocaleString("vi-VN") + " đ",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
