"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OrdersList } from "@/components/dashboard/OrdersList";
import { CustomerDetails } from "@/components/dashboard/CustomerDetails";
import { orderAPI } from "@/lib/api";
import { useRouter } from "next/navigation";

function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is admin, redirect to / if not
  useEffect(() => {
    if (user && !user.isAdmin) {
      router.push("/");
    }
  }, [user, router]);
  // Fetch data based on selected period
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchFunction =
          selectedPeriod === "week"
            ? orderAPI.weekRevenue
            : orderAPI.monthRevenue;
        const data = await fetchFunction();

        // Extract customer details and create unique customer list
        const fetchedOrders = data.customerDetails || [];
        const uniqueCustomers = Array.from(
          new Map(
            fetchedOrders.map((order) => [
              order.customer._id,
              {
                id: order.customer._id,
                name: order.customer.name,
                email: order.customer.email,
              },
            ])
          ).values()
        );

        // Transform orders to match expected structure
        const transformedOrders = fetchedOrders.map((order) => ({
          id: order.orderId,
          customerId: order.customer._id,
          total: order.totalPrice,
          date: order.createdAt,
        }));

        setOrders(transformedOrders);
        setCustomers(uniqueCustomers);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPeriod]);

  const handleViewCustomer = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    if (customer) {
      setSelectedCustomer(customer);
    }
  };

  return (
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

        {/* Loading and Error States */}
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {/* Stats Overview */}
        {!loading && !error && (
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
                {!loading && !error && (
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
            {!loading && !error && (
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
  );
}

export default DashboardPage;
