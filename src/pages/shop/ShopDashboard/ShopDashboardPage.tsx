import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../../../components/breadcrumb';
import { mockApi } from '../../../services';
import type { Product } from '../../../types';
import './ShopDashboardPage.css';

export const ShopDashboardPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    mockApi.getFeaturedProducts().then(data => {
      setProducts(data);
    });
  }, []);

  const totalRevenue = 156_890_000;
  const todayRevenue = 12_500_000;
  const todayOrders = 8;
  const pendingOrders = 23;

  const recentOrders = [
    { id: 'SHOP-001', customer: 'Nguyễn Văn A', phone: '0901234567', items: 2, amount: '42,990,000đ', status: 'Chờ xác nhận', statusColor: '#F59E0B', date: '10 phút trước' },
    { id: 'SHOP-002', customer: 'Trần Thị B', phone: '0934567890', items: 1, amount: '18,990,000đ', status: 'Đã xác nhận', statusColor: '#3B82F6', date: '30 phút trước' },
    { id: 'SHOP-003', customer: 'Lê Văn C', phone: '0912345678', items: 3, amount: '89,990,000đ', status: 'Đang đóng gói', statusColor: '#8B5CF6', date: '1 giờ trước' },
    { id: 'SHOP-004', customer: 'Phạm Thị D', phone: '0987654321', items: 1, amount: '34,990,000đ', status: 'Đang vận chuyển', statusColor: '#06B6D4', date: '2 giờ trước' },
    { id: 'SHOP-005', customer: 'Hoàng Văn E', phone: '0971234567', items: 2, amount: '52,990,000đ', status: 'Đã giao', statusColor: '#10B981', date: '5 giờ trước' },
  ];

  const topProducts = products.slice(0, 5).map(p => ({ name: p.name, sold: p.sold, revenue: (p.price * p.sold).toLocaleString('vi-VN') + 'đ', img: p.images[0] }));

  return (
    <div className="shop-dashboard">
      <Breadcrumb />
      <div className="shop-dashboard__header">
        <div>
          <h1 className="shop-dashboard__title">Tổng Quan Cửa Hàng</h1>
          <p className="shop-dashboard__subtitle">
            Chào mừng bạn quay trở lại! Cửa hàng đang hoạt động tốt.
          </p>
        </div>
        <div className="shop-dashboard__date">
          {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stats */}
      <div className="shop-dashboard__stats">
        {[
          { label: 'Doanh thu tháng', value: totalRevenue.toLocaleString('vi-VN') + 'đ', change: '+18.5%', icon: '💰', color: '#4F46E5', bg: 'rgba(79,70,229,0.08)' },
          { label: 'Doanh thu hôm nay', value: todayRevenue.toLocaleString('vi-VN') + 'đ', change: '+5.2%', icon: '📈', color: '#06B6D4', bg: 'rgba(6,182,212,0.08)' },
          { label: 'Đơn hàng hôm nay', value: todayOrders.toString(), change: '+3 đơn', icon: '📦', color: '#10B981', bg: 'rgba(16,185,129,0.08)' },
          { label: 'Chờ xử lý', value: pendingOrders.toString(), change: 'Cần xử lý ngay', icon: '⏳', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
        ].map((s, i) => (
          <div key={i} className="stat-card card">
            <div className="stat-card__icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div className="stat-card__info">
              <p className="stat-card__label">{s.label}</p>
              <p className="stat-card__value">{s.value}</p>
              <span className="stat-card__change">{s.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="shop-dashboard__grid">
        <div className="card">
          <div className="card__header">
            <h3>Đơn hàng gần đây</h3>
            <Link to="/shop/orders" className="btn btn-sm btn-outline">Xem tất cả</Link>
          </div>
          <div className="order-table">
            <div className="order-table__head">
              <span>Mã đơn</span>
              <span>Khách hàng</span>
              <span>SL</span>
              <span>Tổng tiền</span>
              <span>Trạng thái</span>
              <span>Thao tác</span>
            </div>
            {recentOrders.map(order => (
              <div key={order.id} className="order-table__row">
                <span className="order-table__id">{order.id}</span>
                <div className="order-table__customer">
                  <strong>{order.customer}</strong>
                  <small>{order.phone}</small>
                </div>
                <span>{order.items}</span>
                <span className="order-table__amount">{order.amount}</span>
                <span className="badge" style={{ background: `${order.statusColor}15`, color: order.statusColor }}>{order.status}</span>
                <Link to={`/shop/orders/${order.id}`} className="btn btn-sm btn-primary">Chi tiết</Link>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="card mb-4">
            <div className="card__header">
              <h3>Sản phẩm bán chạy</h3>
              <Link to="/shop/products" className="btn btn-sm btn-outline">Xem tất cả</Link>
            </div>
            <div className="top-products">
              {topProducts.map((p, i) => (
                <div key={i} className="top-product">
                  <span className="top-product__rank">{i + 1}</span>
                  <img src={p.img} alt={p.name} className="top-product__img" loading="lazy" />
                  <div className="top-product__info">
                    <p className="top-product__name">{p.name}</p>
                    <p className="top-product__sold">{p.sold} đã bán</p>
                  </div>
                  <span className="top-product__revenue">{p.revenue}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="mb-4">Thao tác nhanh</h3>
            <div className="quick-actions">
              <Link to="/shop/products/post" className="quick-action">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="12" y1="11" x2="12" y2="17"/></svg>
                Thêm sản phẩm mới
              </Link>
              <Link to="/shop/orders" className="quick-action">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="16" y1="10" x2="8" y2="10"/></svg>
                Xử lý đơn hàng
              </Link>
              <Link to="/shop/promotions" className="quick-action">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Tạo khuyến mãi
              </Link>
              <Link to="/shop/reports" className="quick-action">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                Xem báo cáo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
