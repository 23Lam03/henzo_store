import type {
  SellerStore, SellerOrder, SellerPayment, SellerReview,
  SellerPromotion, SellerSupportTicket, SellerInventoryItem,
  SellerShipping, SellerNotification, DailyRevenue, MonthlyData
} from '../types/seller';
import type { Product } from '../types';

const generateId = (prefix: string, n: number) => `${prefix}-${String(n).padStart(4, '0')}`;

const CUSTOMER_NAMES = [
  'Nguyễn Văn Minh', 'Trần Thị Lan', 'Lê Hoàng Nam', 'Phạm Thị Hương', 'Hoàng Văn Đức',
  'Vũ Thị Mai', 'Đặng Văn Hùng', 'Bùi Thị Xuan', 'Ngô Văn Quang', 'Dương Thị Hà',
  'Phan Thị Lan', 'Trịnh Văn Khải', 'Cao Thị Ngọc', 'Hồ Văn Tùng', 'Đỗ Thị Phương',
  'Lý Văn Bình', 'Trần Minh Tuấn', 'Nguyễn Thu Hà', 'Lê Văn Phong', 'Trần Thị Thảo',
  'Phạm Quang Huy', 'Vũ Thị Kim Anh', 'Đặng Hoàng Nam', 'Bùi Minh Đức', 'Nguyễn Thị Hường',
];

const PRODUCT_NAMES = [
  'iPhone 16 Pro Max 256GB', 'Samsung Galaxy S24 Ultra', 'MacBook Pro M3 14"', 'Dell XPS 15',
  'ASUS ROG Strix G16', 'MSI Titan 18 HX', 'iPad Pro M4 12.9"', 'AirPods Pro 2',
  'Sony WH-1000XM5', 'Logitech MX Master 3S', 'Samsung Odyssey G9', 'LG UltraWide 34"',
  'Razer DeathAdder V3', 'Keychron Q1 Pro', 'Western Digital 2TB SSD', 'Corsair RM850x',
  'NVIDIA RTX 4090', 'AMD Ryzen 9 7950X', 'Intel Core i9-14900K', 'G.Skill Trident Z5 64GB',
];

const CATEGORIES = ['Điện thoại', 'Laptop', 'PC Gaming', 'Màn hình', 'Chuột', 'Bàn phím', 'Tai nghe', 'Phụ kiện'];
const BRANDS = ['Apple', 'Samsung', 'ASUS', 'Dell', 'Lenovo', 'MSI', 'Razer', 'Logitech', 'Sony', 'Xiaomi'];
const SHIPPING_PARTNERS = ['GHTK', 'GHN', 'Viettel Post', 'VNPost', 'Ninja Van', 'GrabExpress', 'Ahamove'];
const CITIES = ['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng', 'Biên Hòa', 'Nha Trang', 'Hải Dương'];

const STATUS_LABELS: Record<string, string> = {
  pending: 'Chờ xác nhận', confirmed: 'Đã xác nhận', preparing: 'Đang chuẩn bị',
  shipped: 'Đã giao cho shipper', delivering: 'Đang vận chuyển', delivered: 'Giao thành công',
  cancelled: 'Đã hủy', returned: 'Hoàn trả',
};

const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: '#F59E0B', confirmed: '#3B82F6', preparing: '#8B5CF6',
  shipped: '#6366F1', delivering: '#06B6D4', delivered: '#10B981',
  cancelled: '#9CA3AF', returned: '#EF4444',
};

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cod: 'Thanh toán khi nhận hàng (COD)',
  banking: 'Chuyển khoản ngân hàng',
  vnpay: 'VNPay',
  momo: 'MoMo',
  zalopay: 'ZaloPay',
};

// ─── 50 Stores ──────────────────────────────────────────────────────────────────
export const mockStores: SellerStore[] = Array.from({ length: 50 }, (_, i) => {
  const n = i + 1;
  const rating = +(3.5 + Math.random() * 1.5).toFixed(1);
  const productCount = Math.floor(10 + Math.random() * 490);
  const orderCount = Math.floor(100 + Math.random() * 9900);
  return {
    id: generateId('store', n),
    name: n === 1 ? 'Henzo Tech Store' : n === 2 ? 'TechPro Shop' : `Cửa Hàng Công Nghệ ${n}`,
    email: `shop${n}@henzo.com`,
    phone: `09${String(Math.floor(10000000 + Math.random() * 90000000))}`,
    address: `${Math.floor(1 + Math.random() * 999)} Lê Lợi, ${CITIES[Math.floor(Math.random() * CITIES.length)]}`,
    avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=store${n}`,
    banner: `https://images.unsplash.com/photo-${1550000000000 + n * 1000}?w=1200&h=300&fit=crop`,
    rating,
    productCount,
    orderCount,
    followerCount: Math.floor(50 + Math.random() * 4950),
    isVerified: n <= 30,
    status: n <= 45 ? 'active' : n <= 48 ? 'inactive' : 'suspended',
    createdAt: new Date(2022, Math.floor(Math.random() * 24), Math.floor(1 + Math.random() * 28)).toISOString(),
    description: `Chuyên cung cấp các sản phẩm công nghệ chính hãng với giá tốt nhất thị trường.`,
    taxId: `0${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    bankAccount: `0${Math.floor(100000000000 + Math.random() * 900000000000)}`,
    bankName: ['Vietcombank', 'Techcombank', 'ACB', 'MB Bank', 'VPBank'][Math.floor(Math.random() * 5)],
  };
});

// Default store (shop@henzo.com)
export const currentStore = mockStores[0];

// ─── 500 Products ───────────────────────────────────────────────────────────────
export const mockSellerProducts: Product[] = Array.from({ length: 500 }, (_, i) => {
  const n = i + 1;
  const basePrice = Math.floor(500000 + Math.random() * 50000000);
  const hasDiscount = Math.random() > 0.4;
  const originalPrice = hasDiscount ? Math.floor(basePrice * (1.1 + Math.random() * 0.4)) : basePrice;
  const discount = hasDiscount ? Math.floor((1 - basePrice / originalPrice) * 100) : 0;
  const stock = Math.floor(Math.random() * 500);
  const sold = Math.floor(Math.random() * 200);
  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  const brand = BRANDS[Math.floor(Math.random() * BRANDS.length)];
  return {
    id: generateId('seller-prod', n),
    name: PRODUCT_NAMES[Math.floor(Math.random() * PRODUCT_NAMES.length)] + ` ${n}`,
    slug: `product-${n}-${brand.toLowerCase()}`.replace(/\s+/g, '-'),
    description: `Mô tả chi tiết sản phẩm ${n}. Sản phẩm chất lượng cao, bảo hành chính hãng 12 tháng.`,
    price: basePrice,
    originalPrice,
    discount,
    images: [
      `https://images.unsplash.com/photo-${1550000000000 + n * 1000}?w=600`,
      `https://images.unsplash.com/photo-${1551000000000 + n * 1001}?w=600`,
      `https://images.unsplash.com/photo-${1552000000000 + n * 1002}?w=600`,
    ],
    categoryId: `cat-${category}`,
    categoryName: category,
    brand,
    rating: +(3 + Math.random() * 2).toFixed(1),
    reviewCount: Math.floor(Math.random() * 100),
    stock,
    sold,
    tags: ['Hot', 'New', 'Best Seller'].filter(() => Math.random() > 0.7),
    specifications: {
      CPU: ['Intel Core i9', 'AMD Ryzen 9', 'Apple M3', 'Snapdragon 8 Gen 3'][Math.floor(Math.random() * 4)],
      RAM: ['8GB', '16GB', '32GB', '64GB'][Math.floor(Math.random() * 4)],
      SSD: ['256GB', '512GB', '1TB', '2TB'][Math.floor(Math.random() * 4)],
    },
    isFeatured: Math.random() > 0.7,
    isNew: Math.random() > 0.7,
    isHot: Math.random() > 0.7,
    createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(1 + Math.random() * 28)).toISOString(),
  };
});

// ─── 1000 Orders ────────────────────────────────────────────────────────────────
export const mockSellerOrders: SellerOrder[] = Array.from({ length: 1000 }, (_, i) => {
  const n = i + 1;
  const statuses: SellerOrder['status'][] = ['pending', 'confirmed', 'preparing', 'shipped', 'delivering', 'delivered', 'cancelled', 'returned'];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const paymentMethods: SellerOrder['paymentMethod'][] = ['cod', 'banking', 'vnpay', 'momo', 'zalopay'];
  const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
  const paymentStatuses: SellerOrder['paymentStatus'][] = ['unpaid', 'paid', 'refunded', 'failed'];
  const paymentStatus: SellerOrder['paymentStatus'] = status === 'delivered' && paymentMethod === 'cod'
    ? 'unpaid' : status === 'delivered' || status === 'confirmed' ? 'paid' : paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];
  const items = Math.floor(1 + Math.random() * 5);
  const shippingFee = Math.floor(20000 + Math.random() * 80000);
  const discount = Math.random() > 0.6 ? Math.floor(Math.random() * 500000) : 0;
  const totalAmount = Math.floor(500000 + Math.random() * 50000000) * items;
  const finalAmount = totalAmount + shippingFee - discount;
  const createdAt = new Date(2024, Math.floor(Math.random() * 12), Math.floor(1 + Math.random() * 28),
    Math.floor(Math.random() * 24), Math.floor(Math.random() * 60)).toISOString();
  return {
    id: generateId('ord', n),
    orderCode: `ORD${String(n).padStart(6, '0')}`,
    customerName: CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)],
    customerPhone: `09${String(Math.floor(10000000 + Math.random() * 90000000))}`,
    customerAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=customer${n}`,
    items,
    totalAmount,
    shippingFee,
    discount,
    finalAmount,
    status,
    paymentMethod,
    paymentStatus,
    shippingAddress: `${Math.floor(1 + Math.random() * 999)} Nguyễn Trãi, ${CITIES[Math.floor(Math.random() * CITIES.length)]}`,
    note: Math.random() > 0.7 ? 'Giao giờ hành chính' : '',
    createdAt,
    updatedAt: new Date(new Date(createdAt).getTime() + Math.floor(Math.random() * 86400000 * 7)).toISOString(),
    estimatedDelivery: new Date(new Date(createdAt).getTime() + 86400000 * 5).toLocaleDateString('vi-VN'),
    trackingNumber: status === 'delivered' || status === 'shipped' || status === 'delivering'
      ? `${['GHTK', 'GHN', 'VTP'][Math.floor(Math.random() * 3)]}${Math.floor(1000000000 + Math.random() * 9000000000)}`
      : '',
    shippingPartner: SHIPPING_PARTNERS[Math.floor(Math.random() * SHIPPING_PARTNERS.length)],
    storeId: currentStore.id,
    products: Array.from({ length: items }, () => {
      const product = mockSellerProducts[Math.floor(Math.random() * 100)];
      const qty = Math.floor(1 + Math.random() * 3);
      return {
        productId: product.id,
        productName: product.name,
        productImage: product.images[0],
        quantity: qty,
        unitPrice: product.price,
        totalPrice: product.price * qty,
        sku: `SKU-${product.id.slice(-6)}`,
        options: {},
      };
    }),
  };
});

// ─── 500 Payments ───────────────────────────────────────────────────────────────
export const mockSellerPayments: SellerPayment[] = Array.from({ length: 500 }, (_, i) => {
  const n = i + 1;
  const order = mockSellerOrders[i];
  const amount = order.finalAmount;
  const platformFee = Math.floor(amount * 0.023);
  const status: SellerPayment['status'] = order.paymentStatus === 'paid'
    ? 'success' : order.paymentStatus === 'refunded' ? 'refunded' : order.paymentStatus === 'failed' ? 'failed' : 'pending';
  return {
    id: generateId('pay', n),
    transactionId: `TXN${String(Math.floor(Math.random() * 1000000000)).padStart(10, '0')}`,
    orderId: order.id,
    orderCode: order.orderCode,
    amount,
    platformFee,
    netAmount: amount - platformFee,
    status,
    paymentMethod: order.paymentMethod,
    createdAt: order.createdAt,
    storeId: currentStore.id,
  };
});

// ─── 200 Reviews ────────────────────────────────────────────────────────────────
const REVIEW_CONTENTS = [
  'Sản phẩm tốt, đóng gói cẩn thận, giao hàng nhanh. Sẽ ủng hộ tiếp!',
  'Chất lượng tuyệt vời như mô tả. Đáng đồng tiền bát gạo!',
  'Mình đặt 2 cái nhưng được giao 3 cái, không biết là quà tặng hay gì nhưng rất vui!',
  'Điện thoại xài rất mượt, pin trâu. Camera chụp đẹp lắm!',
  'Shop tư vấn nhiệt tình, giao hàng đúng hẹn. 5 sao cho shop!',
  'Màn hình có 1 điểm chết nhỏ, liên hệ shop được đổi ngay. Dịch vụ tốt!',
  'Laptop nhận được đẹp hơn hình, chạy êm, pin 8 tiếng. Rất hài lòng!',
  'Tai nghe nghe nhạc rất hay, bass mạnh. Đóng gói chắc chắn.',
  'Giao hàng hơi chậm 1 ngày nhưng sản phẩm rất OK. Cảm ơn shop!',
  'Đã mua lần 3 ở shop này rồi. Lần nào cũng ok hết. Yêu shop!',
];

export const mockSellerReviews: SellerReview[] = Array.from({ length: 200 }, (_, i) => {
  const n = i + 1;
  const rating = Math.floor(1 + Math.random() * 5);
  const product = mockSellerProducts[Math.floor(Math.random() * 100)];
  const createdAt = new Date(2024, Math.floor(Math.random() * 12), Math.floor(1 + Math.random() * 28)).toISOString();
  return {
    id: generateId('rev', n),
    productId: product.id,
    productName: product.name,
    productImage: product.images[0],
    customerName: CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)],
    customerAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=rev${n}`,
    rating,
    content: REVIEW_CONTENTS[Math.floor(Math.random() * REVIEW_CONTENTS.length)],
    images: Math.random() > 0.6
      ? [`https://images.unsplash.com/photo-${1550000000000 + n * 500}?w=300`]
      : [],
    isHidden: Math.random() > 0.95,
    hasResponse: Math.random() > 0.6,
    sellerResponse: Math.random() > 0.6
      ? 'Cảm ơn quý khách đã tin tưởng và ủng hộ cửa hàng! Chúc quý khách có trải nghiệm tốt với sản phẩm. Hẹn gặp lại!'
      : '',
    createdAt,
    storeId: currentStore.id,
    orderId: mockSellerOrders[n % 100].id,
  };
});

// ─── 100 Promotions ─────────────────────────────────────────────────────────────
export const mockSellerPromotions: SellerPromotion[] = [
  { id: 'prm-001', name: 'Flash Sale Cuối Năm', type: 'flash_sale', code: 'YEAREND50', discountType: 'percent', discountValue: 50, minOrderValue: 2000000, maxDiscount: 500000, startDate: '2024-12-01', endDate: '2024-12-31', status: 'active', usageLimit: 500, usedCount: 234, targetProducts: [], targetCategories: ['Điện thoại'], storeId: currentStore.id, createdAt: '2024-11-15' },
  { id: 'prm-002', name: 'Giảm 15% Laptop Gaming', type: 'discount_campaign', code: 'GAMING15', discountType: 'percent', discountValue: 15, minOrderValue: 15000000, maxDiscount: 2000000, startDate: '2024-11-01', endDate: '2025-01-31', status: 'active', usageLimit: 200, usedCount: 87, targetProducts: [], targetCategories: ['Laptop', 'PC Gaming'], storeId: currentStore.id, createdAt: '2024-10-20' },
  { id: 'prm-003', name: 'Voucher 100K', type: 'voucher', code: 'NEWUSER100', discountType: 'fixed', discountValue: 100000, minOrderValue: 500000, maxDiscount: 100000, startDate: '2024-01-01', endDate: '2025-12-31', status: 'active', usageLimit: 1000, usedCount: 456, targetProducts: [], targetCategories: [], storeId: currentStore.id, createdAt: '2024-01-01' },
  { id: 'prm-004', name: 'Mua 2 Tặng 1 Phụ Kiện', type: 'combo', code: 'BUY2GET1', discountType: 'percent', discountValue: 33, minOrderValue: 0, maxDiscount: 0, startDate: '2024-10-01', endDate: '2025-03-31', status: 'active', usageLimit: 300, usedCount: 112, targetProducts: [], targetCategories: ['Phụ kiện'], storeId: currentStore.id, createdAt: '2024-09-15' },
  { id: 'prm-005', name: 'Black Friday Sale', type: 'flash_sale', code: 'BLACKFRI', discountType: 'percent', discountValue: 40, minOrderValue: 1000000, maxDiscount: 1000000, startDate: '2024-11-24', endDate: '2024-11-30', status: 'ended', usageLimit: 1000, usedCount: 987, targetProducts: [], targetCategories: [], storeId: currentStore.id, createdAt: '2024-11-01' },
  { id: 'prm-006', name: 'Giảm 200K Đơn 2 Triệu', type: 'voucher', code: 'SAVE200K', discountType: 'fixed', discountValue: 200000, minOrderValue: 2000000, maxDiscount: 200000, startDate: '2024-08-01', endDate: '2025-06-30', status: 'paused', usageLimit: 500, usedCount: 156, targetProducts: [], targetCategories: [], storeId: currentStore.id, createdAt: '2024-07-15' },
  { id: 'prm-007', name: 'Apple Day - Giảm 10% Apple', type: 'discount_campaign', code: 'APPLE10', discountType: 'percent', discountValue: 10, minOrderValue: 5000000, maxDiscount: 3000000, startDate: '2024-09-01', endDate: '2025-08-31', status: 'active', usageLimit: 500, usedCount: 201, targetProducts: [], targetCategories: [], storeId: currentStore.id, createdAt: '2024-08-20' },
  { id: 'prm-008', name: 'Free Ship Đơn 500K', type: 'voucher', code: 'FREESHIP', discountType: 'fixed', discountValue: 40000, minOrderValue: 500000, maxDiscount: 40000, startDate: '2024-01-01', endDate: '2025-12-31', status: 'active', usageLimit: 0, usedCount: 3450, targetProducts: [], targetCategories: [], storeId: currentStore.id, createdAt: '2024-01-01' },
  { id: 'prm-009', name: 'Mùa Hè Sôi Động', type: 'flash_sale', code: 'SUMMER30', discountType: 'percent', discountValue: 30, minOrderValue: 1000000, maxDiscount: 800000, startDate: '2024-05-01', endDate: '2024-08-31', status: 'ended', usageLimit: 800, usedCount: 645, targetProducts: [], targetCategories: ['Tai nghe', 'Phụ kiện'], storeId: currentStore.id, createdAt: '2024-04-15' },
  { id: 'prm-010', name: 'Giảm Giá Sản Phẩm Mới', type: 'discount_campaign', code: 'NEWPROD20', discountType: 'percent', discountValue: 20, minOrderValue: 0, maxDiscount: 1500000, startDate: '2024-11-01', endDate: '2025-06-30', status: 'draft', usageLimit: 100, usedCount: 0, targetProducts: [], targetCategories: [], storeId: currentStore.id, createdAt: '2024-10-25' },
  ...Array.from({ length: 90 }, (_, i) => {
    const n = i + 11;
    const types: SellerPromotion['type'][] = ['voucher', 'flash_sale', 'combo', 'discount_campaign'];
    const type = types[Math.floor(Math.random() * types.length)];
    const discountTypes: SellerPromotion['discountType'][] = ['percent', 'fixed'];
    const discountType = discountTypes[Math.floor(Math.random() * discountTypes.length)];
    const statusList: SellerPromotion['status'][] = ['active', 'paused', 'ended', 'draft'];
    const month = Math.floor(1 + Math.random() * 12);
    const year = 2024;
    return {
      id: generateId('prm', n),
      name: `Chương trình khuyến mãi ${n}`,
      type,
      code: `CODE${n}`,
      discountType,
      discountValue: discountType === 'percent' ? Math.floor(5 + Math.random() * 45) : Math.floor(10000 + Math.random() * 490000),
      minOrderValue: Math.floor(Math.random() * 5000000),
      maxDiscount: discountType === 'percent' ? Math.floor(Math.random() * 2000000) : 0,
      startDate: `${year}-${String(month).padStart(2, '0')}-01`,
      endDate: `${year}-${String(Math.min(month + Math.floor(Math.random() * 6), 12)).padStart(2, '0')}-28`,
      status: statusList[Math.floor(Math.random() * statusList.length)],
      usageLimit: Math.floor(Math.random() * 1000),
      usedCount: Math.floor(Math.random() * 500),
      targetProducts: [],
      targetCategories: [CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]],
      storeId: currentStore.id,
      createdAt: `${year}-${String(month).padStart(2, '0')}-15`,
    };
  }),
];

// ─── 200 Support Tickets ─────────────────────────────────────────────────────────
export const mockSellerTickets: SellerSupportTicket[] = Array.from({ length: 200 }, (_, i) => {
  const n = i + 1;
  const categories: SellerSupportTicket['category'][] = ['order', 'payment', 'product', 'account', 'technical', 'other'];
  const priorities: SellerSupportTicket['priority'][] = ['low', 'medium', 'high', 'urgent'];
  const statuses: SellerSupportTicket['status'][] = ['new', 'in_progress', 'replied', 'resolved', 'closed'];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const createdAt = new Date(2024, Math.floor(Math.random() * 12), Math.floor(1 + Math.random() * 28)).toISOString();
  return {
    id: generateId('tkt', n),
    ticketCode: `TKT${String(n).padStart(5, '0')}`,
    subject: [
      'Yêu cầu hoàn tiền đơn hàng', 'Sản phẩm bị lỗi cần đổi', 'Chưa nhận được hàng',
      'Thông tin tài khoản bị khóa', 'Lỗi thanh toán online', 'Cần xác minh giấy tờ',
      'Hỏi về chính sách đổi trả', 'Báo cáo sản phẩm giả', 'Yêu cầu nâng hạn mức',
    ][Math.floor(Math.random() * 9)] + ` #${n}`,
    category,
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    customerName: CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)],
    customerEmail: `customer${n}@email.com`,
    messages: Array.from({ length: Math.floor(1 + Math.random() * 4) }, (_, j) => ({
      id: `msg-${n}-${j}`,
      sender: j === 0 ? 'customer' : ['seller', 'customer', 'admin'][Math.floor(Math.random() * 3)] as 'customer' | 'seller' | 'admin',
      senderName: j === 0 ? CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)] : j === 1 ? 'Henzo Tech Store' : 'Henzo Admin',
      content: j === 0
        ? 'Tôi cần hỗ trợ về vấn đề này. Mong shop phản hồi sớm nhất có thể.'
        : j === 1
        ? 'Cảm ơn bạn đã liên hệ. Chúng tôi đang xử lý và sẽ phản hồi trong 24h.'
        : 'Vấn đề của bạn đã được giải quyết. Cần hỗ trợ thêm gì không?',
      attachments: [],
      createdAt: new Date(new Date(createdAt).getTime() + j * 3600000 * 6).toISOString(),
    })),
    createdAt,
    updatedAt: new Date(new Date(createdAt).getTime() + Math.floor(Math.random() * 86400000 * 7)).toISOString(),
    storeId: currentStore.id,
  };
});

// ─── Inventory ──────────────────────────────────────────────────────────────────
export const mockSellerInventory: SellerInventoryItem[] = mockSellerProducts.slice(0, 100).map((p) => {
  const stock = Math.floor(Math.random() * 500);
  const sold = Math.floor(Math.random() * 200);
  const reserved = Math.floor(Math.random() * 10);
  const minStock = 10;
  return {
    sku: `SKU-${p.id.slice(-6)}`,
    productId: p.id,
    productName: p.name,
    productImage: p.images[0],
    category: p.categoryName,
    stock,
    minStock,
    sold,
    reserved,
    available: stock - reserved,
    status: stock === 0 ? 'out_of_stock' : stock < minStock ? 'low_stock' : 'in_stock',
    lastRestocked: new Date(2024, Math.floor(Math.random() * 12), Math.floor(1 + Math.random() * 28)).toLocaleDateString('vi-VN'),
    storeId: currentStore.id,
  };
});

// ─── Shipping ───────────────────────────────────────────────────────────────────
export const mockSellerShippings: SellerShipping[] = mockSellerOrders
  .filter(o => ['shipped', 'delivering', 'delivered'].includes(o.status))
  .map((order, i) => {
    const statusMap: Record<string, SellerShipping['status']> = {
      shipped: 'picked_up', delivering: 'in_transit', delivered: 'delivered',
    };
    return {
      id: `ship-${i + 1}`,
      orderId: order.id,
      orderCode: order.orderCode,
      trackingNumber: order.trackingNumber,
      carrier: order.shippingPartner,
      status: statusMap[order.status] || 'in_transit',
      senderName: currentStore.name,
      senderPhone: currentStore.phone,
      senderAddress: currentStore.address,
      receiverName: order.customerName,
      receiverPhone: order.customerPhone,
      receiverAddress: order.shippingAddress,
      weight: Math.floor(500 + Math.random() * 5000),
      dimensions: `${Math.floor(10 + Math.random() * 40)}x${Math.floor(10 + Math.random() * 40)}x${Math.floor(5 + Math.random() * 20)}cm`,
      estimatedDelivery: order.estimatedDelivery,
      actualDelivery: order.status === 'delivered' ? order.updatedAt : '',
      shippingFee: order.shippingFee,
      codAmount: order.paymentMethod === 'cod' ? order.finalAmount : 0,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      storeId: currentStore.id,
    };
  });

// ─── Notifications ─────────────────────────────────────────────────────────────
export const mockSellerNotifications: SellerNotification[] = [
  { id: 'notif-001', type: 'order', title: 'Đơn hàng mới', message: 'Bạn có đơn hàng mới ORD000001 trị giá 45,990,000đ. Vui lòng xác nhận trong 24h.', isRead: false, link: '/seller/orders', createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), storeId: currentStore.id },
  { id: 'notif-002', type: 'payment', title: 'Thanh toán thành công', message: 'Đơn hàng ORD000012 đã được thanh toán thành công qua VNPay. Số tiền: 12,500,000đ', isRead: false, link: '/seller/payments', createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), storeId: currentStore.id },
  { id: 'notif-003', type: 'review', title: 'Đánh giá mới 5 sao', message: 'Khách hàng Nguyễn Văn Minh vừa đánh giá 5 sao cho sản phẩm iPhone 16 Pro Max.', isRead: false, link: '/seller/reviews', createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), storeId: currentStore.id },
  { id: 'notif-004', type: 'product', title: 'Cảnh báo hết hàng', message: 'Sản phẩm MacBook Pro M3 14" sắp hết hàng (chỉ còn 3 cái). Hãy nhập kho sớm!', isRead: true, link: '/seller/inventory', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), storeId: currentStore.id },
  { id: 'notif-005', type: 'system', title: 'Bảo trì hệ thống', message: 'Hệ thống sẽ bảo trì vào 02:00-04:00 ngày mai. Vui lòng lưu công việc trước đó.', isRead: true, link: '/seller', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), storeId: currentStore.id },
  { id: 'notif-006', type: 'promotion', title: 'Flash Sale sắp kết thúc', message: 'Chương trình "Flash Sale Cuối Năm" sẽ kết thúc sau 3 ngày nữa. Kiểm tra ngay!', isRead: true, link: '/seller/promotions', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), storeId: currentStore.id },
  { id: 'notif-007', type: 'order', title: 'Yêu cầu hủy đơn', message: 'Khách hàng Trần Thị B yêu cầu hủy đơn hàng ORD000087. Vui lòng xác nhận.', isRead: false, link: '/seller/orders', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), storeId: currentStore.id },
  { id: 'notif-008', type: 'payment', title: 'Hoàn tiền thành công', message: 'Đơn hàng ORD000034 đã được hoàn tiền thành công. Số tiền hoàn: 8,900,000đ', isRead: true, link: '/seller/payments', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), storeId: currentStore.id },
];

// ─── Chart Data ─────────────────────────────────────────────────────────────────
export const mockDailyRevenue: DailyRevenue[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
    revenue: Math.floor(5000000 + Math.random() * 30000000),
    orders: Math.floor(5 + Math.random() * 50),
  };
});

export const mockMonthlyData: MonthlyData[] = [
  { month: 'T1', revenue: 450_000_000, orders: 234, customers: 189 },
  { month: 'T2', revenue: 520_000_000, orders: 267, customers: 215 },
  { month: 'T3', revenue: 480_000_000, orders: 245, customers: 198 },
  { month: 'T4', revenue: 610_000_000, orders: 312, customers: 254 },
  { month: 'T5', revenue: 580_000_000, orders: 298, customers: 241 },
  { month: 'T6', revenue: 720_000_000, orders: 367, customers: 298 },
  { month: 'T7', revenue: 680_000_000, orders: 348, customers: 282 },
  { month: 'T8', revenue: 750_000_000, orders: 384, customers: 312 },
  { month: 'T9', revenue: 820_000_000, orders: 419, customers: 341 },
  { month: 'T10', revenue: 890_000_000, orders: 455, customers: 369 },
  { month: 'T11', revenue: 950_000_000, orders: 486, customers: 395 },
  { month: 'T12', revenue: 1_050_000_000, orders: 537, customers: 436 },
];

// ─── Helpers ────────────────────────────────────────────────────────────────────
export const STATUS_ORDER_LABELS = STATUS_LABELS;
export const ORDER_STATUS_COLORS_MAP = ORDER_STATUS_COLORS;
export const PAYMENT_METHOD_LABELS_MAP = PAYMENT_METHOD_LABELS;
