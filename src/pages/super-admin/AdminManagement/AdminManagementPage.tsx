import { useState } from 'react';
import '../super-admin-pages.css';

export const AdminManagementPage = () => {
  const [filter, setFilter] = useState('');

  const admins = [
    { id: 1, name: 'Quản Trị Viên', email: 'admin@henzo.com', role: 'ADMIN', status: 'active', lastLogin: '2026-06-03 09:00', created: '2023-01-01' },
    { id: 2, name: 'Trần Thị B', email: 'admin2@henzo.com', role: 'ADMIN', status: 'active', lastLogin: '2026-06-02 15:30', created: '2024-03-15' },
    { id: 3, name: 'Nguyễn Văn C', email: 'nguyenvanc@henzo.com', role: 'ADMIN', status: 'inactive', lastLogin: '2026-05-20 10:00', created: '2024-06-01' },
    { id: 4, name: 'Lê Văn D', email: 'levand@henzo.com', role: 'ADMIN', status: 'active', lastLogin: '2026-06-03 08:45', created: '2025-01-10' },
  ];

  return (
    <div className="superadmin-page">
      <div className="page-actions">
        <div className="page-actions__left">
          <div className="filter-bar__search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input type="text" placeholder="Tìm kiếm admin..." value={filter} onChange={e => setFilter(e.target.value)} />
          </div>
        </div>
        <div className="page-actions__right">
          <button className="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Thêm Admin Mới
          </button>
        </div>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Đăng nhập lần cuối</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin.id}>
                <td style={{ fontWeight: 600 }}>{admin.name}</td>
                <td>{admin.email}</td>
                <td><span className={`role-badge role-badge--${admin.role.toLowerCase()}`}>{admin.role}</span></td>
                <td>
                  <span className={`badge badge--${admin.status === 'active' ? 'active' : 'inactive'}`}>
                    {admin.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
                  </span>
                </td>
                <td style={{ color: 'var(--color-text-muted)' }}>{admin.lastLogin}</td>
                <td style={{ color: 'var(--color-text-muted)' }}>{admin.created}</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="action-btn" title="Sửa">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button className="action-btn action-btn--danger" title="Xóa">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
