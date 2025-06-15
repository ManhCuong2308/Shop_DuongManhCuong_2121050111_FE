export const mockCustomers = [
  {
    id: "C001",
    name: "Nguyễn Văn An",
    email: "nguyenvanan@email.com",
    phone: "0901234567",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    joinDate: "2024-01-15",
  },
  {
    id: "C002",
    name: "Trần Thị Bình",
    email: "tranthibinh@email.com",
    phone: "0912345678",
    address: "456 Lê Lợi, Quận 3, TP.HCM",
    joinDate: "2024-02-20",
  },
  {
    id: "C003",
    name: "Lê Minh Cường",
    email: "leminhcuong@email.com",
    phone: "0923456789",
    address: "789 Trần Hưng Đạo, Quận 5, TP.HCM",
    joinDate: "2024-03-10",
  },
  {
    id: "C004",
    name: "Phạm Thị Dung",
    email: "phamthidung@email.com",
    phone: "0934567890",
    address: "321 Võ Văn Tần, Quận 3, TP.HCM",
    joinDate: "2024-04-05",
  },
  {
    id: "C005",
    name: "Hoàng Văn Em",
    email: "hoangvanem@email.com",
    phone: "0945678901",
    address: "654 Nguyễn Thị Minh Khai, Quận 1, TP.HCM",
    joinDate: "2024-05-12",
  },
];

export const mockOrders = [
  {
    id: "ORD001",
    customerId: "C001",
    items: [
      { id: "P001", name: "iPhone 15 Pro", price: 25000000, quantity: 1 },
      { id: "P002", name: "Ốp lưng iPhone", price: 500000, quantity: 2 },
    ],
    total: 26000000,
    status: "completed",
    orderDate: "2024-06-10T14:30:00Z",
  },
  {
    id: "ORD002",
    customerId: "C002",
    items: [
      { id: "P003", name: "Samsung Galaxy S24", price: 22000000, quantity: 1 },
      { id: "P004", name: "Tai nghe Samsung", price: 1500000, quantity: 1 },
    ],
    total: 23500000,
    status: "completed",
    orderDate: "2024-06-09T10:15:00Z",
  },
  {
    id: "ORD003",
    customerId: "C003",
    items: [
      { id: "P005", name: "MacBook Air M2", price: 28000000, quantity: 1 },
    ],
    total: 28000000,
    status: "pending",
    orderDate: "2024-06-08T16:45:00Z",
  },
  {
    id: "ORD004",
    customerId: "C001",
    items: [
      { id: "P006", name: "iPad Pro", price: 18000000, quantity: 1 },
      { id: "P007", name: "Apple Pencil", price: 3000000, quantity: 1 },
    ],
    total: 21000000,
    status: "completed",
    orderDate: "2024-06-07T11:20:00Z",
  },
  {
    id: "ORD005",
    customerId: "C004",
    items: [
      { id: "P008", name: "Xiaomi 13 Pro", price: 15000000, quantity: 1 },
      { id: "P009", name: "Sạc nhanh Xiaomi", price: 800000, quantity: 1 },
    ],
    total: 15800000,
    status: "completed",
    orderDate: "2024-06-06T09:00:00Z",
  },
  {
    id: "ORD006",
    customerId: "C005",
    items: [{ id: "P010", name: "AirPods Pro", price: 6000000, quantity: 1 }],
    total: 6000000,
    status: "cancelled",
    orderDate: "2024-06-05T13:30:00Z",
  },
  {
    id: "ORD007",
    customerId: "C002",
    items: [
      { id: "P011", name: "Dell XPS 13", price: 25000000, quantity: 1 },
      { id: "P012", name: "Chuột Dell", price: 1200000, quantity: 1 },
    ],
    total: 26200000,
    status: "completed",
    orderDate: "2024-06-04T15:10:00Z",
  },
  {
    id: "ORD008",
    customerId: "C003",
    items: [
      { id: "P013", name: "Sony WH-1000XM5", price: 8000000, quantity: 1 },
    ],
    total: 8000000,
    status: "pending",
    orderDate: "2024-06-12T12:00:00Z",
  },
  {
    id: "ORD009",
    customerId: "C001",
    items: [
      {
        id: "P014",
        name: "Apple Watch Series 9",
        price: 12000000,
        quantity: 1,
      },
    ],
    total: 12000000,
    status: "completed",
    orderDate: "2024-06-11T08:45:00Z",
  },
  {
    id: "ORD010",
    customerId: "C004",
    items: [
      { id: "P015", name: "Nintendo Switch", price: 8500000, quantity: 1 },
      { id: "P016", name: "Game Zelda", price: 1500000, quantity: 2 },
    ],
    total: 11500000,
    status: "completed",
    orderDate: "2024-06-13T17:20:00Z",
  },
];
