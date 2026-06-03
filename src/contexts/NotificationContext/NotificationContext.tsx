import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { Notification } from '../../types';
import { STORAGE_KEYS } from '../../constants';
import { getStorageItem, setStorageItem } from '../../utils';
import { mockApi } from '../../services';

interface NotificationContextValue {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  refresh: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>(() =>
    getStorageItem<Notification[]>(STORAGE_KEYS.notifications, [])
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.notifications, notifications);
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    mockApi.markAllNotificationsRead();
  }, []);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const data = await mockApi.getNotifications('user-1');
    setNotifications(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (notifications.length === 0) {
      refresh();
    }
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isLoading,
        markAsRead,
        markAllAsRead,
        refresh,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextValue => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within NotificationProvider');
  return context;
};
