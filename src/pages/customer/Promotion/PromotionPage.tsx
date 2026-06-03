import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockApi } from '../../../services/mock/api';
import type { Promotion } from '../../../types';
import './PromotionPage.css';

const fmt = (p: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(p);

const VOUCHERS = [
  { id: 'v1', code: 'HENZO200', value: 200000, minOrder: 500000, desc: 'Giảm 200K cho đơn từ 500K', exp: '31/12/2025' },
  { id: 'v2', code: 'FLASH30', value: 30, minOrder: 1000000, desc: 'Giảm 30% tối đa 300K', exp: '30/06/2025', type: 'percent' },
  { id: 'v3', code: 'NEWUSER', value: 15, minOrder: 0, desc: 'Giảm 15% cho khách hàng mới', exp: '31/12/2025', type: 'percent' },
  { id: 'v4', code: 'FREESHIP', value: 0, minOrder: 200000, desc: 'Miễn phí vận chuyển', exp: '31/12/2025', type: 'shipping' },
];

export const PromotionPage = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    mockApi.getPromotions().then(setPromotions);
  }, []);

  const toggleSave = (id: string) => {
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="promotion-page">
      <div className="container">
        <h1 className="promotion-page__title">Khuyến mãi & Voucher</h1>

        <section className="promo-section">
          <h2 className="promo-section__title">Voucher của bạn</h2>
          <div className="voucher-grid">
            {VOUCHERS.map(v => (
              <div key={v.id} className={`voucher-card ${saved.includes(v.id) ? 'saved' : ''}`}>
                <div className="voucher-card__left">
                  <div className="voucher-card__icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/>
                      <path d="M1 10h22"/>
                    </svg>
                  </div>
                  <div className="voucher-card__value">
                    {v.type === 'percent' ? (
                      <><span>{v.value}%</span></>
                    ) : v.type === 'shipping' ? (
                      <><span>Miễn phí</span><small>Ship</small></>
                    ) : (
                      <><span>{fmt(v.value)}</span></>
                    )}
                  </div>
                </div>
                <div className="voucher-card__right">
                  <span className="voucher-card__code">{v.code}</span>
                  <span className="voucher-card__desc">{v.desc}</span>
                  <span className="voucher-card__min">Đơn tối thiểu: {v.minOrder === 0 ? 'Không giới hạn' : fmt(v.minOrder)}</span>
                  <span className="voucher-card__exp">Hết hạn: {v.exp}</span>
                  <button className="btn btn-primary btn-sm" onClick={() => toggleSave(v.id)}>
                    {saved.includes(v.id) ? 'Đã lưu' : 'Lưu Voucher'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="promo-section">
          <h2 className="promo-section__title">Khuyến mãi đang diễn ra</h2>
          <div className="promo-grid">
            {promotions.map(p => (
              <div key={p.id} className="promo-card card">
                <div className="promo-card__image">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <span className="promo-card__badge">-{p.discount}%</span>
                </div>
                <div className="promo-card__content">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <Link to="/products" className="btn btn-primary btn-sm">Xem sản phẩm</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
