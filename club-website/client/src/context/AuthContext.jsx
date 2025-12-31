import { createContext, useState, useEffect } from 'react';
import { login as authLogin, logout as authLogout, getCurrentUser, getToken } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
const token = getToken();
if (token) {
const currentUser = getCurrentUser();
if (currentUser) {
setUser(currentUser);
}
}
setLoading(false);
}, []);

const login = async (credentials) => {
const data = await authLogin(credentials);
setUser(data.user);
return data;
};

const logout = () => {
authLogout();
setUser(null);
};

return (
<AuthContext.Provider value={{ user, login, logout, loading }}>
{children}
</AuthContext.Provider>
);
};