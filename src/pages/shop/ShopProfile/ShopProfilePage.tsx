import { useState } from 'react';
import { Breadcrumb } from '../../../components/breadcrumb';
import { useAuth } from '../../../contexts/AuthContext';
import './ShopProfilePage.css';

export const ShopProfilePage = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    storeName: 'Henzo Tech Store',
    phone: '0909876543',
    email: 'shop@henzo.com',
    address: '456 Lê Lợi, Quận 1, TP.HCM',
    description: 'Chuyên cung cấp các sản phẩm công nghệ chính hãng với giá tốt nhất thị trường.',
    bankName: 'Vietcombank',
    bankAccount: '1234567890',
    bankHolder: 'NGUYEN VAN SHOP',
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [field]: e.target.value }));

  const handleSave = (e: React.FormEvent) => { e.preventDefault(); alert('Cập nhật cửa hàng thành công!'); };

  return (
    <div className="shop-profile-page">
      <Breadcrumb />
      <h1 className="page-heading">Cài Đặt Cửa Hàng</h1>
      <div className="shop-profile-page__grid">
        <div className="card">
          <h3 className="mb-4">Thông tin cửa hàng</h3>
          <div className="shop-profile-page__avatar-section">
            <img src={user?.avatar} alt="Shop" className="shop-profile-page__avatar" />
            <button className="btn btn-outline btn-sm">Đổi avatar</button>
          </div>
          <form onSubmit={handleSave} className="shop-profile-page__form">
            <div className="input-group"><label className="input-label">Tên cửa hàng</label><input className="input" value={form.storeName} onChange={handleChange('storeName')} /></div>
            <div className="shop-profile-page__row">
              <div className="input-group"><label className="input-label">Số điện thoại</label><input className="input" value={form.phone} onChange={handleChange('phone')} /></div>
              <div className="input-group"><label className="input-label">Email</label><input className="input" value={form.email} onChange={handleChange('email')} /></div>
            </div>
            <div className="input-group"><label className="input-label">Địa chỉ</label><input className="input" value={form.address} onChange={handleChange('address')} /></div>
            <div className="input-group"><label className="input-label">Mô tả</label><textarea className="input" rows={3} value={form.description} onChange={handleChange('description')} /></div>
            <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
          </form>
        </div>
        <div>
          <div className="card mb-4">
            <h3 className="mb-4">Thông tin ngân hàng</h3>
            <div className="input-group"><label className="input-label">Ngân hàng</label><input className="input" value={form.bankName} onChange={handleChange('bankName')} /></div>
            <div className="input-group"><label className="input-label">Số tài khoản</label><input className="input" value={form.bankAccount} onChange={handleChange('bankAccount')} /></div>
            <div className="input-group"><label className="input-label">Tên chủ tài khoản</label><input className="input" value={form.bankHolder} onChange={handleChange('bankHolder')} /></div>
            <button className="btn btn-primary" onClick={() => alert('Cập nhật thành công!')}>Lưu ngân hàng</button>
          </div>
          <div className="card">
            <h3 className="mb-4">Bảo mật</h3>
            <button className="btn btn-outline btn-full mb-3">Đổi mật khẩu</button>
            <button className="btn btn-outline btn-full">Bật xác thực 2 lớp (2FA)</button>
          </div>
        </div>
      </div>
    </div>
  );
};
