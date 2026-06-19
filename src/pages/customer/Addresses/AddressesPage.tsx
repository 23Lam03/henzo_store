import { useState } from 'react';
import './AddressesPage.css';

interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  isDefault: boolean;
}

const INITIAL_ADDRESSES: Address[] = [
  {
    id: '1',
    label: 'Nhà riêng',
    name: 'Nguyễn Văn Minh',
    phone: '0901 234 567',
    address: '123 Nguyễn Trãi, Phường Bến Thành',
    city: 'TP. Hồ Chí Minh',
    district: 'Quận 1',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Văn phòng',
    name: 'Nguyễn Văn Minh',
    phone: '0901 234 567',
    address: '456 Trần Duy Hưng, Phường Yên Hoà',
    city: 'Hà Nội',
    district: 'Quận Cầu Giấy',
    isDefault: false,
  },
];

export const AddressesPage = () => {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Address, 'id'>>({
    label: '', name: '', phone: '', address: '', city: '', district: '', isDefault: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.label.trim()) e.label = 'Vui lòng nhập nhãn (VD: Nhà riêng)';
    if (!form.name.trim()) e.name = 'Vui lòng nhập họ tên';
    if (!form.phone.trim()) e.phone = 'Vui lòng nhập số điện thoại';
    else if (!/^[0-9]{10,11}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Số điện thoại không hợp lệ';
    if (!form.address.trim()) e.address = 'Vui lòng nhập địa chỉ';
    if (!form.city.trim()) e.city = 'Vui lòng chọn tỉnh/thành phố';
    if (!form.district.trim()) e.district = 'Vui lòng chọn quận/huyện';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    if (editingId) {
      setAddresses(prev => prev.map(a => a.id === editingId ? { ...form, id: editingId } : a));
      setEditingId(null);
    } else {
      setAddresses(prev => [...prev, { ...form, id: Date.now().toString() }]);
    }
    setShowForm(false);
    setForm({ label: '', name: '', phone: '', address: '', city: '', district: '', isDefault: false });
    setErrors({});
  };

  const handleEdit = (addr: Address) => {
    setForm(addr);
    setEditingId(addr.id);
    setShowForm(true);
    setErrors({});
  };

  const handleDelete = (id: string) => {
    if (confirm('Xóa địa chỉ này?')) {
      setAddresses(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <div className="addresses-page container">
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Địa chỉ giao hàng</h1>
          <p className="page-header__subtitle">Quản lý danh sách địa chỉ nhận hàng của bạn</p>
        </div>
        {!showForm && (
          <button className="btn btn-primary" onClick={() => { setShowForm(true); setEditingId(null); setForm({ label: '', name: '', phone: '', address: '', city: '', district: '', isDefault: false }); setErrors({}); }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Thêm địa chỉ
          </button>
        )}
      </div>

      {showForm && (
        <div className="card addresses-form-card">
          <h3 className="card-header__title">{editingId ? 'Sửa địa chỉ' : 'Thêm địa chỉ mới'}</h3>
          <form className="addresses-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row-2">
              <div className="input-group">
                <label className="input-label">Nhãn <span>*</span></label>
                <input type="text" className={`input ${errors.label ? 'input--error' : ''}`} placeholder="VD: Nhà riêng, Văn phòng" value={form.label} onChange={e => setForm(p => ({ ...p, label: e.target.value }))} />
                {errors.label && <span className="input-error">{errors.label}</span>}
              </div>
              <div className="input-group">
                <label className="input-label">Họ tên <span>*</span></label>
                <input type="text" className={`input ${errors.name ? 'input--error' : ''}`} placeholder="Họ và tên người nhận" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                {errors.name && <span className="input-error">{errors.name}</span>}
              </div>
            </div>
            <div className="form-row-2">
              <div className="input-group">
                <label className="input-label">Số điện thoại <span>*</span></label>
                <input type="tel" className={`input ${errors.phone ? 'input--error' : ''}`} placeholder="0901 234 567" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                {errors.phone && <span className="input-error">{errors.phone}</span>}
              </div>
              <div className="input-group">
                <label className="input-label">Tỉnh/Thành phố <span>*</span></label>
                <input type="text" className={`input ${errors.city ? 'input--error' : ''}`} placeholder="VD: TP. Hồ Chí Minh" value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} />
                {errors.city && <span className="input-error">{errors.city}</span>}
              </div>
            </div>
            <div className="form-row-2">
              <div className="input-group">
                <label className="input-label">Quận/Huyện <span>*</span></label>
                <input type="text" className={`input ${errors.district ? 'input--error' : ''}`} placeholder="VD: Quận 1" value={form.district} onChange={e => setForm(p => ({ ...p, district: e.target.value }))} />
                {errors.district && <span className="input-error">{errors.district}</span>}
              </div>
              <div className="input-group">
                <label className="input-label">Địa chỉ cụ thể <span>*</span></label>
                <input type="text" className={`input ${errors.address ? 'input--error' : ''}`} placeholder="Số nhà, đường, phường/xã" value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} />
                {errors.address && <span className="input-error">{errors.address}</span>}
              </div>
            </div>
            <label className="addresses-form__default">
              <input type="checkbox" checked={form.isDefault} onChange={e => setForm(p => ({ ...p, isDefault: e.target.checked }))} />
              Đặt làm địa chỉ mặc định
            </label>
            <div className="addresses-form__actions">
              <button type="submit" className="btn btn-primary">{editingId ? 'Lưu thay đổi' : 'Thêm địa chỉ'}</button>
              <button type="button" className="btn btn-outline" onClick={() => { setShowForm(false); setEditingId(null); setErrors({}); }}>Hủy</button>
            </div>
          </form>
        </div>
      )}

      <div className="addresses-list">
        {addresses.length === 0 && !showForm && (
          <div className="addresses-empty card">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <p>Chưa có địa chỉ nào. Thêm địa chỉ giao hàng đầu tiên của bạn.</p>
          </div>
        )}
        {addresses.map(addr => (
          <div key={addr.id} className={`address-card card ${addr.isDefault ? 'address-card--default' : ''}`}>
            {addr.isDefault && <span className="address-card__badge">Mặc định</span>}
            <div className="address-card__header">
              <span className="address-card__label">{addr.label}</span>
              <div className="address-card__actions">
                <button className="address-card__action-btn" onClick={() => handleEdit(addr)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Sửa
                </button>
                {!addr.isDefault && (
                  <>
                    <button className="address-card__action-btn" onClick={() => handleSetDefault(addr.id)}>Đặt mặc định</button>
                    <button className="address-card__action-btn address-card__action-btn--danger" onClick={() => handleDelete(addr.id)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                      Xóa
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="address-card__body">
              <p className="address-card__name">{addr.name}</p>
              <p className="address-card__phone">{addr.phone}</p>
              <p className="address-card__address">{addr.address}, {addr.district}, {addr.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
