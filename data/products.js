export const products = [
  {
    productId: 'P001',
    name: 'Áo thun nam basic',
    description: 'Áo thun nam basic chất liệu cotton 100%',
    price: 199000,
    originalPrice: 299000,
    category: 'tshirt',
    images: [
      '/images/products/tshirt-1.jpg',
      '/images/products/tshirt-2.jpg',
      '/images/products/tshirt-3.jpg'
    ],
    sizes: [
      { size: 'S', stock: 10 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 20 },
      { size: 'XL', stock: 5 }
    ],
    rating: 4.5,
    reviewCount: 128
  },
  {
    productId: 'P002',
    name: 'Quần jean nam slim fit',
    description: 'Quần jean nam slim fit ôm dáng thời trang',
    price: 499000,
    originalPrice: 699000,
    category: 'jeans',
    images: [
      '/images/products/jeans-1.jpg',
      '/images/products/jeans-2.jpg',
      '/images/products/jeans-3.jpg'
    ],
    sizes: [
      { size: '28', stock: 8 },
      { size: '29', stock: 12 },
      { size: '30', stock: 15 },
      { size: '31', stock: 10 }
    ],
    rating: 4.8,
    reviewCount: 256
  },
  {
    productId: 'P003',
    name: 'Áo sơ mi nam công sở',
    description: 'Áo sơ mi nam công sở phong cách hiện đại',
    price: 399000,
    originalPrice: 599000,
    category: 'shirt',
    images: [
      '/images/products/shirt-1.jpg',
      '/images/products/shirt-2.jpg',
      '/images/products/shirt-3.jpg'
    ],
    sizes: [
      { size: 'S', stock: 10 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 20 },
      { size: 'XL', stock: 5 }
    ],
    rating: 4.6,
    reviewCount: 189
  },
  {
    productId: 'P004',
    name: 'Quần short nam thể thao',
    description: 'Quần short nam thể thao thoáng mát',
    price: 299000,
    originalPrice: 399000,
    category: 'shorts',
    images: [
      '/images/products/shorts-1.jpg',
      '/images/products/shorts-2.jpg',
      '/images/products/shorts-3.jpg'
    ],
    sizes: [
      { size: 'S', stock: 10 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 20 },
      { size: 'XL', stock: 5 }
    ],
    rating: 4.3,
    reviewCount: 145
  },
  {
    productId: 'P005',
    name: 'Áo khoác nam bomber',
    description: 'Áo khoác nam bomber phong cách streetwear',
    price: 799000,
    originalPrice: 999000,
    category: 'jacket',
    images: [
      '/images/products/jacket-1.jpg',
      '/images/products/jacket-2.jpg',
      '/images/products/jacket-3.jpg'
    ],
    sizes: [
      { size: 'S', stock: 5 },
      { size: 'M', stock: 8 },
      { size: 'L', stock: 10 },
      { size: 'XL', stock: 3 }
    ],
    rating: 4.7,
    reviewCount: 98
  }
];

export const categories = [
  {
    id: 1,
    name: "Áo",
    slug: "ao",
    image: "/img/pro13.jpg"
  },
  {
    id: 2,
    name: "Quần",
    slug: "quan",
    image: "/img/pro14.jpg"
  },
  {
    id: 3,
    name: "Giày",
    slug: "giay",
    image: "/img/pro15.jpg"
  },
  {
    id: 4,
    name: "Phụ kiện",
    slug: "phu-kien",
    image: "/img/pro17.jpg"
  }
];

export const featuredProducts = products.slice(0, 4);

export const getProductById = (id) => {
  return products.find(product => product.productId === id);
};

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery)
  );
}; 