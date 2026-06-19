import { useState } from 'react';
import { useSeller } from '../../../contexts/SellerContext';
import { useToast } from '../../../contexts/ToastContext/ToastContext';
import { ConfirmModal } from '../../../components/common/ConfirmModal';
import './ShopPromotionsPage.css';

const formatVND = (n: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n);

const TYPE_CONFIG: Record<string, { label: string; cls: string; icon: string }> = {
  voucher: { label: 'Voucher', cls: 'badge-primary', icon: '🎫' },
  flash_sale: { label: 'Flash Sale', cls: 'badge-danger', icon: '⚡' },
  combo: { label: 'Combo', cls: 'badge-accent', icon: '📦' },
  discount_campaign: { label: 'Chiến dịch', cls: 'badge-warning', icon: '🏷️' },
};

const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  active: { label: 'Đang hoạt động', cls: 'badge-success' },
  paused: { label: 'Tạm dừng', cls: 'badge-warning' },
  ended: { label: 'Đã kết thúc', cls: 'badge-dark' },
  draft: { label: 'Bản nháp', cls: 'badge-dark' },
};

type PromoType = 'voucher' | 'flash_sale' | 'combo' | 'discount_campaign';
type DiscountType = 'percent' | 'fixed';

const EMPTY_FORM = {
  name: '', type: 'voucher' as PromoType, code: '', discountType: 'percent' as DiscountType,
  discountValue: 0, minOrderValue: 0, maxDiscount: 0,
  startDate: '', endDate: '', usageLimit: 0,
};

export const ShopPromotionsPage = () => {
  const { promotions, updatePromotionStatus, createPromotion } = useSeller();
  const toast = useToast();
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingPromo, setEditingPromo] = useState<typeof EMPTY_FORM>(EMPTY_FORM);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const filtered = promotions.filter(p => {
    if (typeFilter !== 'all' && p.type !== typeFilter) return false;
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    return true;
  });

  const handleSave = () => {
    if (!editingPromo.name || !editingPromo.code) return;
    createPromotion({
      ...editingPromo,
      storeId: 'store-0001',
      status: 'active' as const,
      targetProducts: [],
      targetCategories: [],
    });
    setShowModal(false);
    setEditingPromo(EMPTY_FORM);
  };

  const openCreate = () => {
    setEditingPromo(EMPTY_FORM);
    setShowModal(true);
  };

  return (
    <>
      <div className="seller-promotions admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Quản lý khuyến mãi</h1>
          <p className="admin-page__subtitle">Tạo và quản lý chương trình khuyến mãi</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Tạo khuyến mãi
        </button>
      </div>

      {/* Filters */}
      <div className="seller-promotions__filters">
        <div className="seller-filter-group">
          <label className="seller-filter-group__label">Loại:</label>
          <div className="seller-tabs" style={{ borderBottom: 'none', marginBottom: 0 }}>
            {[{ key: 'all', label: 'Tất cả' }, ...Object.entries(TYPE_CONFIG).map(([k, v]) => ({ key: k, label: v.label }))].map(t => (
              <button key={t.key} className={`seller-tab ${typeFilter === t.key ? 'seller-tab--active' : ''}`} onClick={() => setTypeFilter(t.key)}>{t.label}</button>
            ))}
          </div>
        </div>
        <div className="seller-filter-group">
          <label className="seller-filter-group__label">Trạng thái:</label>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {[{ key: 'all', label: 'Tất cả' }, ...Object.entries(STATUS_CONFIG).map(([k, v]) => ({ key: k, label: v.label }))].map(t => (
              <button key={t.key} className={`seller-filter-btn ${statusFilter === t.key ? 'seller-filter-btn--active' : ''}`} onClick={() => setStatusFilter(t.key)}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="admin-stats admin-stats--4">
        {[
          { label: 'Tổng chương trình', value: promotions.length, cls: 'badge-primary' },
          { label: 'Đang hoạt động', value: promotions.filter(p => p.status === 'active').length, cls: 'badge-success' },
          { label: 'Tạm dừng', value: promotions.filter(p => p.status === 'paused').length, cls: 'badge-warning' },
          { label: 'Đã kết thúc', value: promotions.filter(p => p.status === 'ended').length, cls: 'badge-dark' },
        ].map((s, i) => (
          <div key={i} className="seller-promotion-stat">
            <p className="seller-promotion-stat__label">{s.label}</p>
            <p className="seller-promotion-stat__value">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Promotions Grid */}
      {filtered.length === 0 ? (
        <div className="admin-section">
          <div className="seller-empty" style={{ padding: 60 }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <p>Không có chương trình khuyến mãi nào</p>
          </div>
        </div>
      ) : (
        <div className="seller-promotions__grid">
          {filtered.map(promo => {
            const tc = TYPE_CONFIG[promo.type] || TYPE_CONFIG.discount_campaign;
            const sc = STATUS_CONFIG[promo.status] || STATUS_CONFIG.draft;
            const usedPct = promo.usageLimit > 0 ? Math.min((promo.usedCount / promo.usageLimit) * 100, 100) : 0;
            const discountLabel = promo.discountType === 'percent' ? `-${promo.discountValue}%` : formatVND(promo.discountValue);

            return (
              <div key={promo.id} className={`seller-promo-card ${promo.status === 'active' ? 'seller-promo-card--active' : ''}`}>
                <div className="seller-promo-card__header">
                  <div className="seller-promo-card__badges">
                    <span className={`badge ${tc.cls}`}>{tc.label}</span>
                    <span className={`badge ${sc.cls}`}>{sc.label}</span>
                  </div>
                  <div className="seller-promo-card__discount">{discountLabel}</div>
                </div>
                <h3 className="seller-promo-card__name">{promo.name}</h3>
                <p className="seller-promo-card__code">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
                  {promo.code}
                </p>
                <div className="seller-promo-card__meta">
                  <span>🗓 {promo.startDate} → {promo.endDate}</span>
                  {promo.minOrderValue > 0 && <span>Đơn tối thiểu: {formatVND(promo.minOrderValue)}</span>}
                </div>
                <div className="seller-promo-card__usage">
                  <div className="seller-promo-card__usage-header">
                    <span>Đã sử dụng: {promo.usedCount}{promo.usageLimit > 0 ? `/${promo.usageLimit}` : ''}</span>
                    {promo.usageLimit > 0 && <span>{usedPct.toFixed(0)}%</span>}
                  </div>
                  {promo.usageLimit > 0 && (
                    <div className="seller-promo-card__usage-bar">
                      <div className="seller-promo-card__usage-fill" style={{ width: `${usedPct}%` }} />
                    </div>
                  )}
                </div>
                <div className="seller-promo-card__actions">
                  {promo.status === 'active' && (
                    <button className="seller-action-btn" onClick={() => updatePromotionStatus(promo.id, 'paused')}>Tạm dừng</button>
                  )}
                  {promo.status === 'paused' && (
                    <button className="seller-action-btn seller-action-btn--success" onClick={() => updatePromotionStatus(promo.id, 'active')}>Kích hoạt</button>
                  )}
                  <button className="seller-action-btn seller-action-btn--danger" onClick={() => setPendingDelete(promo.id)}>Xóa</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal admin-modal--lg" onClick={e => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h2 className="admin-modal__title">Tạo khuyến mãi mới</h2>
              <button className="admin-modal__close" onClick={() => setShowModal(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="admin-modal__body">
              <div className="admin-form">
                <div className="admin-form-group">
                  <label className="admin-form-label">Tên chương trình <span>*</span></label>
                  <input className="admin-form-input" placeholder="VD: Flash Sale Cuối Tuần" value={editingPromo.name} onChange={e => setEditingPromo(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Loại <span>*</span></label>
                    <select className="admin-form-select" value={editingPromo.type} onChange={e => setEditingPromo(p => ({ ...p, type: e.target.value as PromoType }))}>
                      <option value="voucher">Voucher</option>
                      <option value="flash_sale">Flash Sale</option>
                      <option value="combo">Combo</option>
                      <option value="discount_campaign">Chiến dịch giảm giá</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Mã giảm giá <span>*</span></label>
                    <input className="admin-form-input" placeholder="VD: SUMMER30" value={editingPromo.code} onChange={e => setEditingPromo(p => ({ ...p, code: e.target.value.toUpperCase() }))} />
                  </div>
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Loại giảm giá</label>
                    <select className="admin-form-select" value={editingPromo.discountType} onChange={e => setEditingPromo(p => ({ ...p, discountType: e.target.value as DiscountType }))}>
                      <option value="percent">Phần trăm (%)</option>
                      <option value="fixed">Số tiền cố định (đ)</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Giá trị giảm <span>*</span></label>
                    <input type="number" className="admin-form-input" value={editingPromo.discountValue} onChange={e => setEditingPromo(p => ({ ...p, discountValue: Number(e.target.value) }))} />
                  </div>
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Đơn hàng tối thiểu</label>
                    <input type="number" className="admin-form-input" placeholder="0 = không giới hạn" value={editingPromo.minOrderValue} onChange={e => setEditingPromo(p => ({ ...p, minOrderValue: Number(e.target.value) }))} />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Giảm tối đa</label>
                    <input type="number" className="admin-form-input" placeholder="0 = không giới hạn" value={editingPromo.maxDiscount} onChange={e => setEditingPromo(p => ({ ...p, maxDiscount: Number(e.target.value) }))} />
                  </div>
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Ngày bắt đầu <span>*</span></label>
                    <input type="date" className="admin-form-input" value={editingPromo.startDate} onChange={e => setEditingPromo(p => ({ ...p, startDate: e.target.value }))} />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Ngày kết thúc <span>*</span></label>
                    <input type="date" className="admin-form-input" value={editingPromo.endDate} onChange={e => setEditingPromo(p => ({ ...p, endDate: e.target.value }))} />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Số lượt sử dụng</label>
                  <input type="number" className="admin-form-input" placeholder="0 = không giới hạn" value={editingPromo.usageLimit} onChange={e => setEditingPromo(p => ({ ...p, usageLimit: Number(e.target.value) }))} />
                </div>
              </div>
            </div>
            <div className="admin-modal__footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Hủy</button>
              <button className="btn btn-primary" onClick={handleSave}>Tạo khuyến mãi</button>
            </div>
          </div>
        </div>
      )}
      </div>

      <ConfirmModal
        open={!!pendingDelete}
        title="Xóa khuyến mãi"
        message="Bạn có chắc muốn xóa chương trình khuyến mãi này? Hành động này không thể hoàn tác."
        confirmLabel="Xóa"
        variant="danger"
        onConfirm={() => {
          if (pendingDelete) {
            updatePromotionStatus(pendingDelete, 'ended');
            toast({ title: 'Đã xóa khuyến mãi', variant: 'success' });
            setPendingDelete(null);
          }
        }}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
};
