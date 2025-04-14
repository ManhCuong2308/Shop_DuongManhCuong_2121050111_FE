'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load orders from API on mount and when user changes
  useEffect(() => {
    if (user && user._id) {
      fetchOrders();
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      if (!user || !user._id) {
        throw new Error('Không tìm thấy thông tin người dùng');
      }

      const response = await fetch(`/api/orders?userId=${user._id}`);
      if (!response.ok) {
        throw new Error('Không thể tải danh sách đơn hàng');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Không thể tải danh sách đơn hàng');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData) => {
    try {
      if (!user || !user._id) {
        throw new Error('Không tìm thấy thông tin người dùng');
      }

      // Ensure order data has the correct structure
      const formattedOrderData = {
        userId: user._id,
        items: orderData.items.map(item => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          size: item.size,
          quantity: item.quantity
        })),
        totalAmount: orderData.totalAmount,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod,
        note: orderData.note || ''
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedOrderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Không thể tạo đơn hàng');
      }

      setOrders(prevOrders => [...prevOrders, data]);
      toast.success('Đặt hàng thành công!');
      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error(error.message);
      throw error;
    }
  };

  const getOrder = (orderId) => {
    return orders.find(order => order._id === orderId);
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      if (!user || !user._id) {
        throw new Error('Không tìm thấy thông tin người dùng');
      }

      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Không thể cập nhật trạng thái đơn hàng');
      }

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? data : order
        )
      );
      toast.success('Cập nhật trạng thái đơn hàng thành công');
      return data;
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error(error.message);
      throw error;
    }
  };

  const getOrdersByUser = (userId) => {
    return orders.filter(order => order.userId === userId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        createOrder,
        getOrder,
        updateOrderStatus,
        getOrdersByUser,
        fetchOrders
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
} 