'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOrder } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export default function OrderDetailPage({ params }) {
  const router = useRouter();
  const { orders, loading, fetchOrders } = useOrder();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, fetchOrders]);

  useEffect(() => {
    if (orders.length > 0) {
      const foundOrder = orders.find(o => o.id === params.id);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        toast.error('Không tìm thấy đơn hàng');
        router.push('/orders');
      }
    }
  }, [orders, params.id, router]);

  if (!user) {
    router.push('/login');
    return null;
  }

  if (loading || !order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'processing':
        return 'Đang xử lý';
      case 'shipped':
        return 'Đã gửi hàng';
      case 'delivered':
        return 'Đã giao hàng';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={() => router.push('/orders')}
          className="text-blue-600 hover:text-blue-800 mr-4"
        >
          ← Quay lại
        </button>
        <h1 className="text-3xl font-bold">Chi tiết đơn hàng #{order.id}</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-gray-600">
                Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}
              </p>
              {order.updatedAt && (
                <p className="text-gray-600">
                  Cập nhật: {new Date(order.updatedAt).toLocaleDateString('vi-VN')}
                </p>
              )}
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>

          <div className="space-y-6">
            {/* Order Items */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Sản phẩm</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={`${item.productId}-${item.size}`} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Size: {item.size}</p>
                      <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                    </div>
                    <p className="font-medium">{item.price * item.quantity}đ</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Tổng quan đơn hàng</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>Tạm tính</span>
                  <span>{order.total}đ</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Phí vận chuyển</span>
                  <span>Miễn phí</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Tổng cộng</span>
                  <span>{order.total}đ</span>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Thông tin giao hàng</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{order.shippingAddress.fullName}</p>
                <p className="text-gray-600">{order.shippingAddress.phone}</p>
                <p className="text-gray-600">
                  {order.shippingAddress.address}, {order.shippingAddress.ward}, {order.shippingAddress.district}, {order.shippingAddress.city}
                </p>
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Thông tin thanh toán</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">
                  {order.paymentMethod === 'cod' && 'Thanh toán khi nhận hàng (COD)'}
                  {order.paymentMethod === 'bank' && 'Chuyển khoản ngân hàng'}
                  {order.paymentMethod === 'momo' && 'Ví MoMo'}
                </p>
                {order.paymentMethod === 'bank' && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Thông tin chuyển khoản:</p>
                    <p className="text-sm text-gray-600">Ngân hàng: Vietcombank</p>
                    <p className="text-sm text-gray-600">Số tài khoản: 1023086856</p>
                    <p className="text-sm text-gray-600">Chủ tài khoản: DUONG MANH CUONG</p>
                    <p className="text-sm text-gray-600">Nội dung: DH{order.id}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 