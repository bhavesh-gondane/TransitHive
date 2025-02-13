import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

//const API_URL = 'http://localhost:3000/api';

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    localStorage.removeItem('vendorData');
    localStorage.removeItem('userData');
  }
};

export const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

export const getDecodedToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

// export const loginUser = async (endpoint, credentials) => {
//   try {
//     console.log("in login user", credentials ,"endpoint"+endpoint);
//     const response = await axios.post(`${API_URL}/${endpoint}/login`, credentials);
//     const { token } = response.data;
//     setAuthToken(token);
//     return { success: true, data: response.data };
//   } catch (error) {
//     return {
//       success: false,
//       error: error.response?.data?.error || 'Login failed'
//     };
//   }
// };

// export const registerUser = async (endpoint, userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/${endpoint}/register`, userData);
//     return { success: true, data: response.data };
//   } catch (error) {
//     return {
//       success: false,
//       error: error.response?.data?.error || 'Registration failed'
//     };
//   }
// };