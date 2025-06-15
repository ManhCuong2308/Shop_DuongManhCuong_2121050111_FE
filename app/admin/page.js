"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OrdersList } from "@/components/dashboard/OrdersList";
import { CustomerDetails } from "@/components/dashboard/CustomerDetails";
import { productAPI, userAPI, orderAPI } from "@/lib/api";
import {
  UsersIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

const statsTemplate = [
  {
    name: "Tổng số người dùng",
    icon: UsersIcon,
  },
  {
    name: "Tổng số sản phẩm",
    icon: ShoppingBagIcon,
  },
  {
    name: "Tổng doanh thu",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Đơn hàng mới",
    icon: ShoppingCartIcon,
  },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: 0,
    newOrders: 0,
  });
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState(null);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(null);

  // Check if user is admin, redirect to / if not
  useEffect(() => {
    if (user && !user.isAdmin) {
      router.push("/");
    }
  }, [user, router]);

  // Fetch dashboard stats (users, products, total revenue, new orders)
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user || !user.isAdmin) return;
      setDashboardLoading(true);
      setDashboardError(null);
      try {
        // Fetch products
        const products = await productAPI.getAllProduct();
        const totalProducts = Array.isArray(products) ? products.length : 0;

        // Fetch users
        const users = await userAPI.getAllUsers();
        const totalUsers = Array.isArray(users) ? users.length : 0;

        // Fetch all orders
        const allOrders = await orderAPI.getAllOrders();
        const totalRevenue = Array.isArray(allOrders)
          ? allOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)
          : 0;

        // Get new orders (orders from today)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const newOrders = Array.isArray(allOrders)
          ? allOrders.filter((order) => new Date(order.createdAt) >= today)
              .length
          : 0;

        setDashboardData({
          totalUsers,
          totalProducts,
          totalRevenue,
          newOrders,
        });
      } catch (error) {
        setDashboardError("Failed to fetch dashboard stats. Please try again.");
        console.error("Error fetching dashboard data:", error);
      } finally {
        setDashboardLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  // Fetch orders and customers based on selected period
  useEffect(() => {
    const fetchOrdersData = async () => {
      if (!user || !user.isAdmin) return;
      setOrdersLoading(true);
      setOrdersError(null);
      try {
        const fetchFunction =
          selectedPeriod === "week"
            ? orderAPI.weekRevenue
            : orderAPI.monthRevenue;
        const data = await fetchFunction();

        // Extract customer details and create unique customer list
        const fetchedOrders = data.customerDetails || [];
        const validOrders = fetchedOrders.filter(
          (order) => order.customer && order.customer._id
        );

        if (fetchedOrders.length > validOrders.length) {
          console.warn(
            `Filtered out ${
              fetchedOrders.length - validOrders.length
            } orders with missing or invalid customer data`
          );
        }

        const uniqueCustomers = Array.from(
          new Map(
            validOrders.map((order) => [
              order.customer._id,
              {
                id: order.customer._id,
                name: order.customer.name || "Unknown",
                email: order.customer.email || "No email",
              },
            ])
          ).values()
        );

        // Transform orders to match expected structure
        const transformedOrders = validOrders.map((order) => ({
          id: order.orderId,
          customerId: order.customer._id,
          total: order.totalPrice,
          date: order.createdAt,
        }));

        setOrders(transformedOrders);
        setCustomers(uniqueCustomers);
      } catch (err) {
        setOrdersError("Failed to fetch orders data. Please try again.");
        console.error("Error fetching orders data:", err);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrdersData();
  }, [selectedPeriod, user]);

  const handleViewCustomer = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    if (customer) {
      setSelectedCustomer(customer);
    }
  };

  // Render redirecting state for non-admins or unauthenticated users
  if (!user || !user.isAdmin) {
    return <div className="text-center py-8">Redirecting...</div>;
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Tổng quan</h1>

        {/* Dashboard Stats */}
        {dashboardLoading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        {dashboardError && (
          <div className="text-red-500 text-center py-4">{dashboardError}</div>
        )}
        {!dashboardLoading && !dashboardError && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {statsTemplate.map((stat, index) => (
              <div
                key={stat.name}
                className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
              >
                <dt>
                  <div className="absolute rounded-md bg-blue-500 p-3">
                    <stat.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="ml-16 truncate text-sm font-medium text-gray-500">
                    {stat.name}
                  </p>
                </dt>
                <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">
                    {index === 2
                      ? new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(dashboardData.totalRevenue)
                      : dashboardData[Object.keys(dashboardData)[index]]}
                  </p>
                </dd>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard Doanh Thu
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedPeriod("week")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedPeriod === "week"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                Tuần
              </button>
              <button
                onClick={() => setSelectedPeriod("month")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedPeriod === "month"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                Tháng
              </button>
            </div>
          </div>

          {/* Orders Loading and Error States */}
          {ordersLoading && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          {ordersError && (
            <div className="text-red-500 text-center py-4">{ordersError}</div>
          )}

          {/* Stats Overview */}
          {!ordersLoading && !ordersError && (
            <StatsOverview orders={orders} period={selectedPeriod} />
          )}

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Biểu Đồ Doanh Thu</CardTitle>
                </CardHeader>
                <CardContent>
                  {!ordersLoading && !ordersError && (
                    <RevenueChart orders={orders} period={selectedPeriod} />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Customer Details */}
            <div className="lg:col-span-1">
              <CustomerDetails
                customer={selectedCustomer}
                orders={orders}
                onClose={() => setSelectedCustomer(null)}
              />
            </div>
          </div>

          {/* Orders List */}
          <Card>
            <CardHeader>
              <CardTitle>Danh Sách Đơn Hàng</CardTitle>
            </CardHeader>
            <CardContent>
              {!ordersLoading && !ordersError && (
                <OrdersList
                  orders={orders}
                  customers={customers}
                  onViewCustomer={handleViewCustomer}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
