import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { products } from '@/data/products';

export async function GET(request) {
  try {
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's cart from localStorage (simulate database)
    const cart = JSON.parse(localStorage.getItem(`cart_${token.sub}`) || '[]');

    // Add product details to cart items
    const cartWithDetails = cart.map(item => {
      const product = products.find(p => p.productId === item.productId);
      return {
        ...item,
        product: product || null
      };
    });

    return NextResponse.json(cartWithDetails);
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi server' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { productId, size, quantity } = await request.json();

    // Validate product
    const product = products.find(p => p.productId === productId);
    if (!product) {
      return NextResponse.json(
        { error: 'Sản phẩm không tồn tại' },
        { status: 404 }
      );
    }

    // Validate size and stock
    const sizeOption = product.sizes.find(s => s.size === size);
    if (!sizeOption) {
      return NextResponse.json(
        { error: 'Kích thước không hợp lệ' },
        { status: 400 }
      );
    }

    if (sizeOption.countInStock < quantity) {
      return NextResponse.json(
        { error: 'Số lượng sản phẩm không đủ' },
        { status: 400 }
      );
    }

    // Get current cart
    const cart = JSON.parse(localStorage.getItem(`cart_${token.sub}`) || '[]');

    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(
      item => item.productId === productId && item.size === size
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.push({
        productId,
        size,
        quantity
      });
    }

    // Save updated cart
    localStorage.setItem(`cart_${token.sub}`, JSON.stringify(cart));

    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi server' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { productId, size } = await request.json();

    // Get current cart
    const cart = JSON.parse(localStorage.getItem(`cart_${token.sub}`) || '[]');

    // Remove item
    const updatedCart = cart.filter(
      item => !(item.productId === productId && item.size === size)
    );

    // Save updated cart
    localStorage.setItem(`cart_${token.sub}`, JSON.stringify(updatedCart));

    return NextResponse.json(updatedCart);
  } catch (error) {
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
        { error: 'Không tìm thấy người dùng' },
        { status: 401 }
      );
    }

    const { productId, size, color, quantity } = await request.json();

    // Tìm sản phẩm
    const product = products.find(p => p.productId === productId);
    if (!product) {
      return NextResponse.json(
        { error: 'Không tìm thấy sản phẩm' },
        { status: 404 }
      );
    }

    // Kiểm tra size và số lượng tồn kho
    const sizeObj = product.sizes.find(s => s.size === size);
    if (!sizeObj) {
      return NextResponse.json(
        { error: 'Kích thước không hợp lệ' },
        { status: 400 }
      );
    }

    if (sizeObj.countInStock < quantity) {
      return NextResponse.json(
        { error: 'Số lượng sản phẩm trong kho không đủ' },
        { status: 400 }
      );
    }

    // Kiểm tra màu sắc và số lượng tồn kho
    const colorObj = product.colors.find(c => c.color === color);
    if (!colorObj) {
      return NextResponse.json(
        { error: 'Màu sắc không hợp lệ' },
        { status: 400 }
      );
    }

    if (colorObj.countInStock < quantity) {
      return NextResponse.json(
        { error: 'Số lượng sản phẩm trong kho không đủ' },
        { status: 400 }
      );
    }

    // Cập nhật số lượng trong giỏ hàng
    const item = carts[userId].find(
      item => item.productId === productId && item.size === size && item.color === color
    );

    if (item) {
      item.quantity = quantity;
    }

    return NextResponse.json({ items: carts[userId] });
  } catch (error) {
    return NextResponse.json(
      { error: 'Lỗi server' },
      { status: 500 }
    );
  }
} 