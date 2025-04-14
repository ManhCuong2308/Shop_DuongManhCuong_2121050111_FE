'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useOrder } from '@/contexts/OrderContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Thông tin thanh toán
const PAYMENT_INFO = {
  bank: {
    bankName: 'Vietcombank',
    accountNumber: '1023086856',
    accountName: 'DUONG MANH CUONG',
    branch: 'Chi nhánh Hà Nội',
    content: 'Thanh toan don hang',
    qrCodeImage: '/images/qrcode.jpg'
  },
  momo: {
    phoneNumber: '0987387569',
    accountName: 'DUONG MANH CUONG',
    content: 'Thanh toan don hang'
  }
};

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { cart, getCartTotal, clearCart } = useCart();
  const { createOrder } = useOrder();
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    province: '',
    district: '',
    ward: '',
    note: '',
    paymentMethod: 'cod'
  });

  // Fetch provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('https://provinces.open-api.vn/api/p/');
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
        toast.error('Không thể tải danh sách tỉnh/thành phố');
      }
    };

    fetchProvinces();
  }, []);

  // Fetch districts when province changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (formData.province) {
        try {
          const response = await fetch(`https://provinces.open-api.vn/api/p/${formData.province}?depth=2`);
          const data = await response.json();
          setDistricts(data.districts || []);
          setFormData(prev => ({ ...prev, district: '', ward: '' }));
        } catch (error) {
          console.error('Error fetching districts:', error);
          toast.error('Không thể tải danh sách quận/huyện');
        }
      } else {
        setDistricts([]);
      }
    };

    fetchDistricts();
  }, [formData.province]);

  // Fetch wards when district changes
  useEffect(() => {
    const fetchWards = async () => {
      if (formData.district) {
        try {
          const response = await fetch(`https://provinces.open-api.vn/api/d/${formData.district}?depth=2`);
          const data = await response.json();
          setWards(data.wards || []);
          setFormData(prev => ({ ...prev, ward: '' }));
        } catch (error) {
          console.error('Error fetching wards:', error);
          toast.error('Không thể tải danh sách phường/xã');
        }
      } else {
        setWards([]);
      }
    };

    fetchWards();
  }, [formData.district]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        userId: user._id,
        items: cart,
        totalAmount: getCartTotal(),
        shippingAddress: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          province: formData.province,
          district: formData.district,
          ward: formData.ward
        },
        paymentMethod: formData.paymentMethod,
        note: formData.note
      };

      await createOrder(orderData);
      clearCart();
      toast.success('Đặt hàng thành công!');
      router.push('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Không thể tạo đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Giỏ hàng trống</h1>
          <p className="text-gray-600 mb-4">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <button
            onClick={() => router.push('/products')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-center mb-8">Thanh toán</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form thông tin giao hàng */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Thông tin giao hàng</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tỉnh/Thành phố
                    </label>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Chọn Tỉnh/Thành phố</option>
                      {provinces.map(province => (
                        <option key={province.code} value={province.code}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quận/Huyện
                    </label>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      disabled={!formData.province}
                    >
                      <option value="">Chọn Quận/Huyện</option>
                      {districts.map(district => (
                        <option key={district.code} value={district.code}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phường/Xã
                    </label>
                    <select
                      name="ward"
                      value={formData.ward}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      disabled={!formData.district}
                    >
                      <option value="">Chọn Phường/Xã</option>
                      {wards.map(ward => (
                        <option key={ward.code} value={ward.code}>
                          {ward.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Địa chỉ cụ thể
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ghi chú
                    </label>
                    <textarea
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Phương thức thanh toán
                    </label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                      <option value="bank">Chuyển khoản ngân hàng</option>
                      <option value="momo">Ví MoMo</option>
                    </select>

                    {/* Thông tin chuyển khoản */}
                    {formData.paymentMethod === 'bank' && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-md">
                        <h3 className="font-medium mb-2">Thông tin chuyển khoản</h3>
                        <div className="flex flex-col md:flex-row md:space-x-6">
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Ngân hàng:</span> {PAYMENT_INFO.bank.bankName}</p>
                            <p><span className="font-medium">Số tài khoản:</span> {PAYMENT_INFO.bank.accountNumber}</p>
                            <p><span className="font-medium">Tên tài khoản:</span> {PAYMENT_INFO.bank.accountName}</p>
                            <p><span className="font-medium">Chi nhánh:</span> {PAYMENT_INFO.bank.branch}</p>
                            <p><span className="font-medium">Nội dung:</span> {PAYMENT_INFO.bank.content}</p>
                          </div>
                          <div className="mt-4 md:mt-0 flex justify-center">
                            <div className="relative w-48 h-48 md:w-64 md:h-64">
                              <Image 
                                src={PAYMENT_INFO.bank.qrCodeImage}
                                alt="QR Code Thanh Toán"
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {formData.paymentMethod === 'momo' && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-md">
                        <h3 className="font-medium mb-2">Thông tin chuyển khoản MoMo</h3>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Số điện thoại:</span> {PAYMENT_INFO.momo.phoneNumber}</p>
                          <p><span className="font-medium">Tên tài khoản:</span> {PAYMENT_INFO.momo.accountName}</p>
                          <p><span className="font-medium">Nội dung:</span> {PAYMENT_INFO.momo.content}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors duration-300"
                  >
                    {loading ? 'Đang xử lý...' : 'Đặt hàng'}
                  </button>
                </form>
              </div>
            </div>

            {/* Tổng quan đơn hàng */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-6">Tổng quan đơn hàng</h2>
                
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item._id} className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16">
                          <Image
                            src={item.image.startsWith('/') ? item.image : `/${item.image}`}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">{item.price.toLocaleString('vi-VN')}đ</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 my-4"></div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính</span>
                    <span>{getCartTotal().toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span>Miễn phí</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Tổng cộng</span>
                    <span>{getCartTotal().toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 