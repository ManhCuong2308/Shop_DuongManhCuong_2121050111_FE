'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 1,
    name: 'Áo thun',
    image: '/images/categories/ao_thun.jpg',
    href: '/products?category=ao'
  },
  {
    id: 2,
    name: 'Áo sơ mi',
    image: '/images/categories/ao_somi.jpg',
    href: '/products?category=ao'
  },
  {
    id: 3,
    name: 'Quần jean',
    image: '/images/categories/jeans.jpg',
    href: '/products?category=quan'
  },
  {
    id: 4,
    name: 'Quần short',
    image: '/images/categories/shorts.jpg',
    href: '/products?category=quan'
  },
  {
    id: 5,
    name: 'Áo khoác',
    image: '/images/categories/ao_len.jpg',
    href: '/products?category=ao'
  },
  {
    id: 6,
    name: 'Phụ kiện',
    image: '/images/categories/ao_vest.jpg',
    href: '/products?category=ao'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function CategoryList() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Danh mục nổi bật</h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={item}
              className="relative group"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link href={category.href}>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 