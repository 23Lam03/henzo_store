import { Breadcrumb } from '../../../components/breadcrumb';
import './ShopInventoryPage.css';

const INVENTORY = [
  { id: '1', name: 'iPhone 16 Pro Max 256GB', sku: 'IP16PM256', stock: 45, sold: 234, lowStock: false, img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100' },
  { id: '2', name: 'MacBook Pro M4 14"', sku: 'MBPM414', stock: 12, sold: 156, lowStock: false, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=100' },
  { id: '3', name: 'Samsung Galaxy S25 Ultra', sku: 'SGS25U', stock: 3, sold: 89, lowStock: true, img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100' },
  { id: '4', name: 'AirPods Pro 2', sku: 'APP2', stock: 0, sold: 445, lowStock: false, img: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=100' },
  { id: '5', name: 'ASUS ROG Laptop', sku: 'ROG-LAPTOP', stock: 8, sold: 67, lowStock: true, img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=100' },
];

export const ShopInventoryPage = () => {
  return (
    <div className="shop-inventory-page">
      <Breadcrumb />
      <div className="shop-inventory-page__header">
        <div>
          <h1 className="shop-inventory-page__title">Quản Lý Kho Hàng</h1>
          <p className="shop-inventory-page__subtitle">
            {INVENTORY.filter(i => i.stock === 0).length} sản phẩm hết hàng • {INVENTORY.filter(i => i.lowStock).length} sản phẩm sắp hết
          </p>
        </div>
      </div>

      <div className="card">
        <div className="inventory-summary">
          <div className="inventory-summary__card">
            <span className="inventory-summary__value">{INVENTORY.reduce((s, i) => s + i.stock, 0)}</span>
            <span className="inventory-summary__label">Tổng tồn kho</span>
          </div>
          <div className="inventory-summary__card inventory-summary__card--danger">
            <span className="inventory-summary__value">{INVENTORY.filter(i => i.stock === 0).length}</span>
            <span className="inventory-summary__label">Hết hàng</span>
          </div>
          <div className="inventory-summary__card inventory-summary__card--warning">
            <span className="inventory-summary__value">{INVENTORY.filter(i => i.lowStock).length}</span>
            <span className="inventory-summary__label">Sắp hết</span>
          </div>
        </div>

        <div className="inventory-table">
          <div className="inventory-table__head">
            <span>Sản phẩm</span>
            <span>SKU</span>
            <span>Tồn kho</span>
            <span>Đã bán</span>
            <span>Tình trạng</span>
            <span>Thao tác</span>
          </div>
          {INVENTORY.map(item => (
            <div key={item.id} className="inventory-table__row">
              <div className="inventory-table__product">
                <img src={item.img} alt={item.name} className="inventory-table__img" loading="lazy" />
                <span className="inventory-table__name">{item.name}</span>
              </div>
              <code className="inventory-table__sku">{item.sku}</code>
              <div className="inventory-table__stock">
                <input type="number" className="input input-sm" style={{ width: 80 }} defaultValue={item.stock} min={0} />
              </div>
              <span className="inventory-table__sold">{item.sold}</span>
              <span className={`badge ${item.stock === 0 ? 'badge-danger' : item.lowStock ? 'badge-warning' : 'badge-success'}`}>
                {item.stock === 0 ? 'Hết hàng' : item.lowStock ? 'Sắp hết' : 'Còn hàng'}
              </span>
              <button className="btn btn-sm btn-primary">Cập nhật</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
