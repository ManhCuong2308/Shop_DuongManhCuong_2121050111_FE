'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/20/solid';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/contexts/CartContext';
import toast from 'react-hot-toast';

export default function ProductList({ products = [] }) {
  const { addToCart } = useCart();

  const handleAddToCart = async (product) => {
    try {
      // Kiểm tra sản phẩm có size không
      if (!product.sizes || product.sizes.length === 0) {
        toast.error('Sản phẩm không có kích thước');
        return;
      }

      // Tìm size đầu tiên có sẵn
      const availableSize = product.sizes.find(size => size.countInStock > 0);
      if (!availableSize) {
        toast.error('Sản phẩm hết hàng');
        return;
      }

      // Thêm vào giỏ hàng
      await addToCart(product._id, availableSize.sizes, 1);
      toast.success('Đã thêm sản phẩm vào giỏ hàng');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Không thể thêm sản phẩm vào giỏ hàng');
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-500">
        Không có sản phẩm nào
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.productId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <Link href={`/products/${product.productId}`}>
            <div className="relative h-48 w-full">
              <Image
                src={product.image || '/placeholder.png'}
                alt={product.name || 'Product image'}
                fill
                className="object-cover"
                onError={(e) => {
                  e.target.src = '/placeholder.png';
                }}
              />
            </div>
          </Link>

          <div className="p-4">
            <Link href={`/products/${product._id}`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    className={`h-5 w-5 ${
                      index < Math.floor(product.rating || 0)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                ({product.reviewCount || 0} đánh giá)
              </span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-lg font-bold text-gray-900">
                  {product.price?.toLocaleString('vi-VN')}đ
                </span>
                {product.originalPrice && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    {product.originalPrice.toLocaleString('vi-VN')}đ
                  </span>
                )}
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={!product.sizes?.some(size => size.countInStock > 0)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-md ${
                  product.sizes?.some(size => size.countInStock > 0)
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCartIcon className="h-5 w-5" />
                <span>
                  {product.sizes?.some(size => size.countInStock > 0)
                    ? 'Thêm vào giỏ'
                    : 'Hết hàng'}
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 