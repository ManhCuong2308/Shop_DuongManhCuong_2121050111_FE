'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useProducts } from '@/contexts/ProductContext';
import ProductList from '@/components/ProductList';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryList from '@/components/CategoryList';
import toast from 'react-hot-toast';

export default function Home() {
  const { products, loading } = useProducts();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({
    ao: 0,
    quan: 0,
    'phu-kien': 0
  });

  useEffect(() => {
    if (products && products.length > 0) {
      // Lấy 4 sản phẩm đầu tiên làm sản phẩm nổi bật
      setFeaturedProducts(products.slice(0, 4));
    }
  }, [products]);

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const categories = ['ao', 'quan', 'phu-kien'];
        const counts = {};
        
        for (const category of categories) {
          const response = await fetch(`http://localhost:5000/api/products?category=${category}`);
          const data = await response.json();
          counts[category] = data.total;
        }
        
        setCategoryCounts(counts);
      } catch (error) {
        console.error('Error fetching category counts:', error);
      }
    };

    fetchCategoryCounts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/banner_v2.png"
            alt="Hero"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/10 to-gray-900/10"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Thời trang giới trẻ
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Khám phá bộ sưu tập mới nhất với những thiết kế độc đáo và chất lượng cao
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/products"
                className="inline-block bg-white text-gray-900 px-8 py-4 rounded-md font-medium hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Xem bộ sưu tập
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Danh mục sản phẩm
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá các danh mục sản phẩm đa dạng của chúng tôi, từ quần áo thường ngày đến các bộ trang phục sang trọng
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Áo */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group"
            >
              <div className="relative h-64">
                <Image
                  src="/images/categories/ao_da.jpg"
                  alt="Áo"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Áo</h3>
                <p className="text-gray-600 mb-4">Bộ sưu tập áo đa dạng với nhiều phong cách khác nhau</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{categoryCounts.ao} sản phẩm</span>
                  <Link href="/categories/ao" className="text-blue-600 hover:text-blue-700 font-medium">
                    Xem thêm →
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Quần */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group"
            >
              <div className="relative h-64">
                <Image
                  src="/images/categories/quan_jean2.jpg"
                  alt="Quần"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Quần</h3>
                <p className="text-gray-600 mb-4">Quần jean, quần tây và nhiều phong cách khác</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{categoryCounts.quan} sản phẩm</span>
                  <Link href="/categories/quan" className="text-blue-600 hover:text-blue-700 font-medium">
                    Xem thêm →
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Phụ kiện */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group"
            >
              <div className="relative h-64">
                <Image
                  src="/images/products/giay_nike1.jpg"
                  alt="Phụ kiện"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Phụ kiện</h3>
                <p className="text-gray-600 mb-4">Túi xách, thắt lưng và các phụ kiện thời trang khác</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{categoryCounts['phu-kien']} sản phẩm</span>
                  <Link href="/categories/phu-kien" className="text-blue-600 hover:text-blue-700 font-medium">
                    Xem thêm →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Sản phẩm nổi bật
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá những sản phẩm được yêu thích nhất của chúng tôi
            </p>
          </motion.div>
          <FeaturedProducts products={featuredProducts} />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">
              Đăng ký nhận tin
            </h2>
            <p className="text-gray-300 mb-8">
              Đăng ký để nhận những thông tin mới nhất về sản phẩm và khuyến mãi
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-4 py-3 rounded-md text-gray-900"
              />
              <button
                type="submit"
                className="bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Đăng ký
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* All Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Tất cả sản phẩm
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá toàn bộ bộ sưu tập của chúng tôi
            </p>
          </motion.div>
          <ProductList products={products} />
        </div>
      </section>
    </div>
  );
} 