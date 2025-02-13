import axios from 'axios';

const API_URL = 'http://localhost:8080';

// Configure axios defaults
axios.defaults.baseURL = API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Add response interceptor for better error handling
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    if (error.response?.status === 401) {
      return Promise.reject({
        response: {
          data: {
            error: 'Invalid credentials. Please check your email and password.'
          }
        }
      });
    }

    if (error.response?.data?.error) {
      return Promise.reject(error);
    }

    return Promise.reject({
      response: {
        data: {
          error: 'An unexpected error occurred. Please try again later.'
        }
      }
    });
  }
);

export const loginVendor = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/vendor/login`, credentials);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Login failed'
    };
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile/details`);
    console.log("in user fetchuserprofile apijs", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to fetch profile'
    };
  }
};

export const fetchVendorProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile/details`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to fetch profile'
    };
  }
};

export const fetchAdminProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile/details`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to fetch profile'
    };
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/bookings`, bookingData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to create booking'
    };
  }
};

export const fetchUserBookings = async () => {
  try {
    const response = await axios.get(`${API_URL}/bookings/user`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to fetch bookings'
    };
  }
};

export const fetchVendorBookings = async () => {
  try {
    const response = await axios.get(`${API_URL}/bookings/vendor`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to fetch bookings'
    };
  }
};

export const registerVendor = async (vendorData) => {
  try {
    const response = await axios.post(`${API_URL}/vendor/register`, vendorData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to register vendor'
    };
  }
};