import { useState } from 'react';
import './AdminAccessPage.css';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  roleColor: string;
  roleBg: string;
  permissions: string[];
  lastLogin: string;
  status: 'active' | 'locked';
}

const ROLE_OPTIONS = [
  { name: 'ADMIN', label: 'Admin', desc: 'Quản lý toàn bộ nội dung và người dùng', color: '#4F46E5', bg: 'rgba(79,70,229,0.1)', defaultPerms: ['Quản lý sản phẩm', 'Quản lý đơn hàng', 'Quản lý khách hàng', 'Quản lý cửa hàng', 'Báo cáo', 'Tài chính'] },
  { name: 'MODERATOR', label: 'Moderator', desc: 'Kiểm duyệt nội dung, đánh giá, sản phẩm', color: '#06B6D4', bg: 'rgba(6,182,212,0.1)', defaultPerms: ['Kiểm duyệt sản phẩm', 'Kiểm duyệt đánh giá', 'Xem báo cáo'] },
  { name: 'STAFF', label: 'Staff', desc: 'Hỗ trợ khách hàng, xem đơn hàng', color: '#10B981', bg: 'rgba(16,185,129,0.1)', defaultPerms: ['Hỗ trợ khách hàng', 'Xem đơn hàng'] },
  { name: 'SHOP', label: 'Shop', desc: 'Người bán — quản lý cửa hàng và sản phẩm', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', defaultPerms: ['Quản lý sản phẩm', 'Quản lý đơn hàng', 'Quản lý khuyến mãi', 'Xem báo cáo', 'Quản lý kho'] },
];

const ROLE_PERMS: Record<string, string[]> = {
  ADMIN: ['Xem dashboard', 'Quản lý sản phẩm', 'Quản lý đơn hàng', 'Quản lý khách hàng', 'Quản lý cửa hàng', 'Quản lý thanh toán', 'Quản lý đánh giá', 'Quản lý khuyến mãi', 'Quản lý hỗ trợ', 'Báo cáo', 'Tài chính'],
  MODERATOR: ['Xem dashboard', 'Quản lý sản phẩm', 'Quản lý đánh giá', 'Xem báo cáo'],
  STAFF: ['Xem dashboard', 'Xem đơn hàng', 'Hỗ trợ khách hàng'],
  SHOP: ['Quản lý sản phẩm', 'Quản lý đơn hàng', 'Quản lý khuyến mãi', 'Xem báo cáo', 'Quản lý kho', 'Quản lý vận chuyển'],
};

const ALL_PERMISSIONS = [
  'Xem dashboard', 'Quản lý sản phẩm', 'Quản lý đơn hàng', 'Quản lý khách hàng',
  'Quản lý cửa hàng', 'Quản lý thanh toán', 'Quản lý đánh giá', 'Quản lý khuyến mãi',
  'Quản lý hỗ trợ', 'Báo cáo', 'Tài chính', 'Phân quyền',
  'Quản lý kho', 'Quản lý vận chuyển',
];

const ROLE_COLORS: Record<string, { color: string; bg: string }> = {
  ADMIN: { color: '#4F46E5', bg: 'rgba(79,70,229,0.1)' },
  MODERATOR: { color: '#06B6D4', bg: 'rgba(6,182,212,0.1)' },
  STAFF: { color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
  SHOP: { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
};

const STATUS_LABELS = { active: 'Hoạt động', locked: 'Tạm khóa' };

const initStaff: StaffMember[] = [
  { id: '1', name: 'Quản Trị Viên Hệ Thống', email: 'admin@henzo.com', role: 'ADMIN', roleColor: '#4F46E5', roleBg: 'rgba(79,70,229,0.1)', permissions: ROLE_PERMS.ADMIN, lastLogin: '2025-06-03 10:30', status: 'active' },
  { id: '2', name: 'Nguyễn Văn Quang', email: 'mod@henzo.com', role: 'MODERATOR', roleColor: '#06B6D4', roleBg: 'rgba(6,182,212,0.1)', permissions: ROLE_PERMS.MODERATOR, lastLogin: '2025-06-03 09:15', status: 'active' },
  { id: '3', name: 'Trần Thị Hương', email: 'cs@henzo.com', role: 'STAFF', roleColor: '#10B981', roleBg: 'rgba(16,185,129,0.1)', permissions: ROLE_PERMS.STAFF, lastLogin: '2025-06-03 08:45', status: 'active' },
  { id: '4', name: 'Lê Minh Tuấn', email: 'tuanlm@henzo.com', role: 'STAFF', roleColor: '#10B981', roleBg: 'rgba(16,185,129,0.1)', permissions: ROLE_PERMS.STAFF, lastLogin: '2025-06-02 16:20', status: 'active' },
  { id: '5', name: 'Phạm Thị Lan', email: 'lanpt@henzo.com', role: 'MODERATOR', roleColor: '#06B6D4', roleBg: 'rgba(6,182,212,0.1)', permissions: ROLE_PERMS.MODERATOR, lastLogin: '2025-06-02 14:00', status: 'locked' },
  { id: '6', name: 'Vũ Hoàng Nam', email: 'namvh@henzo.com', role: 'SHOP', roleColor: '#F59E0B', roleBg: 'rgba(245,158,11,0.1)', permissions: ROLE_PERMS.SHOP, lastLogin: '2025-06-01 17:30', status: 'active' },
  { id: '7', name: 'Đỗ Thị Mai', email: 'maidt@henzo.com', role: 'SHOP', roleColor: '#F59E0B', roleBg: 'rgba(245,158,11,0.1)', permissions: ROLE_PERMS.SHOP, lastLogin: '2025-05-30 11:00', status: 'locked' },
];

const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('vi-VN', {
  day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
});

export const AdminAccessPage = () => {
  const [staffList, setStaffList] = useState<StaffMember[]>(initStaff);
  const [selectedRole, setSelectedRole] = useState('ADMIN');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Add/Edit modal
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<StaffMember | null>(null);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRole, setFormRole] = useState('STAFF');
  const [formPerms, setFormPerms] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Role change inline
  const [changingId, setChangingId] = useState<string | null>(null);

  const openAdd = () => {
    setEditTarget(null);
    setFormName(''); setFormEmail(''); setFormRole('STAFF');
    setFormPerms(ROLE_PERMS.STAFF);
    setFormErrors({});
    setShowModal(true);
  };

  const openEdit = (member: StaffMember) => {
    setEditTarget(member);
    setFormName(member.name); setFormEmail(member.email); setFormRole(member.role);
    setFormPerms(member.permissions);
    setFormErrors({});
    setShowModal(true);
  };

  const handleRoleChange = (newRole: string) => {
    setFormRole(newRole);
    setFormPerms(ROLE_PERMS[newRole] || []);
  };

  const togglePerm = (perm: string) => {
    setFormPerms(prev => prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formName.trim()) e.name = 'Vui lòng nhập họ tên';
    if (!formEmail.trim()) e.email = 'Vui lòng nhập email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail)) e.email = 'Email không hợp lệ';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setFormErrors(e); return; }
    const roleColor = ROLE_COLORS[formRole];
    const newMember: StaffMember = {
      id: editTarget?.id || String(Date.now()),
      name: formName.trim(),
      email: formEmail.trim(),
      role: formRole,
      roleColor: roleColor.color,
      roleBg: roleColor.bg,
      permissions: formPerms,
      lastLogin: editTarget?.lastLogin || '—',
      status: editTarget?.status || 'active',
    };
    if (editTarget) {
      setStaffList(prev => prev.map(s => s.id === editTarget.id ? newMember : s));
    } else {
      setStaffList(prev => [newMember, ...prev]);
    }
    setShowModal(false);
  };

  const handleToggleStatus = (id: string) => {
    setStaffList(prev => prev.map(s =>
      s.id === id ? { ...s, status: s.status === 'active' ? 'locked' : 'active' } : s
    ));
  };

  const handleInlineRoleChange = (id: string, newRole: string) => {
    const roleColor = ROLE_COLORS[newRole];
    setStaffList(prev => prev.map(s =>
      s.id === id
        ? { ...s, role: newRole, roleColor: roleColor.color, roleBg: roleColor.bg, permissions: ROLE_PERMS[newRole] || [] }
        : s
    ));
    setChangingId(null);
  };

  const filtered = staffList.filter(s => {
    if (selectedRoleFilter !== 'all' && s.role !== selectedRoleFilter) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const roleCounts = ROLE_OPTIONS.reduce<Record<string, number>>((acc, r) => {
    acc[r.name] = staffList.filter(s => s.role === r.name).length;
    return acc;
  }, {});

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Quản Lý Phân Quyền</h1>
          <p className="admin-page__subtitle">Cấp quyền, quản lý vai trò và nhân viên hệ thống</p>
        </div>
        <div className="admin-page-header__actions">
          <button className="btn btn-primary" onClick={openAdd}>
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
          {ROLE_OPTIONS.map(r => (
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
              <span className="role-card__count" style={{ background: r.bg, color: r.color }}>{roleCounts[r.name] || 0}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Permission Matrix */}
      <div className="admin-section">
        <div className="admin-section__header">
          <h3 className="admin-section__title">Ma trận quyền hạn — {ROLE_OPTIONS.find(r => r.name === selectedRole)?.label}</h3>
        </div>
        <div className="perm-matrix">
          <div className="perm-matrix__header">
            <div className="perm-matrix__role-header">Quyền hạn</div>
            {ROLE_OPTIONS.map(r => (
              <div key={r.name} className={`perm-matrix__role-header ${selectedRole === r.name ? 'active' : ''}`} style={{ color: r.color }}>
                {r.label}
              </div>
            ))}
          </div>
          {ALL_PERMISSIONS.map(perm => (
            <div key={perm} className="perm-matrix__row">
              <div className="perm-matrix__perm-name">{perm}</div>
              {ROLE_OPTIONS.map(r => (
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
          <h3 className="admin-section__title">Danh sách nhân viên &amp; cửa hàng</h3>
          <span className="admin-page__meta">{staffList.length} thành viên</span>
        </div>

        {/* Toolbar */}
        <div className="access-toolbar">
          <div className="access-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Tìm theo tên hoặc email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="access-role-filter">
            <button
              className={`access-role-btn ${selectedRoleFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedRoleFilter('all')}
            >Tất cả</button>
            {ROLE_OPTIONS.map(r => (
              <button
                key={r.name}
                className={`access-role-btn ${selectedRoleFilter === r.name ? 'active' : ''}`}
                style={selectedRoleFilter === r.name ? { background: r.bg, color: r.color, borderColor: r.color } : {}}
                onClick={() => setSelectedRoleFilter(r.name)}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="access-table">
          <div className="access-table__head">
            <span>Thành viên</span>
            <span>Vai trò</span>
            <span>Quyền hạn</span>
            <span>Đăng nhập gần nhất</span>
            <span>Trạng thái</span>
            <span>Thao tác</span>
          </div>
          {filtered.length === 0 ? (
            <div className="access-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <p>Không tìm thấy thành viên nào</p>
            </div>
          ) : filtered.map(s => (
            <div key={s.id} className="access-table__row">
              <div className="access-table__user">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=staff${s.id}`} alt="" className="admin-avatar" />
                <div>
                  <p className="access-table__name">{s.name}</p>
                  <p className="access-table__email">{s.email}</p>
                </div>
              </div>
              <div>
                {changingId === s.id ? (
                  <select
                    className="input role-inline-select"
                    defaultValue={s.role}
                    autoFocus
                    onChange={e => handleInlineRoleChange(s.id, e.target.value)}
                    onBlur={() => setChangingId(null)}
                  >
                    {ROLE_OPTIONS.map(r => (
                      <option key={r.name} value={r.name}>{r.label}</option>
                    ))}
                  </select>
                ) : (
                  <button
                    className="access-table__role-badge"
                    style={{ background: s.roleBg, color: s.roleColor, cursor: 'pointer' }}
                    onClick={() => setChangingId(s.id)}
                    title="Nhấn để đổi vai trò"
                  >
                    {s.role} ↕
                  </button>
                )}
              </div>
              <div className="access-table__permissions">
                {s.permissions.slice(0, 3).map(p => <span key={p} className="permission-tag">{p}</span>)}
                {s.permissions.length > 3 && (
                  <span className="permission-tag permission-tag--more">+{s.permissions.length - 3}</span>
                )}
              </div>
              <div className="access-table__login">{s.lastLogin}</div>
              <div>
                <span className={`admin-status ${s.status === 'active' ? 'admin-status--active' : 'admin-status--locked'}`}>
                  {STATUS_LABELS[s.status]}
                </span>
              </div>
              <div className="access-table__actions">
                <button className="btn btn-sm btn-secondary" onClick={() => openEdit(s)}>Sửa</button>
                <button
                  className={`btn btn-sm ${s.status === 'active' ? 'btn-outline' : 'btn-outline'}`}
                  onClick={() => handleToggleStatus(s.id)}
                >
                  {s.status === 'active' ? 'Khóa' : 'Mở khóa'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box modal-box--wide" onClick={e => e.stopPropagation()}>
            <div className="modal-box__header">
              <h2 className="modal-box__title">{editTarget ? 'Sửa thành viên' : 'Thêm thành viên mới'}</h2>
              <button className="modal-box__close" onClick={() => setShowModal(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="modal-box__body">
              <div className="form-row-2">
                <div className="input-group">
                  <label className="input-label">Họ tên <span>*</span></label>
                  <input type="text" className={`input ${formErrors.name ? 'input--error' : ''}`} placeholder="Nhập họ tên" value={formName} onChange={e => setFormName(e.target.value)} />
                  {formErrors.name && <span className="input-error">{formErrors.name}</span>}
                </div>
                <div className="input-group">
                  <label className="input-label">Email <span>*</span></label>
                  <input type="email" className={`input ${formErrors.email ? 'input--error' : ''}`} placeholder="email@henzo.com" value={formEmail} onChange={e => setFormEmail(e.target.value)} />
                  {formErrors.email && <span className="input-error">{formErrors.email}</span>}
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Vai trò</label>
                <div className="role-select-grid">
                  {ROLE_OPTIONS.map(r => (
                    <button
                      key={r.name}
                      type="button"
                      className={`role-option-card ${formRole === r.name ? 'active' : ''}`}
                      style={formRole === r.name ? { borderColor: r.color, background: r.bg } : {}}
                      onClick={() => handleRoleChange(r.name)}
                    >
                      <div className="role-option-card__dot" style={{ background: r.color }} />
                      <div>
                        <p className="role-option-card__name">{r.label}</p>
                        <p className="role-option-card__desc">{r.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Quyền hạn (tuỳ chỉnh)</label>
                <div className="perm-check-grid">
                  {ALL_PERMISSIONS.map(perm => (
                    <label key={perm} className={`perm-check-item ${formPerms.includes(perm) ? 'checked' : ''}`}>
                      <input
                        type="checkbox"
                        checked={formPerms.includes(perm)}
                        onChange={() => togglePerm(perm)}
                      />
                      <span>{perm}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-box__footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
              <button className="btn btn-primary" onClick={handleSave}>
                {editTarget ? 'Lưu thay đổi' : 'Thêm thành viên'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
