import { useState } from 'react';
import { Breadcrumb } from '../../../components/breadcrumb';
import './ShopOrderListPage.css';

const MOCK_ORDERS = [
  { id: 'SHOP-001', customer: 'Nguyễn Văn A', phone: '0901234567', items: 2, amount: '42,990,000đ', status: 'Chờ xác nhận', statusColor: '#F59E0B', date: '2025-06-01 10:30' },
  { id: 'SHOP-002', customer: 'Trần Thị B', phone: '0934567890', items: 1, amount: '18,990,000đ', status: 'Đã xác nhận', statusColor: '#3B82F6', date: '2025-06-01 09:15' },
  { id: 'SHOP-003', customer: 'Lê Văn C', phone: '0912345678', items: 3, amount: '89,990,000đ', status: 'Đang đóng gói', statusColor: '#8B5CF6', date: '2025-05-31 16:20' },
  { id: 'SHOP-004', customer: 'Phạm Thị D', phone: '0987654321', items: 1, amount: '34,990,000đ', status: 'Đang vận chuyển', statusColor: '#06B6D4', date: '2025-05-31 14:00' },
  { id: 'SHOP-005', customer: 'Hoàng Văn E', phone: '0971234567', items: 2, amount: '52,990,000đ', status: 'Đã giao', statusColor: '#10B981', date: '2025-05-30 11:00' },
  { id: 'SHOP-006', customer: 'Vũ Thị F', phone: '0961234567', items: 1, amount: '22,990,000đ', status: 'Đã hủy', statusColor: '#EF4444', date: '2025-05-30 09:30' },
];

const STATUS_OPTIONS = ['Tất cả', 'Chờ xác nhận', 'Đã xác nhận', 'Đang đóng gói', 'Đang vận chuyển', 'Đã giao', 'Đã hủy'];

export const ShopOrderListPage = () => {
  const [orders] = useState(MOCK_ORDERS);
  const [filterStatus, setFilterStatus] = useState('Tất cả');
  const [search, setSearch] = useState('');

  const filtered = orders.filter(o => {
    const matchStatus = filterStatus === 'Tất cả' || o.status === filterStatus;
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const updateStatus = (_id: string, _newStatus: string) => {
    // Mock update - handle status update
  };

  return (
    <div className="shop-order-list-page">
      <Breadcrumb />
      <div className="shop-order-list-page__header">
        <div>
          <h1 className="shop-order-list-page__title">Quản Lý Đơn Hàng</h1>
          <p className="shop-order-list-page__subtitle">{orders.length} đơn hàng • {orders.filter(o => o.status === 'Chờ xác nhận').length} đơn chờ xử lý</p>
        </div>
      </div>

      <div className="card">
        <div className="shop-order-list-page__toolbar">
          <div className="input-group" style={{ marginBottom: 0, flex: 1 }}>
            <input type="text" className="input" placeholder="Tìm theo mã đơn, tên khách hàng..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="input" style={{ width: 'auto' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="shop-order-table">
          <div className="shop-order-table__head">
            <span>Mã đơn</span>
            <span>Khách hàng</span>
            <span>SL</span>
            <span>Tổng tiền</span>
            <span>Ngày đặt</span>
            <span>Trạng thái</span>
            <span>Thao tác</span>
          </div>
          {filtered.map(order => (
            <div key={order.id} className="shop-order-table__row">
              <span className="shop-order-table__id">{order.id}</span>
              <div className="shop-order-table__customer">
                <strong>{order.customer}</strong>
                <small>{order.phone}</small>
              </div>
              <span>{order.items}</span>
              <span className="shop-order-table__amount">{order.amount}</span>
              <span className="shop-order-table__date">{order.date}</span>
              <span className="badge" style={{ background: `${order.statusColor}15`, color: order.statusColor, width: 'fit-content' }}>{order.status}</span>
              <div className="shop-order-table__actions">
                <select
                  className="input input-sm"
                  style={{ width: 'auto', padding: '4px 8px', fontSize: '12px' }}
                  value={order.status}
                  onChange={e => updateStatus(order.id, e.target.value)}
                >
                  {STATUS_OPTIONS.filter(s => s !== 'Tất cả').map(s => <option key={s}>{s}</option>)}
                </select>
                <button className="btn btn-sm btn-outline">Chi tiết</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
