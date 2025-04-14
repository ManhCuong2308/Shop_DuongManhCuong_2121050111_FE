import { NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function GET(request, { params }) {
  try {
    const product = products.find(p => p.productId === params.id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Không tìm thấy sản phẩm' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi server' },
      { status: 500 }
    );
  }
} 