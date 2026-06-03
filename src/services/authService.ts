import type { User } from '../types/auth';
import { API_DELAY } from '../constants';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ─── Mock Users ─────────────────────────────────────────────────────────
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: 'user-customer-1',
    email: 'customer@henzo.com',
    password: '123456',
    name: 'Nguyễn Văn Khách',
    phone: '0901234567',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=customer',
    role: 'CUSTOMER',
    address: '123 Nguyễn Trãi, Quận 1, TP.HCM',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'user-shop-1',
    email: 'shop@henzo.com',
    password: '123456',
    name: 'Henzo Tech Store',
    phone: '0909876543',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=shop1',
    role: 'SHOP',
    address: '456 Lê Lợi, Quận 1, TP.HCM',
    createdAt: '2023-06-01T08:00:00Z',
  },
  {
    id: 'user-admin-1',
    email: 'admin@henzo.com',
    password: '123456',
    name: 'Quản Trị Viên',
    phone: '0901111222',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    role: 'ADMIN',
    createdAt: '2023-01-01T00:00:00Z',
  },
];

export const authService = {
  async login(email: string, password: string): Promise<{ user: User; token: string } | null> {
    await delay(API_DELAY.normal);
    const found = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (!found) return null;
    const { password: _pw, ...user } = found;
    const token = `token_${found.id}_${Date.now()}`;
    return { user, token };
  },

  async register(data: {
    name: string; email: string; phone: string; password: string;
  }): Promise<User> {
    await delay(API_DELAY.slow);
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.name,
      phone: data.phone,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.name)}`,
      role: 'CUSTOMER',
      createdAt: new Date().toISOString(),
    };
    MOCK_USERS.push({ ...newUser, password: data.password } as typeof MOCK_USERS[number]);
    return newUser;
  },

  async getCurrentUser(token: string): Promise<User | null> {
    await delay(API_DELAY.fast);
    if (!token) return null;
    const tokenMatch = token.match(/^token_(.+?)_\d+$/);
    if (!tokenMatch) return null;
    const userId = tokenMatch[1];
    const found = MOCK_USERS.find((u) => u.id === userId);
    if (!found) return null;
    const { password: _pw, ...user } = found;
    return user;
  },

  async changePassword(_userId: string, _currentPassword: string, _newPassword: string): Promise<boolean> {
    await delay(API_DELAY.normal);
    return true;
  },

  async updateProfile(_userId: string, data: Partial<User>): Promise<User | null> {
    await delay(API_DELAY.normal);
    const idx = MOCK_USERS.findIndex((u) => u.id === _userId);
    if (idx === -1) return null;
    const updated = { ...MOCK_USERS[idx], ...data } as typeof MOCK_USERS[number];
    MOCK_USERS[idx] = updated;
    const { password: _pw, ...user } = updated;
    return user;
  },
};
