import { useState } from 'react';
import { useAdmin } from '../../../contexts/AdminContext';
import { AdminDataTable } from '../../../components/admin/AdminDataTable';
import type { Promotion } from '../../../types';
import './AdminPromotionPage.css';

const TYPE_OPTIONS = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Giảm giá sản phẩm', value: 'product' },
  { label: 'Mã giảm giá', value: 'voucher' },
  { label: 'Flash Sale', value: 'flashsale' },
  { label: 'Voucher', value: 'voucher2' },
];

const STATUS_OPTIONS = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Đang hoạt động', value: 'active' },
  { label: 'Sắp diễn ra', value: 'upcoming' },
  { label: 'Đã kết thúc', value: 'ended' },
];

const TYPE_LABELS = ['Giảm giá sản phẩm', 'Mã giảm giá', 'Flash Sale', 'Voucher', 'Quà tặng kèm', 'Free Ship'];

const getPromoStatus = (promo: Promotion): { label: string; key: string } => {
  const now = new Date();
  const start = new Date(promo.startDate);
  const end = new Date(promo.endDate);
  if (now < start) return { label: 'Sắp diễn ra', key: 'upcoming' };
  if (now > end) return { label: 'Đã kết thúc', key: 'ended' };
  return { label: 'Đang hoạt động', key: 'active' };
};

const getPromoType = (id: string): string => {
  const idx = parseInt(id.replace(/\D/g, '')) || 0;
  return TYPE_LABELS[idx % TYPE_LABELS.length];
};

export const AdminPromotionPage = () => {
  const { promotions } = useAdmin();
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const enrichedPromos = promotions.map(p => ({
    ...p,
    statusInfo: getPromoStatus(p),
    typeLabel: getPromoType(p.id),
  }));

  const filtered = enrichedPromos.filter(p =>
    (typeFilter === 'all' || p.typeLabel === typeFilter) &&
    (statusFilter === 'all' || p.statusInfo.key === statusFilter)
  );

  const columns = [
    {
      key: 'title', label: 'Chương trình', sortable: true,
      render: (_: unknown, r: Promotion & { typeLabel: string; statusInfo: { label: string; key: string } }) => (
        <div className="promo-cell">
          <p className="promo-title">{(r as Promotion).title}</p>
          {(r as Promotion).code && <code className="promo-code">{(r as Promotion).code}</code>}
        </div>
      ),
    },
    {
      key: 'type', label: 'Loại',
      render: (_: unknown, r: Promotion & { typeLabel: string }) => (
        <span className="badge badge-secondary">{(r as Promotion & { typeLabel: string }).typeLabel}</span>
      ),
    },
    {
      key: 'discount', label: 'Giảm', align: 'center' as const, width: '100px',
      render: (_: unknown, r: Promotion) => (
        <span className="promo-discount">-{r.discount}%</span>
      ),
    },
    {
      key: 'dates', label: 'Thời gian',
      render: (_: unknown, r: Promotion) => (
        <div className="promo-dates">
          <span>{new Date(r.startDate).toLocaleDateString('vi-VN')}</span>
          <span className="promo-dates-arrow">→</span>
          <span>{new Date(r.endDate).toLocaleDateString('vi-VN')}</span>
        </div>
      ),
    },
    {
      key: 'isActive', label: 'Trạng thái', align: 'center' as const, width: '130px',
      render: (_: unknown, r: Promotion & { statusInfo: { label: string; key: string } }) => {
        const s = (r as Promotion & { statusInfo: { label: string; key: string } }).statusInfo;
        return <span className={`admin-status admin-status--${s.key === 'active' ? 'active' : s.key === 'upcoming' ? 'new' : 'locked'}`}>{s.label}</span>;
      },
    },
    {
      key: 'created', label: 'Ngày tạo', sortable: true, width: '110px',
      render: (_: unknown, r: Promotion) => new Date(r.startDate).toLocaleDateString('vi-VN'),
    },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Quản Lý Khuyến Mãi</h1>
          <p className="admin-page__subtitle">Tạo và quản lý các chương trình khuyến mãi trên hệ thống</p>
        </div>
        <div className="admin-page-header__actions">
          <span className="admin-page__meta">{promotions.length} chương trình</span>
          <button className="btn btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Tạo khuyến mãi
          </button>
        </div>
      </div>

      <div className="admin-section">
        <div className="promo-filter-bar">
          <div className="promo-filter-group">
            <label>Loại khuyến mãi:</label>
            <select className="admin-form-select promo-filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
              {TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="promo-filter-group">
            <label>Trạng thái:</label>
            <select className="admin-form-select promo-filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
        <AdminDataTable
          columns={columns}
          data={filtered}
          rowKey="id"
          searchable
          searchableFields={['title', 'code', 'description']}
          actions={() => (
            <>
              <button className="btn btn-sm btn-secondary">Chi tiết</button>
              <button className="btn btn-sm btn-outline">Sửa</button>
              <button className="btn btn-sm btn-outline" style={{ color: 'var(--color-danger)' }}>Xóa</button>
            </>
          )}
          emptyText="Không có chương trình khuyến mãi nào"
        />
      </div>
    </div>
  );
};
