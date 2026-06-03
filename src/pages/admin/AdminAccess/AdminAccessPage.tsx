import { useState } from 'react';
import './AdminAccessPage.css';

const ROLES = [
  { name: 'SUPER_ADMIN', label: 'Super Admin', desc: 'Toàn quyền hệ thống, quản lý mọi người dùng', color: '#EF4444', bg: 'rgba(239,68,68,0.1)', count: 1 },
  { name: 'ADMIN', label: 'Admin', desc: 'Quản lý toàn bộ nội dung và người dùng', color: '#4F46E5', bg: 'rgba(79,70,229,0.1)', count: 2 },
  { name: 'MODERATOR', label: 'Moderator', desc: 'Kiểm duyệt nội dung, đánh giá, sản phẩm', color: '#06B6D4', bg: 'rgba(6,182,212,0.1)', count: 3 },
  { name: 'STAFF', label: 'Staff', desc: 'Hỗ trợ khách hàng, xem đơn hàng', color: '#10B981', bg: 'rgba(16,185,129,0.1)', count: 5 },
];

const STAFF_LIST = [
  { id: '1', name: 'Quản Trị Viên Hệ Thống', email: 'admin@henzo.com', role: 'ADMIN', roleColor: '#4F46E5', roleBg: 'rgba(79,70,229,0.1)', permissions: ['Quản lý sản phẩm', 'Quản lý đơn hàng', 'Quản lý khách hàng', 'Quản lý cửa hàng', 'Báo cáo', 'Tài chính'], lastLogin: '2025-06-03 10:30', status: 'Hoạt động' },
  { id: '2', name: 'Nguyễn Văn Quang', email: 'mod@henzo.com', role: 'MODERATOR', roleColor: '#06B6D4', roleBg: 'rgba(6,182,212,0.1)', permissions: ['Kiểm duyệt sản phẩm', 'Kiểm duyệt đánh giá', 'Xem báo cáo'], lastLogin: '2025-06-03 09:15', status: 'Hoạt động' },
  { id: '3', name: 'Trần Thị Hương', email: 'cs@henzo.com', role: 'STAFF', roleColor: '#10B981', roleBg: 'rgba(16,185,129,0.1)', permissions: ['Hỗ trợ khách hàng', 'Xem đơn hàng'], lastLogin: '2025-06-03 08:45', status: 'Hoạt động' },
  { id: '4', name: 'Lê Minh Tuấn', email: 'tuanlm@henzo.com', role: 'STAFF', roleColor: '#10B981', roleBg: 'rgba(16,185,129,0.1)', permissions: ['Hỗ trợ khách hàng', 'Xem đơn hàng', 'Xử lý hoàn tiền'], lastLogin: '2025-06-02 16:20', status: 'Hoạt động' },
  { id: '5', name: 'Phạm Thị Lan', email: 'lanpt@henzo.com', role: 'MODERATOR', roleColor: '#06B6D4', roleBg: 'rgba(6,182,212,0.1)', permissions: ['Kiểm duyệt sản phẩm', 'Kiểm duyệt đánh giá', 'Xem báo cáo'], lastLogin: '2025-06-02 14:00', status: 'Hoạt động' },
  { id: '6', name: 'Vũ Hoàng Nam', email: 'namvh@henzo.com', role: 'ADMIN', roleColor: '#4F46E5', roleBg: 'rgba(79,70,229,0.1)', permissions: ['Quản lý sản phẩm', 'Quản lý đơn hàng', 'Báo cáo', 'Tài chính'], lastLogin: '2025-06-01 17:30', status: 'Tạm khóa' },
];

const PERMISSIONS = [
  'Xem dashboard', 'Quản lý sản phẩm', 'Quản lý đơn hàng', 'Quản lý khách hàng',
  'Quản lý cửa hàng', 'Quản lý thanh toán', 'Quản lý đánh giá', 'Quản lý khuyến mãi',
  'Quản lý hỗ trợ', 'Báo cáo', 'Tài chính', 'Phân quyền',
];

const ROLE_PERMS: Record<string, string[]> = {
  SUPER_ADMIN: PERMISSIONS,
  ADMIN: ['Xem dashboard', 'Quản lý sản phẩm', 'Quản lý đơn hàng', 'Quản lý khách hàng', 'Quản lý cửa hàng', 'Quản lý thanh toán', 'Quản lý đánh giá', 'Quản lý khuyến mãi', 'Quản lý hỗ trợ', 'Báo cáo', 'Tài chính'],
  MODERATOR: ['Xem dashboard', 'Quản lý sản phẩm', 'Quản lý đánh giá', 'Xem báo cáo'],
  STAFF: ['Xem dashboard', 'Xem đơn hàng', 'Hỗ trợ khách hàng'],
};

export const AdminAccessPage = () => {
  const [selectedRole, setSelectedRole] = useState('ADMIN');

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Quản Lý Phân Quyền</h1>
          <p className="admin-page__subtitle">Quản lý vai trò, quyền hạn và nhân viên hệ thống</p>
        </div>
        <div className="admin-page-header__actions">
          <button className="btn btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Thêm nhân viên
          </button>
        </div>
      </div>

      {/* Role Cards */}
      <div className="admin-section">
        <div className="admin-section__header">
          <h3 className="admin-section__title">Vai trò hệ thống</h3>
        </div>
        <div className="role-cards">
          {ROLES.map(r => (
            <div
              key={r.name}
              className={`role-card ${selectedRole === r.name ? 'role-card--selected' : ''}`}
              onClick={() => setSelectedRole(r.name)}
            >
              <div className="role-card__dot" style={{ background: r.color }} />
              <div className="role-card__info">
                <p className="role-card__name">{r.label}</p>
                <p className="role-card__desc">{r.desc}</p>
              </div>
              <span className="role-card__count" style={{ background: r.bg, color: r.color }}>{r.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Permission Matrix */}
      <div className="admin-section">
        <div className="admin-section__header">
          <h3 className="admin-section__title">Ma trận quyền hạn — {ROLES.find(r => r.name === selectedRole)?.label}</h3>
        </div>
        <div className="perm-matrix">
          <div className="perm-matrix__header">
            <div className="perm-matrix__role-header">Quyền hạn</div>
            {ROLES.map(r => (
              <div key={r.name} className={`perm-matrix__role-header ${selectedRole === r.name ? 'active' : ''}`} style={{ color: r.color }}>
                {r.label}
              </div>
            ))}
          </div>
          {PERMISSIONS.map(perm => (
            <div key={perm} className="perm-matrix__row">
              <div className="perm-matrix__perm-name">{perm}</div>
              {ROLES.map(r => (
                <div key={r.name} className="perm-matrix__cell">
                  {ROLE_PERMS[r.name]?.includes(perm)
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-border)" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  }
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Staff List */}
      <div className="admin-section">
        <div className="admin-section__header">
          <h3 className="admin-section__title">Danh sách nhân viên</h3>
          <span className="admin-page__meta">{STAFF_LIST.length} nhân viên</span>
        </div>
        <div className="access-table">
          <div className="access-table__head">
            <span>Nhân viên</span>
            <span>Vai trò</span>
            <span>Quyền hạn</span>
            <span>Đăng nhập gần nhất</span>
            <span>Trạng thái</span>
            <span></span>
          </div>
          {STAFF_LIST.map(s => (
            <div key={s.id} className="access-table__row">
              <div className="access-table__user">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=staff${s.id}`} alt="" className="admin-avatar" />
                <div>
                  <p className="access-table__name">{s.name}</p>
                  <p className="access-table__email">{s.email}</p>
                </div>
              </div>
              <div>
                <span className="access-table__role-badge" style={{ background: s.roleBg, color: s.roleColor }}>{s.role}</span>
              </div>
              <div className="access-table__permissions">
                {s.permissions.map(p => <span key={p} className="permission-tag">{p}</span>)}
              </div>
              <div className="access-table__login">{s.lastLogin}</div>
              <div>
                <span className={`admin-status ${s.status === 'Hoạt động' ? 'admin-status--active' : 'admin-status--locked'}`}>{s.status}</span>
              </div>
              <div className="access-table__actions">
                <button className="btn btn-sm btn-secondary">Sửa</button>
                <button className="btn btn-sm btn-outline">{s.status === 'Hoạt động' ? 'Khóa' : 'Mở khóa'}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
