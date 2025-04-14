'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { userAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const savedUser = Cookies.get('user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          // Verify user data is valid
          if (parsedUser && parsedUser.userId) {
            setUser(parsedUser);
          } else {
            // If user data is invalid, remove from cookie
            Cookies.remove('user');
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Error reading user from cookie:', error);
        Cookies.remove('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const data = await userAPI.login({ email, password });
      console.log('Login response:', data);
      
      if (data && data._id) {
        setUser(data);
        Cookies.set('user', JSON.stringify(data), { expires: 7 }); // Cookie expires in 7 days
        toast.success('Đăng nhập thành công');
        
        // Redirect based on user role
        if (data.isAdmin === true) {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Đăng nhập thất bại');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const data = await userAPI.register({ name, email, password });
      
      if (data && data._id) {
        setUser(data);
        Cookies.set('user', JSON.stringify(data), { expires: 7 });
        toast.success('Đăng ký thành công');
        router.push('/');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Đăng ký thất bại');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      Cookies.remove('user');
      toast.success('Đăng xuất thành công');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Đăng xuất thất bại');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 