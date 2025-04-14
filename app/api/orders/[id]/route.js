import { NextResponse } from 'next/server';

// In a real application, this would be a database
let orders = [];

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { status } = await request.json();

    // Find order
    const orderIndex = orders.findIndex(order => order.id === id);
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Không tìm thấy đơn hàng' },
        { status: 404 }
      );
    }

    // Update order status
    orders[orderIndex] = {
      ...orders[orderIndex],
      status,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(orders[orderIndex]);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Lỗi server' },
      { status: 500 }
    );
  }
} 