'use client';

import { useState, useEffect } from 'react';
import { productAPI, userAPI, orderAPI } from '@/lib/api';
import {
  UsersIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Tổng số người dùng',
    value: 0,
    icon: UsersIcon,
  },
  {
    name: 'Tổng số sản phẩm',
    value: 0,
    icon: ShoppingBagIcon,
  },
  {
    name: 'Tổng doanh thu',
    value: 0,
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Đơn hàng mới',
    value: 0,
    icon: ShoppingCartIcon,
  },
];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: 0,
    newOrders: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch products
      const products = await productAPI.getAllProduct();
      const totalProducts = Array.isArray(products) ? products.length : 0;

      // Fetch users
      const users = await userAPI.getAllUsers();
      const totalUsers = Array.isArray(users) ? users.length : 0;

      // Fetch orders
      const orders = await orderAPI.getAllOrders();
      const totalOrders = Array.isArray(orders) ? orders.length : 0;
      
      // Calculate total revenue
      const totalRevenue = Array.isArray(orders) 
        ? orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)
        : 0;

      // Get new orders (orders from today)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const newOrders = Array.isArray(orders)
        ? orders.filter(order => new Date(order.createdAt) >= today).length
        : 0;

      setDashboardData({
        totalUsers,
        totalProducts,
        totalRevenue,
        newOrders,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Tổng quan</h1>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-blue-500 p-3">
                  <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {stat.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {index === 2 ? (
                    new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(dashboardData[Object.keys(dashboardData)[index]])
                  ) : (
                    dashboardData[Object.keys(dashboardData)[index]]
                  )}
                </p>
              </dd>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Hoạt động gần đây</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              <li className="px-4 py-4 sm:px-6">
                <p className="text-sm text-gray-500">Chức năng đang được phát triển...</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 