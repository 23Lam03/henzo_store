import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts';
import { ROUTES } from '../../../constants/routes';
import './CartPage.css';

const fmt = (p: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(p);

export const CartPage = () => {
  const { items, updateQuantity, removeItem, toggleSelect, selectAll } = useCart();
  const navigate = useNavigate();

  const selectedItems = items.filter(i => i.selected);
  const selectedTotal = selectedItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const selectedOriginalTotal = selectedItems.reduce((s, i) => s + i.product.originalPrice * i.quantity, 0);

  const allSelected = items.length > 0 && items.every(i => i.selected);

  if (items.length === 0) {
    return (
      <div className="cart-page cart-page--empty">
        <div className="cart-empty">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <h2>Giỏ hàng trống</h2>
          <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm.</p>
          <Link to={ROUTES.PRODUCTS} className="btn btn-primary btn-lg">Khám phá sản phẩm</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-page__title">Giỏ hàng ({items.length} sản phẩm)</h1>

        <div className="cart-page__layout">
          <div className="cart-page__items">
            <div className="cart-header">
              <label className="cart-select-all">
                <input type="checkbox" checked={allSelected} onChange={() => selectAll(!allSelected)} />
                <span className="checkbox-custom" />
                Chọn tất cả ({items.length})
              </label>
            </div>

            {items.map(item => (
              <div key={item.product.id} className="cart-item card">
                <label className="cart-item__check">
                  <input type="checkbox" checked={item.selected} onChange={() => toggleSelect(item.product.id)} />
                  <span className="checkbox-custom" />
                </label>

                <Link to={`/products/${item.product.slug}`} className="cart-item__image">
                  <img src={item.product.images[0]} alt={item.product.name} loading="lazy" />
                </Link>

                <div className="cart-item__info">
                  <Link to={`/products/${item.product.slug}`} className="cart-item__name">
                    {item.product.name}
                  </Link>
                  <span className="cart-item__brand">{item.product.brand}</span>

                  <div className="cart-item__price">
                    {item.product.discount > 0 && (
                      <span className="price-original">{fmt(item.product.originalPrice)}</span>
                    )}
                    <span className="price-current">{fmt(item.product.price)}</span>
                  </div>
                </div>

                <div className="cart-item__actions">
                  <div className="qty-control">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} disabled={item.quantity >= item.product.stock}>+</button>
                  </div>
                  <span className="cart-item__subtotal">{fmt(item.product.price * item.quantity)}</span>
                  <button className="cart-item__remove" onClick={() => removeItem(item.product.id)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-page__summary">
            <div className="cart-summary card">
              <h3 className="cart-summary__title">Tổng cộng</h3>

              <div className="cart-summary__row">
                <span>Tạm tính ({selectedItems.length} sản phẩm)</span>
                <span>{fmt(selectedTotal)}</span>
              </div>

              <div className="cart-summary__row cart-summary__row--saving">
                <span>Tiết kiệm</span>
                <span className="text-success">-{fmt(selectedOriginalTotal - selectedTotal)}</span>
              </div>

              <div className="cart-summary__row cart-summary__row--shipping">
                <span>Phí vận chuyển</span>
                <span>{selectedTotal >= 500000 ? 'Miễn phí' : fmt(30000)}</span>
              </div>

              <div className="cart-summary__divider" />

              <div className="cart-summary__row cart-summary__row--total">
                <span>Tổng</span>
                <span>{fmt(selectedTotal >= 500000 ? selectedTotal : selectedTotal + 30000)}</span>
              </div>

              <button
                className="btn btn-primary btn-full btn-lg"
                disabled={selectedItems.length === 0}
                onClick={() => navigate(ROUTES.CHECKOUT)}
              >
                Tiến hành đặt hàng ({selectedItems.length})
              </button>

              <Link to={ROUTES.PRODUCTS} className="btn btn-secondary btn-full">
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
