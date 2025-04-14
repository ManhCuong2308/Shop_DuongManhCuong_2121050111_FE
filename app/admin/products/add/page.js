'use client';

import ProductForm from '@/components/admin/ProductForm';

export default function AddProduct() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Thêm sản phẩm mới</h1>
        <ProductForm />
      </div>
    </div>
  );
} 