"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, User, Mail, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CustomerDetails = ({ customer, orders, onClose }) => {
  if (!customer) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Chi Tiết Khách Hàng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            Chọn một khách hàng để xem chi tiết
          </div>
        </CardContent>
      </Card>
    );
  }

  const customerOrders = orders.filter(
    (order) => order.customerId === customer.id
  );
  const totalSpent = customerOrders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Chi Tiết Khách Hàng
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Customer Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{customer.name}</h3>
              <p className="text-sm text-gray-600">ID: {customer.id}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-gray-400" />
              <span>{customer.email}</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {customerOrders.length}
            </div>
            <div className="text-sm text-gray-600">Tổng đơn hàng</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {totalSpent.toLocaleString("vi-VN")}đ
            </div>
            <div className="text-sm text-gray-600">Tổng chi tiêu</div>
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Đơn Hàng Gần Đây
          </h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {customerOrders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-3 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-sm">#{order.id}</span>
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {new Date(order.date).toLocaleDateString("vi-VN")}
                </div>
                <div className="text-sm font-medium text-green-600">
                  {order.total.toLocaleString("vi-VN")} đ
                </div>
              </div>
            ))}
            {customerOrders.length === 0 && (
              <div className="text-sm text-gray-500 text-center py-4">
                Không có đơn hàng nào
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
