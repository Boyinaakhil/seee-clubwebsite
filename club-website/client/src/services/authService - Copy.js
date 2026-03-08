import API from './api';

export const login = async (credentials) => {
const response = await API.post('/auth/login', credentials);
if (response.data.token) {
localStorage.setItem('token', response.data.token);
localStorage.setItem('user', JSON.stringify(response.data.user));
}
return response.data;
};

export const logout = () => {
localStorage.removeItem('token');
localStorage.removeItem('user');
};

export const getCurrentUser = () => {
const userStr = localStorage.getItem('user');
return userStr ? JSON.parse(userStr) : null;
};

export const getToken = () => {
return localStorage.getItem('token');
};