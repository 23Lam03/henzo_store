import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../../contexts/AdminContext';
import { AdminDataTable } from '../../../components/admin/AdminDataTable';
import type { User } from '../../../types';
import { formatNumber } from '../../../utils';
import './AdminCustomerPage.css';

const STATUS_OPTIONS = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Hoạt động', value: 'active' },
  { label: 'Bị khóa', value: 'locked' },
];

export const AdminCustomerPage = () => {
  const navigate = useNavigate();
  const { customers } = useAdmin();
  const [filter] = useState('all');

  const columns = [
    {
      key: 'id', label: 'Mã KH', width: '120px',
      render: (_: unknown, r: User) => <code className="customer-id">{(r as User).id.replace('customer-', 'CUS')}</code>,
    },
    {
      key: 'name', label: 'Khách hàng', sortable: true,
      render: (_: unknown, r: User) => (
        <div className="customer-cell">
          <img src={(r as User).avatar} alt="" className="admin-avatar admin-avatar--sm" />
          <div>
            <p className="customer-name">{(r as User).name}</p>
            <p className="customer-email">{(r as User).email}</p>
          </div>
        </div>
      ),
    },
    { key: 'phone', label: 'Điện thoại', render: (_: unknown, r: User) => <span>{(r as User).phone}</span> },
    { key: 'address', label: 'Địa chỉ', render: (_: unknown, r: User) => <span className="text-muted">{(r as User).address || '—'}</span> },
    { key: 'createdAt', label: 'Ngày đăng ký', sortable: true, width: '140px',
      render: (_: unknown, r: User) => new Date((r as User).createdAt).toLocaleDateString('vi-VN'),
    },
    {
      key: 'role', label: 'Trạng thái', align: 'center' as const, width: '130px',
      render: () => <span className="admin-status admin-status--active">Hoạt động</span>,
    },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Quản Lý Khách Hàng</h1>
          <p className="admin-page__subtitle">Xem và quản lý tài khoản khách hàng trên hệ thống</p>
        </div>
        <div className="admin-page-header__actions">
          <span className="admin-page__meta">{formatNumber(customers.length)} khách hàng</span>
        </div>
      </div>

      <div className="admin-section">
        <AdminDataTable
          columns={columns}
          data={customers}
          rowKey="id"
          filterable
          filterOptions={STATUS_OPTIONS}
          currentFilter={filter}
          searchable
          searchableFields={['name', 'email', 'phone', 'address']}
          actions={(record) => (
            <>
              <button className="btn btn-sm btn-secondary" onClick={() => navigate(`/admin/customers/${(record as User).id}`)}>Chi tiết</button>
              <button className="btn btn-sm btn-outline" onClick={() => navigate(`/admin/customers/${(record as User).id}`)}>Khóa</button>
            </>
          )}
          emptyText="Không có khách hàng nào"
        />
      </div>
    </div>
  );
};
