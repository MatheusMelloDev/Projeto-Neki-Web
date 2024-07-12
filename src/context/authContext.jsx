import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginUserService, registerUser as registerUserService } from '../services/apiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (loginData) => {
    try {
      console.log('Logging in with:', loginData);
      const response = await loginUserService(loginData.email, loginData.senha);
      console.log('Login API response:', response);
      setUser({ email: response.email }); // Adjust to match the response structure
      localStorage.setItem('token', response.token);
      navigate('/home');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const register = async (registerData) => {
    try {
      await registerUserService(registerData);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
