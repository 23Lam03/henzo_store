import '../super-admin-pages.css';

export const SystemLogPage = () => {
  const logs = [
    { time: '2026-06-03 09:55:23', level: 'info', source: 'AuthService', message: 'Đăng nhập thành công: superadmin@pixelstore.com' },
    { time: '2026-06-03 09:54:10', level: 'info', source: 'AdminService', message: 'Cập nhật quyền SHOP: read_products=true, write_orders=true' },
    { time: '2026-06-03 09:30:00', level: 'warn', source: 'AuthService', message: 'Đăng nhập thất bại 3 lần từ IP 203.0.113.42' },
    { time: '2026-06-03 09:15:45', level: 'info', source: 'BackupService', message: 'Backup database hoàn tất: backup_20260603.sql.gz (2.3 GB)' },
    { time: '2026-06-03 08:00:00', level: 'info', source: 'SchedulerService', message: 'Cron job: Cleanup session tokens' },
    { time: '2026-06-03 07:55:12', level: 'error', source: 'PaymentService', message: 'Webhook timeout từ VNPay - retry scheduled' },
    { time: '2026-06-03 07:30:00', level: 'debug', source: 'CacheService', message: 'Cache hit ratio: 94.2% (last hour)' },
    { time: '2026-06-03 07:00:00', level: 'info', source: 'NotificationService', message: 'Email batch gửi: 1,247 thành công' },
  ];

  return (
    <div className="superadmin-page">
      <div className="page-actions">
        <h2 style={{ margin: 0, fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          Nhật Ký Hệ Thống
        </h2>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button className="btn btn-secondary">Xuất Logs</button>
          <button className="btn btn-outline">Xóa Logs cũ</button>
        </div>
      </div>
      <div className="data-table-wrapper">
        <div className="log-list">
          {logs.map((log, i) => (
            <div key={i} className="log-item">
              <span className="log-item__time">{log.time}</span>
              <span className={`log-item__level log-item__level--${log.level}`}>{log.level.toUpperCase()}</span>
              <div className="log-item__content">
                <p className="log-item__message">{log.message}</p>
                <span className="log-item__source">{log.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
