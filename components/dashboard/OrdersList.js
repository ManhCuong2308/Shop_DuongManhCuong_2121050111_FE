"use client";

import { useState } from "react";
import { Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const OrdersList = ({ orders, customers, onViewCustomer }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const getCustomerName = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    return customer ? customer.name : "Khách hàng không xác định";
  };

  const filteredOrders = orders.filter((order) => {
    const customerName = getCustomerName(order.customerId);
    const matchesSearch =
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm theo tên khách hàng hoặc mã đơn hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                Mã ĐH
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                Khách hàng
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                Ngày đặt
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                Tổng tiền
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  #{order.id}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {getCustomerName(order.customerId)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {new Date(order.date).toLocaleString("vi-VN")}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-green-600">
                  {order.total.toLocaleString("vi-VN")} đ
                </td>
                <td className="px-4 py-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewCustomer(order.customerId)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    Xem KH
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Không tìm thấy đơn hàng nào phù hợp
        </div>
      )}
    </div>
  );
};
