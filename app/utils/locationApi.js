// API endpoint cho dữ liệu tỉnh thành
const PROVINCE_API = 'https://provinces.open-api.vn/api/p/';
const DISTRICT_API = 'https://provinces.open-api.vn/api/d/';
const WARD_API = 'https://provinces.open-api.vn/api/w/';

// Thông tin chuyển khoản
export const PAYMENT_INFO = {
  bank: {
    bankName: 'Vietcombank',
    accountNumber: '123456789',
    accountName: 'NGUYEN VAN A',
    branch: 'Chi nhánh Hà Nội',
    content: 'Thanh toan don hang'
  },
  momo: {
    phoneNumber: '0123456789',
    accountName: 'NGUYEN VAN A',
    content: 'Thanh toan don hang'
  }
};

// Hàm lấy danh sách tỉnh thành
export const getProvinces = async () => {
  try {
    const response = await fetch(PROVINCE_API);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return [];
  }
};

// Hàm lấy danh sách quận huyện theo tỉnh
export const getDistricts = async (provinceCode) => {
  try {
    const response = await fetch(`${DISTRICT_API}?parent_code=${provinceCode}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching districts:', error);
    return [];
  }
};

// Hàm lấy danh sách phường xã theo quận huyện
export const getWards = async (districtCode) => {
  try {
    const response = await fetch(`${WARD_API}?parent_code=${districtCode}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching wards:', error);
    return [];
  }
}; 