import { NextResponse } from 'next/server';
import { categories } from '@/data/categories';

export async function GET() {
  try {
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi server' },
      { status: 500 }
    );
  }
} 