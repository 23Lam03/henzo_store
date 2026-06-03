import { useState } from 'react';
import { Breadcrumb } from '../../../components/breadcrumb';
import './ShopSupportPage.css';

const MESSAGES = [
  { id: '1', customer: 'Nguyễn Văn A', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=A', message: 'Cho mình hỏi iPhone 16 Pro Max có hỗ trợ eSIM không?', time: '10:30', unread: true },
  { id: '2', customer: 'Trần Thị B', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=B', message: 'Đơn hàng của mình đang ở đâu vậy ạ?', time: '09:15', unread: true },
  { id: '3', customer: 'Lê Văn C', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=C', message: 'Cảm ơn shop, máy chạy rất tốt!', time: 'Hôm qua', unread: false },
];

export const ShopSupportPage = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [reply, setReply] = useState('');

  const active = MESSAGES.find(m => m.id === selected) || MESSAGES[0];

  return (
    <div className="shop-support-page">
      <Breadcrumb />
      <h1 className="page-heading">Hỗ Trợ Khách Hàng</h1>
      <div className="shop-support-page__layout card">
        <div className="shop-support-page__sidebar">
          <div className="support-search">
            <input type="text" className="input" placeholder="Tìm kiếm tin nhắn..." />
          </div>
          <div className="support-conversations">
            {MESSAGES.map(m => (
              <div
                key={m.id}
                className={`conversation-item ${active.id === m.id ? 'active' : ''} ${m.unread ? 'unread' : ''}`}
                onClick={() => setSelected(m.id)}
              >
                <img src={m.avatar} alt={m.customer} className="conversation-item__avatar" />
                <div className="conversation-item__info">
                  <p className="conversation-item__name">{m.customer}</p>
                  <p className="conversation-item__preview">{m.message}</p>
                </div>
                {m.unread && <div className="conversation-item__unread-dot" />}
              </div>
            ))}
          </div>
        </div>
        <div className="shop-support-page__chat">
          <div className="chat-header">
            <img src={active.avatar} alt={active.customer} className="chat-header__avatar" />
            <div>
              <p className="chat-header__name">{active.customer}</p>
              <p className="chat-header__time">{active.time}</p>
            </div>
          </div>
          <div className="chat-messages">
            <div className="chat-message chat-message--received">
              <p className="chat-message__text">{active.message}</p>
              <span className="chat-message__time">{active.time}</span>
            </div>
            <div className="chat-message chat-message--sent">
              <p className="chat-message__text">Cảm ơn bạn đã liên hệ! Shop sẽ phản hồi trong giây lát.</p>
              <span className="chat-message__time">10:32</span>
            </div>
          </div>
          <div className="chat-input">
            <input type="text" className="input" placeholder="Nhập tin nhắn..." value={reply} onChange={e => setReply(e.target.value)} />
            <button className="btn btn-primary">Gửi</button>
          </div>
        </div>
      </div>
    </div>
  );
};
