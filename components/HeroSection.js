'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative bg-gray-900 h-[500px]">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="/img/hero.jpg"
          alt="Hero background"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Thời trang nam
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Khám phá bộ sưu tập thời trang nam mới nhất với các thiết kế độc đáo và chất lượng cao.
          </p>
          <div className="mt-10">
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
            >
              Mua sắm ngay
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 