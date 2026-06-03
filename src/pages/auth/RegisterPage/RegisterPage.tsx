import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts';
import { ROUTES } from '../../../constants/routes';
import './RegisterPage.css';

export const RegisterPage = () => {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Vui lòng nhập họ tên.';
    if (!form.email.trim()) errs.email = 'Vui lòng nhập email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email không hợp lệ.';
    if (!form.phone.trim()) errs.phone = 'Vui lòng nhập số điện thoại.';
    else if (!/^0[0-9]{9}$/.test(form.phone.replace(/\s/g, ''))) errs.phone = 'Số điện thoại không hợp lệ.';
    if (!form.password) errs.password = 'Vui lòng nhập mật khẩu.';
    else if (form.password.length < 6) errs.password = 'Mật khẩu phải tối thiểu 6 ký tự.';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Mật khẩu xác nhận không khớp.';
    if (!agreed) errs.agreed = 'Bạn cần đồng ý với điều khoản sử dụng.';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    const result = await register({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    });
    if (result.success) {
      navigate(ROUTES.LOGIN);
    } else {
      setErrors({ email: result.message });
    }
  };

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [key]: e.target.value });
      if (errors[key]) setErrors({ ...errors, [key]: '' });
    },
  });

  return (
    <div className="register-page">
      <div className="register-page__header">
        <h2 className="register-page__title">Tạo tài khoản</h2>
        <p className="register-page__subtitle">Đăng ký để nhận nhiều ưu đãi từ HenzoStore</p>
      </div>

      <form className="register-page__form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">Họ và tên</label>
          <input type="text" className={`input ${errors.name ? 'input-error' : ''}`} placeholder="Nhập họ và tên" {...field('name')} />
          {errors.name && <span className="input-error-message">{errors.name}</span>}
        </div>

        <div className="input-group">
          <label className="input-label">Email</label>
          <input type="email" className={`input ${errors.email ? 'input-error' : ''}`} placeholder="Nhập email" {...field('email')} autoComplete="email" />
          {errors.email && <span className="input-error-message">{errors.email}</span>}
        </div>

        <div className="input-group">
          <label className="input-label">Số điện thoại</label>
          <input type="tel" className={`input ${errors.phone ? 'input-error' : ''}`} placeholder="0xxx xxx xxx" {...field('phone')} />
          {errors.phone && <span className="input-error-message">{errors.phone}</span>}
        </div>

        <div className="input-group">
          <label className="input-label">Mật khẩu</label>
          <div className="input-wrapper">
            <input type={showPass ? 'text' : 'password'} className={`input ${errors.password ? 'input-error' : ''}`} placeholder="Tối thiểu 6 ký tự" {...field('password')} autoComplete="new-password" />
            <button type="button" className="input-toggle" onClick={() => setShowPass(!showPass)}>
              {showPass ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
          {errors.password && <span className="input-error-message">{errors.password}</span>}
        </div>

        <div className="input-group">
          <label className="input-label">Xác nhận mật khẩu</label>
          <input type={showPass ? 'text' : 'password'} className={`input ${errors.confirmPassword ? 'input-error' : ''}`} placeholder="Nhập lại mật khẩu" {...field('confirmPassword')} autoComplete="new-password" />
          {errors.confirmPassword && <span className="input-error-message">{errors.confirmPassword}</span>}
        </div>

        <div className="input-group">
          <label className="checkbox-label">
            <input type="checkbox" checked={agreed} onChange={e => { setAgreed(e.target.checked); if (errors.agreed) setErrors({ ...errors, agreed: '' }); }} />
            <span className="checkbox-custom" />
            Tôi đồng ý với <a href="/terms" className="register-page__terms">Điều khoản sử dụng</a> và <a href="/privacy" className="register-page__terms">Chính sách bảo mật</a>
          </label>
          {errors.agreed && <span className="input-error-message">{errors.agreed}</span>}
        </div>

        <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={isLoading}>
          {isLoading ? <span className="spinner" /> : null}
          {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>
      </form>

      <p className="register-page__footer">
        Đã có tài khoản? <Link to={ROUTES.LOGIN} className="register-page__link">Đăng nhập ngay</Link>
      </p>
    </div>
  );
};
