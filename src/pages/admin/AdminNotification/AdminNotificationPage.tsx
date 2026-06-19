import { useState } from 'react';
import type { ReactNode } from 'react';
import { useToast } from '../../../contexts/ToastContext/ToastContext';
import { ConfirmModal } from '../../../components/common/ConfirmModal';
import './AdminNotificationPage.css';

type NotifType = 'promotion' | 'system' | 'warning';

const SYSTEM_NOTIFS = [
  { id: '1', title: 'Cảnh báo: TechPro Shop vi phạm', message: 'TechPro Shop bị khách hàng phản ánh bán hàng giả. Đang chờ kiểm duyệt.', type: 'warning' as NotifType, date: '2025-06-03', status: 'Chưa đọc' },
  { id: '2', title: 'Khuyến mãi mới được duyệt', message: 'Khuyến mãi "Flash Sale Cuối Tuần" đã được duyệt và đang hoạt động.', type: 'promotion' as NotifType, date: '2025-06-02', status: 'Đã đọc' },
  { id: '3', title: 'Yêu cầu hỗ trợ từ Henzo Tech Store', message: 'Henzo Tech Store yêu cầu hỗ trợ kỹ thuật về API.', type: 'system' as NotifType, date: '2025-06-01', status: 'Đã đọc' },
  { id: '4', title: 'Cập nhật hệ thống', message: 'Hệ thống sẽ bảo trì vào lúc 02:00-04:00 ngày 05/06/2025.', type: 'system' as NotifType, date: '2025-05-31', status: 'Đã đọc' },
  { id: '5', title: 'Khuyến mãi Apple Week sắp kết thúc', message: 'Chương trình "Apple Week" kết thúc sau 2 ngày. Khuyến khích thông báo đến khách hàng.', type: 'promotion' as NotifType, date: '2025-05-30', status: 'Đã đọc' },
];

const TYPE_COLORS: Record<NotifType, string> = {
  warning: '#EF4444',
  promotion: '#4F46E5',
  system: '#06B6D4',
};

const TYPE_BG: Record<NotifType, string> = {
  warning: 'rgba(239,68,68,0.1)',
  promotion: 'rgba(79,70,229,0.1)',
  system: 'rgba(6,182,212,0.1)',
};

const TYPE_ICONS: Record<NotifType, ReactNode> = {
  warning: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  promotion: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  system: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
};

export const AdminNotificationPage = () => {
  const toast = useToast();
  const [typeFilter, setTypeFilter] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: '', message: '', type: 'system', audience: 'all' });
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const filtered = typeFilter === 'all' ? SYSTEM_NOTIFS : SYSTEM_NOTIFS.filter(n => n.type === typeFilter);

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Quản Lý Thông Báo</h1>
          <p className="admin-page__subtitle">Tạo và gửi thông báo đến khách hàng, cửa hàng hoặc toàn hệ thống</p>
        </div>
        <div className="admin-page-header__actions">
          <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Tạo thông báo mới
          </button>
        </div>
      </div>

      <div className="admin-section">
        <div className="notif-management-header">
          <div className="notif-type-tabs">
            {['all', 'promotion', 'system', 'warning'].map(t => (
              <button
                key={t}
                className={`notif-tab ${typeFilter === t ? 'active' : ''}`}
                onClick={() => setTypeFilter(t)}
              >
                {t === 'all' ? 'Tất cả' : t === 'promotion' ? 'Khuyến mãi' : t === 'system' ? 'Hệ thống' : 'Cảnh báo'}
                {t !== 'all' && (
                  <span className="notif-tab__count">
                    {SYSTEM_NOTIFS.filter(n => n.type === t).length}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="notif-bulk-actions">
            <button className="btn btn-sm btn-outline" onClick={() => toast({ title: 'Tính năng đang phát triển', message: 'Gửi hàng loạt sẽ sớm có mặt!', variant: 'warning' })}>Gửi hàng loạt</button>
          </div>
        </div>

        <div className="notif-list">
          {filtered.map(n => (
            <div key={n.id} className={`notif-card ${n.status === 'Chưa đọc' ? 'notif-card--unread' : ''}`}>
              <div className="notif-card__icon" style={{ background: TYPE_BG[n.type], color: TYPE_COLORS[n.type] }}>
                {TYPE_ICONS[n.type]}
              </div>
              <div className="notif-card__content">
                <p className="notif-card__title">{n.title}</p>
                <p className="notif-card__message">{n.message}</p>
                <div className="notif-card__meta">
                  <span className={`notif-type-badge notif-type-badge--${n.type}`}>
                    {n.type === 'warning' ? 'Cảnh báo' : n.type === 'promotion' ? 'Khuyến mãi' : 'Hệ thống'}
                  </span>
                  <span className="notif-date">{new Date(n.date).toLocaleDateString('vi-VN')}</span>
                  {n.status === 'Chưa đọc' && <span className="notif-unread-dot" />}
                </div>
              </div>
              <div className="notif-card__actions">
                <button className="btn btn-sm btn-secondary" onClick={() => { setShowCreate(true); toast({ title: 'Chỉnh sửa thông báo', message: `Đang sửa thông báo #${n.id}`, variant: 'info' }); }}>Sửa</button>
                <button className="btn btn-sm btn-outline" onClick={() => toast({ title: 'Đã gửi lại', message: `Thông báo #${n.id} đã được gửi lại thành công`, variant: 'success' })}>Gửi lại</button>
                <button className="btn btn-sm btn-outline" style={{ color: 'var(--color-danger)' }} onClick={() => setPendingDelete(n.id)}>Xóa</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCreate && (
        <div className="admin-modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">Tạo thông báo mới</h3>
              <button className="admin-modal__close" onClick={() => setShowCreate(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="admin-modal__body">
              <div className="admin-form">
                <div className="admin-form-group">
                  <label className="admin-form-label">Tiêu đề <span>*</span></label>
                  <input type="text" className="admin-form-input" placeholder="Nhập tiêu đề thông báo" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Nội dung <span>*</span></label>
                  <textarea className="admin-form-textarea" placeholder="Nhập nội dung thông báo" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Loại thông báo</label>
                    <select className="admin-form-select" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                      <option value="system">Hệ thống</option>
                      <option value="promotion">Khuyến mãi</option>
                      <option value="warning">Cảnh báo</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Đối tượng nhận</label>
                    <select className="admin-form-select" value={form.audience} onChange={e => setForm(f => ({ ...f, audience: e.target.value }))}>
                      <option value="all">Toàn hệ thống</option>
                      <option value="customers">Khách hàng</option>
                      <option value="stores">Cửa hàng</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-modal__footer">
              <button className="btn btn-outline" onClick={() => setShowCreate(false)}>Hủy</button>
              <button className="btn btn-primary" onClick={() => setShowCreate(false)}>Gửi thông báo</button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!pendingDelete}
        title="Xóa thông báo"
        message="Bạn có chắc muốn xóa thông báo này?"
        confirmLabel="Xóa"
        variant="danger"
        onConfirm={() => {
          toast({ title: 'Đã xóa thông báo', variant: 'success' });
          setPendingDelete(null);
        }}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
};
