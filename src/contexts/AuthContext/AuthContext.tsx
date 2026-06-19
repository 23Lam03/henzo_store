import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { User, UserRole } from '../../types/auth';
import { authService } from '../../services/authService';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: string;
  userRole: UserRole;
  token: string | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; message: string; role?: string }>;
  register: (data: { name: string; email: string; phone: string; password: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_TOKEN = 'henzo_auth_token';
const STORAGE_USER = 'henzo_auth_user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem(STORAGE_USER);
    if (storedUser) {
      try { return JSON.parse(storedUser); } catch { /* ignore */ }
    }
    const sessionUser = sessionStorage.getItem(STORAGE_USER);
    if (sessionUser) {
      try { return JSON.parse(sessionUser); } catch { /* ignore */ }
    }
    return null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(STORAGE_TOKEN) ?? sessionStorage.getItem(STORAGE_TOKEN));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_TOKEN) ?? sessionStorage.getItem(STORAGE_TOKEN);
    if (storedToken) {
      authService.getCurrentUser(storedToken).then((foundUser: User | null) => {
        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem(STORAGE_USER, JSON.stringify(foundUser));
        } else {
          setToken(null);
          setUser(null);
          localStorage.removeItem(STORAGE_TOKEN);
          localStorage.removeItem(STORAGE_USER);
          sessionStorage.removeItem(STORAGE_TOKEN);
          sessionStorage.removeItem(STORAGE_USER);
        }
        setIsLoading(false);
      }).catch(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem(STORAGE_TOKEN);
        localStorage.removeItem(STORAGE_USER);
        sessionStorage.removeItem(STORAGE_TOKEN);
        sessionStorage.removeItem(STORAGE_USER);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    authService.getCurrentUser(token).then((foundUser: User | null) => {
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem(STORAGE_USER, JSON.stringify(foundUser));
      } else {
        setToken(null);
        setUser(null);
        localStorage.removeItem(STORAGE_TOKEN);
        localStorage.removeItem(STORAGE_USER);
        sessionStorage.removeItem(STORAGE_TOKEN);
        sessionStorage.removeItem(STORAGE_USER);
      }
    }).catch(() => {
      setToken(null);
      setUser(null);
      localStorage.removeItem(STORAGE_TOKEN);
      localStorage.removeItem(STORAGE_USER);
      sessionStorage.removeItem(STORAGE_TOKEN);
      sessionStorage.removeItem(STORAGE_USER);
    });
  }, []);

  const login = useCallback(async (
    email: string,
    password: string,
    rememberMe = false
  ): Promise<{ success: boolean; message: string; role?: string }> => {
    setIsLoading(true);
    try {
      const result = await authService.login(email, password);
      if (!result) {
        setIsLoading(false);
        return { success: false, message: 'Email hoặc mật khẩu không đúng!' };
      }
      const { user: loggedInUser, token: newToken } = result;
      setUser(loggedInUser);
      setToken(newToken);
      if (rememberMe) {
        localStorage.setItem(STORAGE_TOKEN, newToken);
        localStorage.setItem(STORAGE_USER, JSON.stringify(loggedInUser));
      } else {
        sessionStorage.setItem(STORAGE_TOKEN, newToken);
        sessionStorage.setItem(STORAGE_USER, JSON.stringify(loggedInUser));
      }
      setIsLoading(false);
      return { success: true, message: 'Đăng nhập thành công!', role: loggedInUser.role };
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
      return { success: false, message: 'Đã xảy ra lỗi. Vui lòng thử lại!' };
    }
  }, []);

  const register = useCallback(async (data: {
    name: string; email: string; phone: string; password: string;
  }): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    try {
      await authService.register(data);
      setIsLoading(false);
      return { success: true, message: 'Đăng ký thành công! Vui lòng đăng nhập.' };
    } catch (error) {
      console.error('Register failed:', error);
      setIsLoading(false);
      return { success: false, message: 'Đăng ký thất bại. Email có thể đã tồn tại!' };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_TOKEN);
    localStorage.removeItem(STORAGE_USER);
    sessionStorage.removeItem(STORAGE_TOKEN);
    sessionStorage.removeItem(STORAGE_USER);
    // clear guest cart on logout
    localStorage.removeItem('henzo_cart');
    window.dispatchEvent(new Event('henzo-auth-change'));
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser((prev: User | null) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      const localToken = localStorage.getItem(STORAGE_TOKEN);
      if (localToken) {
        localStorage.setItem(STORAGE_USER, JSON.stringify(updated));
      } else {
        sessionStorage.setItem(STORAGE_USER, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const role: string = user?.role || 'GUEST';
  const userRole: UserRole = (user?.role as UserRole) || 'GUEST';

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      role,
      userRole,
      token,
      login,
      register,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
