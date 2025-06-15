const BASE_URL = "http://localhost:5000";

const apiCall = async (endpoint, method = "GET", body = null) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

export const productAPI = {
  getAllProducts: (params = "") =>
    apiCall(`/api/products${params ? `?${params}` : ""}`),
  getAllProduct: () => apiCall(`/api/products/get-all`),
  getFeaturedProducts: () => apiCall("/api/products/featured"),
  getProductById: (id) => apiCall(`/api/products/${id}`),
  createProductReview: (productId, review) =>
    apiCall(`/api/products/${productId}/reviews`, "POST", review),
  createProduct: (productData) =>
    apiCall("/api/admin/products", "POST", productData),
  updateProduct: (productId, productData) =>
    apiCall(`/api/admin/products/${productId}`, "PUT", productData),
  deleteProduct: (productId) =>
    apiCall(`/api/admin/products/${productId}`, "DELETE"),
};

export const userAPI = {
  login: (credentials) => apiCall("/api/users/login", "POST", credentials),
  register: async (userData) => {
    const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: "user", // Default role for new users
      }),
    });
    return response.json();
  },
  getProfile: () => apiCall("/api/users/profile", "GET"),
  updateProfile: (userData) => apiCall("/api/users/profile", "PUT", userData),
  getAllUsers: () => apiCall("/api/users", "GET"),
  updateUser: (userId, userData) =>
    apiCall(`/api/users/${userId}`, "PUT", userData),
  deleteUser: (userId) => apiCall(`/api/users/${userId}`, "DELETE"),
};

export const orderAPI = {
  createOrder: (orderData) => apiCall("/api/orders", "POST", orderData),
  getMyOrders: () => apiCall("/api/orders/myorders", "GET"),
  getOrderById: (id) => apiCall(`/api/orders/${id}`, "GET"),
  updateOrderToPaid: (orderId, paymentResult) =>
    apiCall(`/api/orders/${orderId}/pay`, "PUT", paymentResult),
  getAllOrders: () => apiCall("/api/orders", "GET"),
  updateOrderStatus: (orderId, status) =>
    apiCall(`/api/orders/${orderId}/status`, "PUT", { status }),
  monthRevenue: () => apiCall("/api/orders/revenue/month", "GET"),
  weekRevenue: () => apiCall("/api/orders/revenue/week", "GET"),
};
