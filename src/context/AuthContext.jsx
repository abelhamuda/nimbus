import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  // Mock user database
  const getUsers = () => {
    const users = localStorage.getItem('mock_users');
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users) => {
    localStorage.setItem('mock_users', JSON.stringify(users));
  };

  // Mock login function
  const login = async (email, password) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const userData = { 
        id: user.id, 
        email: user.email, 
        name: user.name,
        avatar: user.avatar
      };
      
      setUser(userData);
      localStorage.setItem('auth_token', 'mock_jwt_token_' + Date.now());
      localStorage.setItem('user_data', JSON.stringify(userData));
      
      setLoading(false);
      return { success: true, user: userData };
    } else {
      setLoading(false);
      return { success: false, error: 'Invalid email or password' };
    }
  };

  // Mock register function
  const register = async (name, email, password) => {
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = getUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      setLoading(false);
      return { success: false, error: 'User already exists' };
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In real app, this would be hashed
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    setLoading(false);
    return { success: true };
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};