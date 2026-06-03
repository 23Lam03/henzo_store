import { useState } from 'react';
import { Breadcrumb } from '../../../components/breadcrumb';
import './AdminSupportPage.css';

const TICKETS = [
  { id: 'TK001', from: 'Shop Henzo Tech', type: 'Hỗ trợ kỹ thuật', subject: 'Lỗi hiển thị sản phẩm trên app', status: 'Đang xử lý', priority: 'Cao', date: '2025-06-03' },
  { id: 'TK002', from: 'Nguyễn Văn Khách', type: 'Khiếu nại', subject: 'Đơn hàng chưa được giao sau 7 ngày', status: 'Mới', priority: 'Cao', date: '2025-06-02' },
  { id: 'TK003', from: 'Shop TechPro', type: 'Yêu cầu hỗ trợ', subject: 'Hướng dẫn cập nhật thông tin cửa hàng', status: 'Đang xử lý', priority: 'Thấp', date: '2025-06-01' },
];

export const AdminSupportPage = () => {
  const [tickets] = useState(TICKETS);

  return (
    <div className="admin-support-page">
      <Breadcrumb />
      <h1 className="page-heading">Quản Lý Hỗ Trợ</h1>
      <div className="card">
        <div className="support-table">
          <div className="support-table__head"><span>Mã</span><span>Người gửi</span><span>Loại</span><span>Chủ đề</span><span>Ưu tiên</span><span>Ngày</span><span>Trạng thái</span><span></span></div>
          {tickets.map(t => (
            <div key={t.id} className="support-table__row">
              <code className="support-table__id">{t.id}</code>
              <span className="support-table__from">{t.from}</span>
              <span className="badge badge-secondary">{t.type}</span>
              <span className="support-table__subject">{t.subject}</span>
              <span className={`badge ${t.priority === 'Cao' ? 'badge-danger' : 'badge-secondary'}`}>{t.priority}</span>
              <span className="support-table__date">{new Date(t.date).toLocaleDateString('vi-VN')}</span>
              <span className={`badge ${t.status === 'Mới' ? 'badge-primary' : 'badge-warning'}`}>{t.status}</span>
              <button className="btn btn-sm btn-primary">Xem</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
