'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useProducts } from '@/contexts/ProductContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function CartModal({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
  const { products } = useProducts();
  const router = useRouter();

  const handleQuantityChange = async (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    await updateQuantity(productId, size, newQuantity);
  };

  const handleRemoveItem = async (productId, size) => {
    await removeFromCart(productId, size);
  };

  const getProduct = (productId) => {
    return products.find(p => p._id === productId);
  };

  const handleCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Giỏ hàng ({getCartCount()} sản phẩm)
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={onClose}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Đóng giỏ hàng</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cart?.map((item) => {
                              const product = getProduct(item._id);
                              if (!product) return null;

                              return (
                                <li key={`${item._id}-${item.size}`} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Image
                                      src={product.image? product.image : '/placeholder.png'}
                                      alt={product.name}
                                      width={96}
                                      height={96}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link href={`/products/${product._id}`}>
                                            {product.name}
                                          </Link>
                                        </h3>
                                        <p className="ml-4">
                                          {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                          }).format(product.price)}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        Kích thước: {item.size}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center space-x-2">
                                        <button
                                          onClick={() => handleQuantityChange(item._id, item.size, item.quantity - 1)}
                                          className="px-2 py-1 border rounded hover:bg-gray-100"
                                        >
                                          -
                                        </button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <button
                                          onClick={() => handleQuantityChange(item._id, item.size, item.quantity + 1)}
                                          className="px-2 py-1 border rounded hover:bg-gray-100"
                                        >
                                          +
                                        </button>
                                      </div>
                                      <div className="flex">
                                        <button
                                          type="button"
                                          onClick={() => handleRemoveItem(item._id, item.size)}
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Xóa
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Tổng tiền</p>
                        <p>
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(getCartTotal())}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Phí vận chuyển và thuế được tính khi thanh toán.
                      </p>
                      <div className="mt-6">
                        <button
                          onClick={handleCheckout}
                          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Thanh toán
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          hoặc{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={onClose}
                          >
                            Tiếp tục mua sắm
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 