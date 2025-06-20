'use client';

import ProductForm from '@/components/admin/ProductForm';

export default function EditProduct({ params }) {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Sửa sản phẩm</h1>
        <ProductForm productId={params.id} />
      </div>
    </div>
  );
} 