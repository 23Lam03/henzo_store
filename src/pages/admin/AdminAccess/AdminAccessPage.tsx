import { Breadcrumb } from '../../../components/breadcrumb';
import './AdminAccessPage.css';

const STAFF = [
  { id: '1', name: 'Quản Trị Viên', email: 'admin@henzo.com', role: 'ADMIN', permissions: ['Quản lý sản phẩm', 'Quản lý đơn hàng', 'Quản lý khách hàng', 'Báo cáo'], lastLogin: '2025-06-03 10:30', status: 'Hoạt động' },
  { id: '2', name: 'Nhân viên CSKH', email: 'support@henzo.com', role: 'STAFF', permissions: ['Hỗ trợ khách hàng', 'Xem đơn hàng'], lastLogin: '2025-06-02 14:20', status: 'Hoạt động' },
  { id: '3', name: 'Nhân viên kiểm duyệt', email: 'mod@henzo.com', role: 'MODERATOR', permissions: ['Kiểm duyệt sản phẩm', 'Kiểm duyệt đánh giá'], lastLogin: '2025-05-28 09:00', status: 'Tạm khóa' },
];

export const AdminAccessPage = () => {
  return (
    <div className="admin-access-page">
      <Breadcrumb />
      <div className="admin-access-page__header">
        <h1 className="page-heading">Quản Lý Phân Quyền</h1>
        <button className="btn btn-primary">+ Thêm nhân viên</button>
      </div>

      <div className="card mb-4">
        <h3 className="mb-4">Vai trò hệ thống</h3>
        <div className="role-cards">
          {[
            { name: 'SUPER_ADMIN', label: 'Super Admin', desc: 'Toàn quyền hệ thống', color: '#EF4444', count: 1 },
            { name: 'ADMIN', label: 'Admin', desc: 'Quản lý toàn bộ nội dung', color: '#4F46E5', count: 1 },
            { name: 'MODERATOR', label: 'Moderator', desc: 'Kiểm duyệt nội dung', color: '#06B6D4', count: 1 },
            { name: 'STAFF', label: 'Staff', desc: 'Hỗ trợ khách hàng', color: '#10B981', count: 0 },
          ].map(r => (
            <div key={r.name} className="role-card">
              <div className="role-card__dot" style={{ background: r.color }} />
              <div>
                <p className="role-card__name">{r.label}</p>
                <p className="role-card__desc">{r.desc}</p>
              </div>
              <span className="role-card__count">{r.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="access-table">
          <div className="access-table__head"><span>Nhân viên</span><span>Email</span><span>Vai trò</span><span>Quyền hạn</span><span>Đăng nhập gần nhất</span><span>Trạng thái</span><span></span></div>
          {STAFF.map(s => (
            <div key={s.id} className="access-table__row">
              <div className="access-table__name">{s.name}</div>
              <span className="access-table__email">{s.email}</span>
              <span className="badge badge-primary">{s.role}</span>
              <div className="access-table__permissions">
                {s.permissions.map(p => <span key={p} className="permission-tag">{p}</span>)}
              </div>
              <span className="access-table__login">{s.lastLogin}</span>
              <span className={`badge ${s.status === 'Hoạt động' ? 'badge-success' : 'badge-secondary'}`}>{s.status}</span>
              <div className="access-table__actions">
                <button className="btn btn-sm btn-outline">Sửa</button>
                <button className="btn btn-sm btn-outline">Khóa</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
