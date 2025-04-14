import { NextResponse } from 'next/server';
import { products } from '@/data/products';

// In a real application, this would be a database
let orders = [];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Thiếu thông tin người dùng' },
        { status: 400 }
      );
    }

    // Get orders for user
    const userOrders = orders.filter(order => order.userId === userId);

    return NextResponse.json(userOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Lỗi server' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const orderData = await request.json();

    // Validate input
    if ( !orderData.items || !orderData.shippingAddress) {
      return NextResponse.json(
        { error: 'Thiếu thông tin đơn hàng' },
        { status: 400 }
      );
    }

    // Create new order
    const newOrder = {
      _id: `ORD${Date.now()}`,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Add order to array (in real app, this would be saved to database)
    orders.push(newOrder);

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Lỗi server' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const userId = request.headers.get('user-id');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { orderId, status } = await request.json();

    const order = orders.find(o => o._id === orderId && o.userId === userId);
    if (!order) {
      return NextResponse.json(
        { error: 'Không tìm thấy đơn hàng' },
        { status: 404 }
      );
    }

    order.status = status;
    order.updatedAt = new Date().toISOString();

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi server' },
      { status: 500 }
    );
  }
} 