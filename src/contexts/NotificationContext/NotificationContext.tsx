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
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => void;
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

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => {
    setNotifications(prev => [
      {
        ...notification,
        id: `notif-${Date.now()}`,
        createdAt: new Date().toISOString(),
        isRead: false,
      },
      ...prev,
    ]);
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

  useEffect(() => {
    const syncNotifications = () => {
      setNotifications(getStorageItem<Notification[]>(STORAGE_KEYS.notifications, []));
    };

    window.addEventListener('storage', syncNotifications);
    window.addEventListener('focus', syncNotifications);
    return () => {
      window.removeEventListener('storage', syncNotifications);
      window.removeEventListener('focus', syncNotifications);
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isLoading,
        markAsRead,
        markAllAsRead,
        addNotification,
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
