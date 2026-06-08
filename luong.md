# Luồng Chạy Chi Tiết — HenzoStore

> Tài liệu mô tả toàn bộ luồng hoạt động (user flows) của website thương mại điện tử **HenzoStore**, bao gồm tất cả các trang công khai, trang khách hàng, trang người bán (Shop), và trang quản trị (Admin). Mỗi luồng được mô tả bước-by-bước theo hành động thực tế của người dùng.

---

## Mục lục

1. [Tổng quan hệ thống](#1-tổng-quan-hệ-thống)
2. [Luồng xác thực (Authentication)](#2-luồng-xác-thực-authentication)
3. [Luồng duyệt sản phẩm](#3-luồng-duyệt-sản-phẩm)
4. [Luồng mua hàng (E-commerce)](#4-luồng-mua-hàng-e-commerce)
5. [Luồng tài khoản khách hàng](#5-luồng-tài-khoản-khách-hàng)
6. [Luồng người bán (Shop/Seller)](#6-luồng-người-bán-shopseller)
7. [Luồng quản trị viên (Admin)](#7-luồng-quản-trị-viên-admin)
8. [Sơ đồ trạng thái đơn hàng](#8-sơ-đồ-trạng-thái-đơn-hàng)
9. [Bảng vai trò và quyền truy cập](#9-bảng-vai-trò-và-quyền-truy-cập)

---

## 1. Tổng quan hệ thống

### 1.1. Kiến trúc ứng dụng

```
┌──────────────────────────────────────────────────────┐
│                    App.tsx                           │
│  ┌────────┐  ┌────────┐  ┌───────────────────┐     │
│  │Theme   │→ │Auth    │→ │Search             │     │
│  │Provider│  │Provider│  │Provider           │     │
│  └────────┘  └────────┘  └───────────────────┘     │
│    └──────────────────────→ CartProvider ──→        │
│           └──────────────────────→ Wishlist ──→     │
│                  └─────────────────→ Notification   │
│         └───────────────────→ Compare ──→           │
│        └─────────────────────→ RecentlyViewed ──→    │
│              └──────────────→ Admin ──→              │
│            └────────────────→ Order ──→             │
│          └──────────────────→ Review ──→            │
│        └─────────────────────→ Seller ──→          │
│      └─────────────────────────→ RouterProvider      │
└──────────────────────────────────────────────────────┘
```

### 1.2. Các layout chính

| Layout | Route | Mục đích |
|--------|-------|-----------|
| `MainLayout` | `/`, `/products`, `/cart`, ... | Giao diện công khai cho khách và khách hàng |
| `AuthLayout` | `/login`, `/register`, `/forgot-password` | Giao diện đăng nhập / đăng ký |
| `CustomerLayout` | `/account/*`, `/checkout`, `/notifications` | Giao diện tài khoản khách hàng (bảo vệ) |
| `ShopLayout` | `/seller/*` | Giao diện dashboard người bán (bảo vệ) |
| `AdminLayout` | `/admin/*` | Giao diện dashboard quản trị (bảo vệ) |

### 1.3. Ba vai trò người dùng

| Vai trò | Mã | Mô tả |
|---------|----|--------|
| Khách (Guest) | `GUEST` | Chưa đăng nhập, chỉ truy cập trang công khai |
| Khách hàng | `CUSTOMER` | Đã đăng nhập, truy cập trang mua hàng và tài khoản cá nhân |
| Người bán | `SHOP` | Đã đăng nhập với vai trò người bán, truy cập `/seller/*` |
| Quản trị viên | `ADMIN` | Toàn quyền truy cập cả `/seller/*` và `/admin/*` |

---

## 2. Luồng Xác thực (Authentication)

### 2.1. Luồng đăng ký — `/register`

```
Người dùng truy cập /register (AuthLayout)
│
├─ [Bước 1] Hiển thị form đăng ký
│   ├─ Họ và tên (bắt buộc)
│   ├─ Email (bắt buộc, validate định dạng email)
│   ├─ Số điện thoại (bắt buộc, format: 0xxx xxx xxx)
│   ├─ Mật khẩu (bắt buộc, tối thiểu 6 ký tự)
│   └─ Xác nhận mật khẩu (phải khớp)
│
├─ [Bước 2] Validate phía client
│   ├─ Nếu có trường trống → hiển thị lỗi từng trường
│   ├─ Nếu email sai định dạng → "Email không hợp lệ"
│   ├─ Nếu phone sai format → "Số điện thoại không hợp lệ"
│   ├─ Nếu mật khẩu < 6 ký tự → "Mật khẩu phải tối thiểu 6 ký tự"
│   ├─ Nếu mật khẩu không khớp → "Mật khẩu xác nhận không khớp"
│   └─ Nếu chưa tick đồng ý ĐK → "Bạn cần đồng ý với điều khoản sử dụng"
│
├─ [Bước 3] Gọi authService.register()
│   ├─ Lưu vào localStorage (mock data)
│   └─ Trả về { success: true, message: '...' }
│
├─ [Bước 4] Thành công
│   ├─ Hiển thị thông báo "Đăng ký thành công! Vui lòng đăng nhập."
│   └─ Chuyển hướng → /login
│
└─ [Bước 5] Thất bại (email đã tồn tại)
    └─ Hiển thị lỗi dưới input email
```

### 2.2. Luồng đăng nhập — `/login`

```
Người dùng truy cập /login (AuthLayout)
│
├─ [Bước 1] Hiển thị form đăng nhập
│   ├─ Email
│   ├─ Mật khẩu
│   ├─ Checkbox "Ghi nhớ đăng nhập"
│   └─ Link "Quên mật khẩu?" → /forgot-password
│
├─ [Bước 2] Validate
│   ├─ Nếu email hoặc mật khẩu trống → "Vui lòng nhập đầy đủ email và mật khẩu."
│   └─ Tiếp tục kiểm tra tài khoản
│
├─ [Bước 3] Gọi authService.login(email, password)
│   ├─ Kiểm tra trong mock data (localStorage)
│   ├─ Tìm thấy → lưu token + user vào localStorage (nếu "Ghi nhớ")
│   │   hoặc sessionStorage (nếu không check)
│   └─ Không tìm thấy → trả về lỗi
│
├─ [Bước 4] Thành công
│   ├─ Set isAuthenticated = true trong AuthContext
│   ├─ Lưu user và token vào state
│   ├─ Chuyển hướng → / (trang chủ)
│   └─ Header hiển thị avatar + menu người dùng
│
├─ [Bước 5] Thất bại
│   └─ Hiển thị "Email hoặc mật khẩu không đúng!"
│
└─ [Bước 6] Đăng nhập nhanh bằng tài khoản demo
    ├─ Admin → email: admin@henzo.com / password: 123456
    ├─ Shop  → email: shop@henzo.com / password: 123456
    └─ Customer → email: customer@henzo.com / password: 123456
```

### 2.3. Luồng đăng xuất

```
Người dùng nhấn "Đăng xuất" (AccountPage hoặc UserMenu)
│
├─ [Bước 1] Gọi logout() từ AuthContext
│   ├─ Set user = null, token = null
│   ├─ Xóa henzo_auth_token khỏi localStorage
│   └─ Xóa henzo_auth_user khỏi localStorage
│
├─ [Bước 2] Chuyển hướng → / (trang chủ)
│
└─ [Bước 3] Header trở về trạng thái khách
    ├─ Ẩn avatar người dùng
    └─ Hiển thị nút Đăng nhập / Đăng ký
```

### 2.4. Luồng quên mật khẩu — `/forgot-password`

```
Người dùng truy cập /forgot-password (AuthLayout)
│
├─ [Bước 1] Hiển thị form
│   └─ Input email để nhận link đặt lại mật khẩu
│
├─ [Bước 2] Gửi email reset (mock)
│   └─ Thông báo "Email đặt lại mật khẩu đã được gửi"
│
└─ [Bước 3] Quay lại đăng nhập
    └─ Link "Quay lại đăng nhập" → /login
```

---

## 3. Luồng Duyệt Sản Phẩm

### 3.1. Trang chủ — `/`

```
Người dùng truy cập / (MainLayout)
│
├─ [Bước 1] Tải dữ liệu song song (Promise.all)
│   ├─ mockApi.getFeaturedProducts() → danh sách sản phẩm nổi bật
│   ├─ mockApi.getHotProducts() → danh sách sản phẩm bán chạy
│   └─ mockApi.getFlashSaleProducts() → danh sách flash sale
│
├─ [Bước 2] Render các section
│   │
│   ├─ [Hero Banner] Slider ảnh banner (tự động chuyển 5s/lần)
│   │   └─ 3 banner: iPhone 16, Laptop Gaming, Phụ kiện Gaming
│   │
│   ├─ [Danh mục] 7 danh mục sản phẩm
│   │   └─ Mỗi danh mục click → /categories/:slug
│   │
│   ├─ [Flash Sale] Scroll ngang 8 sản phẩm
│   │   └─ Mỗi sản phẩm click → /products/:slug
│   │
│   ├─ [Sản phẩm nổi bật] Grid 8 sản phẩm
│   │   └─ ProductCard: ảnh, thương hiệu, tên, rating, giá, đã bán
│   │
│   ├─ [Banner khuyến mãi] Banner quảng cáo lớn
│   │
│   ├─ [Sản phẩm bán chạy] Grid 8 sản phẩm
│   │
│   ├─ [Thương hiệu] Logo 10 thương hiệu → /brands/:slug
│   │
│   └─ [App CTA] Nút tải ứng dụng
│
└─ [Bước 3] Mỗi ProductCard có 3 badge tùy sản phẩm
    ├─ -X% (nếu có discount)
    ├─ "Mới" (nếu isNew = true)
    └─ "Hot" (nếu isHot = true)
```

### 3.2. Trang danh sách sản phẩm — `/products`

```
Người dùng truy cập /products (MainLayout)
│
├─ [Bước 1] Fetch tất cả sản phẩm từ mockApi
│
├─ [Bước 2] Render giao diện
│   ├─ Filter bên trái: danh mục, thương hiệu, khoảng giá, rating
│   ├─ Sort: Mới nhất, Bán chạy, Giá thấp→cao, Giá cao→thấp
│   ├─ Grid sản phẩm (ProductCard)
│   └─ Pagination
│
└─ [Bước 3] Click vào sản phẩm
    └─ → /products/:slug
```

### 3.3. Trang chi tiết sản phẩm — `/products/:slug`

```
Người dùng truy cập /products/:slug (MainLayout)
│
├─ [Bước 1] Đọc slug từ URL params
│
├─ [Bước 2] Fetch song song
│   ├─ mockApi.getProductBySlug(slug) → thông tin sản phẩm
│   └─ mockApi.getRelatedProducts(slug, 8) → sản phẩm liên quan
│
├─ [Bước 3] Thêm vào "Đã xem gần đây"
│   └─ useRecentlyViewed().addItem(product)
│
├─ [Bước 4] Render thông tin sản phẩm
│   │
│   ├─ [ProductGallery] Ảnh sản phẩm (click xem ảnh lớn)
│   │
│   ├─ [Thông tin sản phẩm]
│   │   ├─ Thương hiệu badge
│   │   ├─ Tên sản phẩm (h1)
│   │   ├─ Rating (sao + số đánh giá) ← tính từ ReviewContext
│   │   ├─ Đã bán X+
│   │   ├─ Giá hiện tại (nếu có discount → hiện giá gốc gạch ngang + % giảm)
│   │   ├─ Badge "Còn hàng (X sản phẩm)" hoặc "Hết hàng"
│   │   ├─ SKU
│   │   └─ Chọn số lượng (+/- button, giới hạn max = stock)
│   │
│   ├─ [3 nút hành động]
│   │   ├─ "Thêm vào giỏ hàng" → CartContext.addItem()
│   │   ├─ Icon trái tim → WishlistContext
│   │   └─ Icon so sánh → CompareContext
│   │
│   ├─ [3 badge cam kết]
│   │   ├─ 100% Chính hãng
│   │   ├─ Giao hàng nhanh
│   │   └─ Đổi trả dễ dàng
│   │
│   └─ [3 Tabs]
│       ├─ Mô tả → product.description
│       ├─ Thông số kỹ thuật → ProductSpecification component
│       └─ Đánh giá (X) → ProductReview component + form đánh giá
│
├─ [Bước 5] Sản phẩm liên quan (bên dưới)
│   └─ Grid ProductCard × related.length
│
└─ [Bước 6] Nút "Quay về đầu trang" (BackToTop)
```

### 3.4. Luồng tìm kiếm — `/search`

```
Người dùng nhập từ khóa vào SearchBar (Header)
│
├─ [Bước 1] Nhấn Enter hoặc click icon tìm kiếm
│   └─ URL chuyển → /search?q=<keyword>
│
├─ [Bước 2] SearchPage đọc query từ URL
│   └─ SearchContext lưu lịch sử tìm kiếm (localStorage)
│
├─ [Bước 3] Lọc sản phẩm theo từ khóa (tìm trong name, brand, category)
│
├─ [Bước 4] Render kết quả + sidebar lọc + phân trang
│
└─ [Bước 5] Click vào sản phẩm → /products/:slug
```

### 3.5. Trang so sánh sản phẩm — `/compare`

```
Người dùng thêm sản phẩm vào "So sánh" từ ProductDetailPage
│
├─ [Bước 1] CompareContext.addItem(product)
│   ├─ Tối đa 4 sản phẩm
│   └─ Lưu vào localStorage (henzo_compare)
│
├─ [Bước 2] Render ComparePage
│   ├─ Bảng so sánh: Tên, Giá, Thương hiệu, Rating, Mô tả, Thông số
│   ├─ Nút "Xóa khỏi so sánh" cho từng sản phẩm
│   └─ Nút "Thêm sản phẩm" → /products
│
└─ [Bước 3] Click sản phẩm → /products/:slug
```

### 3.6. Các trang công khai khác

| Trang | Route | Mô tả |
|-------|-------|--------|
| Danh mục | `/categories/:slug` | Danh sách sản phẩm theo danh mục |
| Thương hiệu | `/brands/:slug` | Danh sách sản phẩm theo thương hiệu |
| Khuyến mãi | `/promotions` | Danh sách chương trình khuyến mãi |
| Liên hệ | `/contact` | Form liên hệ |
| Yêu thích | `/wishlist` | Danh sách sản phẩm yêu thích |
| Đã xem gần đây | `/recently-viewed` | Danh sách sản phẩm đã xem |

---

## 4. Luồng Mua Hàng (E-commerce)

### 4.1. Luồng giỏ hàng — `/cart`

```
Người dùng nhấn "Thêm vào giỏ hàng" (ProductDetailPage hoặc ProductCard)
│
├─ [Bước 1] CartContext.addItem(product, quantity)
│   ├─ Nếu sản phẩm đã có trong giỏ → tăng quantity
│   └─ Nếu chưa có → thêm mới với selected = true
│
├─ [Bước 2] CartContext lưu vào localStorage (henzo_cart)
│
├─ [Bước 3] MiniCart trong Header cập nhật số badge
│
└─ [Bước 4] CartPage render
    │
    ├─ [Giỏ hàng trống]
    │   ├─ Icon giỏ trống
    │   └─ Nút "Khám phá sản phẩm" → /products
    │
    └─ [Giỏ hàng có sản phẩm]
        │
        ├─ [Header bảng]
        │   └─ Checkbox "Chọn tất cả" + số lượng
        │
        ├─ [Mỗi CartItem]
        │   ├─ Checkbox chọn/sp không chọn (toggleSelect)
        │   ├─ Hình ảnh + tên sản phẩm → /products/:slug
        │   ├─ Nút +/- số lượng (updateQuantity)
        │   ├─ Thành tiền = giá × số lượng
        │   └─ Nút xóa (removeItem)
        │
        ├─ [Tổng cộng bên phải]
        │   ├─ Tạm tính (sản phẩm đã chọn)
        │   ├─ Tiết kiệm (nếu có discount)
        │   ├─ Phí vận chuyển (Miễn phí nếu ≥ 500K, ngược lại 30K)
        │   ├─ Tổng cộng = Tạm tính + Phí ship
        │   ├─ Nút "Tiến hành đặt hàng" → /checkout
        │   └─ Nút "Tiếp tục mua sắm" → /products
        │
        └─ [Quy tắc tính tiền]
            ├─ Chỉ sản phẩm được tick mới tính vào tổng
            ├─ Free ship khi tổng ≥ 500.000đ
            └─ Nút đặt hàng disabled nếu không có sản phẩm nào được chọn
```

### 4.2. Luồng thanh toán — `/checkout`

```
Người dùng nhấn "Tiến hành đặt hàng" từ CartPage
│
├─ [Bước 1] Kiểm tra đăng nhập (ProtectedRoute)
│   ├─ Chưa đăng nhập → chuyển hướng → /login
│   └─ Đã đăng nhập → cho phép truy cập
│
├─ [Bước 2] Kiểm tra giỏ hàng
│   └─ Không có sản phẩm nào được chọn → hiển thị thông báo + link về /products
│
└─ [Bước 3] Render 2 bước thanh toán
    │
    ├─ ═══════════════════════════════════════════════
    │  BƯỚC 1: Địa chỉ giao hàng
    ├─ ═══════════════════════════════════════════════
    │  ├── Họ và tên (validate: bắt buộc)
    │  ├── Số điện thoại (validate: /^0[0-9]{9}$/)
    │  ├── Tỉnh/Thành phố (dropdown, 8 tỉnh/thành)
    │  ├── Quận/Huyện (dropdown phụ thuộc tỉnh đã chọn)
    │  ├── Địa chỉ cụ thể (validate: bắt buộc)
    │  └── Ghi chú (tùy chọn)
    │
    │  Nhấn "Tiếp tục thanh toán"
    │  ├─ Validate tất cả trường
    │  ├─ Nếu lỗi → hiển thị message dưới từng input
    │  └─ Nếu hợp lệ → chuyển sang Bước 2
    │
    ├─ ═══════════════════════════════════════════════
    │  BƯỚC 2: Phương thức thanh toán
    ├─ ═══════════════════════════════════════════════
    │  ├── 💵 COD — Thanh toán khi nhận hàng
    │  ├── 💳 VNPay — ATM, Visa, Mastercard
    │  ├── 📱 MoMo — Quét mã MoMo
    │  └── 📲 ZaloPay — Thanh toán nhanh
    │
    │  Sidebar: Danh sách sản phẩm đã chọn + Tổng cộng
    │
    │  Nhấn "Quay lại" → quay về Bước 1
    │  Nhấn "Đặt hàng ngay · X.XXX.XXXđ"
    │
    ├─ [Bước 4] Xử lý đặt hàng
    │   │
    │   ├─ OrderContext.createOrder({
    │   │     items: selectedItems,
    │   │     totalPrice: total + shipping,
    │   │     shippingAddress: "địa chỉ cụ thể, quận, thành phố",
    │   │     paymentMethod: payment
    │   │   })
    │   │
    │   ├─ Sinh mã đơn hàng: HDN-YYYYMMDD-XXX
    │   │   └─ Ví dụ: HDN-20250608-042
    │   │
    │   ├─ Trạng thái ban đầu: "pending" (Chờ xác nhận)
    │   │
    │   ├─ CartContext.clearSelectedItems()
    │   │   └─ Xóa các sản phẩm đã chọn khỏi giỏ hàng
    │   │
    │   └─ Lưu đơn hàng vào localStorage (henzo_orders)
    │
    ├─ [Bước 5] Hiển thị trang thành công
    │   ├─ Icon ✓ thành công
    │   ├─ "Đặt hàng thành công!"
    │   ├─ Mã đơn hàng: HDN-20250608-042
    │   ├─ "Cảm ơn bạn đã đặt hàng. Đơn đang ở trạng thái chờ xác nhận."
    │   ├─ Nút "Xem chi tiết đơn" → /account/orders/:id
    │   └─ Nút "Lịch sử đơn hàng" → /account/orders
    │
    └─ [Bước 6] Đơn hàng xuất hiện trong OrderContext
        ├─ SellerContext đồng bộ (merge đơn mới)
        └─ Seller nhận thông báo đơn hàng mới
```

### 4.3. Sơ đồ trạng thái đơn hàng (Order Lifecycle)

```
┌──────────┐
│ pending  │ ← Đơn mới tạo (chờ xác nhận)
└────┬─────┘
     │ Shop xác nhận
     ▼
┌──────────┐
│confirmed │ ← Đã xác nhận
└────┬─────┘
     │ Shop bắt đầu chuẩn bị
     ▼
┌──────────┐
│processing│ ← Đang xử lý / chuẩn bị
└────┬─────┘
     │ Giao cho đơn vị vận chuyển
     ▼
┌──────────┐
│ shipping │ ← Đang giao hàng
└────┬─────┘
     │ Giao thành công
     ▼
┌──────────┐
│delivered │ ← Đã giao (hoàn thành)
└──────────┘

(Trong quá trình: pending/confirmed/processing/shipping)
     │
     └─────── Shop/Khách hàng hủy ────→ ┌──────────┐
                                         │cancelled│ ← Đã hủy
                                         └──────────┘
```

---

## 5. Luồng Tài Khoản Khách Hàng

### 5.1. Trang tài khoản — `/account`

```
Người dùng đã đăng nhập, truy cập /account
│
├─ [Bước 1] ProtectedRoute kiểm tra đăng nhập
│   └─ Chưa đăng nhập → /login
│
├─ [Bước 2] PermissionRoute kiểm tra vai trò CUSTOMER
│   └─ Không phải CUSTOMER → /403
│
├─ [Bước 3] Render AccountPage với 5 tab nội dung
│   │
│   ├─ [Tab Tổng quan] (mặc định)
│   │   ├─ Thống kê: Tổng đơn, Đơn đang xử lý, Đã hoàn thành, Tổng chi tiêu
│   │   ├─ Đơn hàng gần đây (3 đơn gần nhất)
│   │   └─ Liên kết nhanh: Yêu thích, Giỏ hàng, Thông báo, Hỗ trợ
│   │
│   ├─ [Tab Hồ sơ]
│   │   ├─ Avatar + nút đổi ảnh
│   │   ├─ Họ và tên, Email, SĐT, Địa chỉ
│   │   └─ Nút "Lưu thay đổi"
│   │
│   ├─ [Tab Đơn hàng]
│   │   └─ Danh sách tất cả đơn hàng với trạng thái
│   │
│   ├─ [Tab Bảo mật]
│   │   ├─ Mật khẩu hiện tại
│   │   ├─ Mật khẩu mới
│   │   └─ Xác nhận mật khẩu mới
│   │
│   └─ [Tab Thông báo]
│       └─ Danh sách thông báo (đã đọc / chưa đọc)
│
└─ Sidebar luôn hiển thị: Avatar + Tên + Email + Vai trò + Nav menu
```

### 5.2. Lịch sử đơn hàng — `/account/orders`

```
Người dùng truy cập /account/orders
│
├─ [Bước 1] OrderContext cung cấp danh sách orders
│   └─ Lấy từ localStorage (henzo_orders)
│
├─ [Bước 2] Filter & Search
│   ├─ Tabs lọc: Tất cả | Chờ xác nhận | Đã xác nhận | Đang giao | Đã giao | Đã hủy
│   └─ Search theo mã đơn hàng
│
├─ [Bước 3] Mỗi OrderCard hiển thị
│   ├─ Mã đơn hàng (VD: HDN-20250603-001)
│   ├─ Ngày đặt
│   ├─ Trạng thái (badge màu theo từng trạng thái)
│   ├─ Số sản phẩm
│   ├─ Tổng tiền
│   ├─ Nút "Chi tiết" → /account/orders/:id
│   ├─ Nút "Theo dõi" (khi status = shipping) → /account/orders/:id/tracking
│   └─ Nút "Đánh giá" (khi status = delivered & chưa đánh giá)
│
├─ [Bước 4] Modal đánh giá sản phẩm
│   ├─ 5 sao (click chọn rating)
│   ├─ Textarea nhập bình luận
│   └─ Gọi ReviewContext.createReview()
│       ├─ Thêm review vào ReviewContext
│       ├─ Đồng bộ vào SellerContext (henzo_seller_reviews)
│       └─ Hiển thị "Đã đánh giá" sau khi gửi
│
└─ Nếu không có đơn hàng
    └─ Hiển thị icon + "Không có đơn hàng nào."
```

### 5.3. Chi tiết đơn hàng — `/account/orders/:id`

```
Người dùng click "Chi tiết" từ OrderHistoryPage
│
├─ [Bước 1] Đọc id từ URL params
│
├─ [Bước 2] OrderContext.getOrderById(id)
│   └─ Tìm đơn hàng trong danh sách orders
│
├─ [Bước 3] Nếu không tìm thấy
│   └─ Hiển thị "Không tìm thấy đơn hàng"
│
├─ [Bước 4] Nếu tìm thấy — render Timeline tiến trình
│   ├─ pending → "Chờ xác nhận" (bước 1)
│   ├─ confirmed → "Đã xác nhận" (bước 2)
│   ├─ processing → "Đang xử lý" (bước 3)
│   ├─ shipping → "Đang giao" (bước 4)
│   ├─ delivered → "Giao thành công" (bước 5)
│   └─ cancelled → "Đã hủy đơn"
│
├─ [Bước 5] Danh sách sản phẩm trong đơn
│   ├─ Hình ảnh + tên + thương hiệu
│   ├─ Số lượng
│   └─ Thành tiền
│
├─ [Bước 6] Sidebar thông tin đơn hàng
│   ├─ Tổng cộng
│   ├─ Ngày đặt
│   ├─ Phương thức thanh toán
│   └─ Địa chỉ giao hàng
│
└─ [Bước 7] Các nút hành động
    ├─ "Theo dõi đơn hàng" (khi đang giao) → /account/orders/:id/tracking
    └─ "Đánh giá sản phẩm" (khi đã giao) → /products/:slug
```

### 5.4. Theo dõi vận chuyển — `/account/orders/:id/tracking`

```
Người dùng click "Theo dõi" từ OrderDetailPage hoặc OrderHistoryPage
│
├─ [Bước 1] Đọc id từ URL, lấy order từ OrderContext
│
├─ [Bước 2] Render ShippingTrackingPage
│   │
│   ├─ [Thông tin vận chuyển]
│   │   ├─ Mã đơn hàng
│   │   ├─ Đơn vị vận chuyển: Giao hàng nhanh (GHN)
│   │   └─ Địa chỉ giao
│   │
│   └─ [Chi tiết lộ trình — 6 bước]
│       ├─ 1. Đơn hàng đã đặt
│       ├─ 2. Đã xác nhận
│       ├─ 3. Đang chuẩn bị
│       ├─ 4. Bàn giao vận chuyển
│       ├─ 5. Đang vận chuyển
│       └─ 6. Giao thành công
│       │
│       ├─ Bước đã hoàn thành: ✓ icon
│       ├─ Bước hiện tại: pulse animation
│       └─ Bước chưa đến: icon trống
│
└─ [Bước 3] Quay lại
    └─ Link "← Quay lại chi tiết đơn" → /account/orders/:id
```

---

## 6. Luồng Người Bán (Shop/Seller)

### 6.1. Dashboard Shop — `/seller` hoặc `/seller/dashboard`

```
Người bán đã đăng nhập với vai trò SHOP, truy cập /seller
│
├─ [Bước 1] ProtectedRoute + PermissionRoute (SHOP hoặc ADMIN)
│
├─ [Bước 2] SellerContext khởi tạo
│   ├─ Load từ localStorage: henzo_seller_orders, henzo_seller_reviews
│   ├─ Merge đơn hàng khách đặt (từ OrderContext) vào danh sách shop
│   └─ Tính stats: doanh thu tháng, đơn hàng, đơn chờ xử lý, đơn hoàn thành
│
├─ [Bước 3] Render Dashboard với 4 cột stat
│   ├─ Doanh thu tháng (VND) + % thay đổi so với tháng trước
│   ├─ Tổng đơn hàng tháng + % thay đổi
│   ├─ Đơn đang xử lý (số)
│   ├─ Đơn hoàn thành (số)
│   ├─ Sản phẩm đang bán
│   ├─ Sản phẩm hết hàng
│   ├─ Khách hàng mới
│   └─ Tỷ lệ chuyển đổi
│
├─ [Bước 4] Biểu đồ doanh thu
│   ├─ Doanh thu 14 ngày gần nhất (bar chart)
│   └─ Doanh thu 12 tháng gần nhất (bar chart)
│
├─ [Bước 5] Bảng đơn hàng gần đây (8 đơn mới nhất)
│   ├─ Mã đơn, Khách hàng, Tổng tiền, Trạng thái
│   └─ Nút "Xem tất cả" → /seller/orders
│
├─ [Bước 6] Top sản phẩm bán chạy (tính từ orders)
│   ├─ Rank 1-5
│   ├─ Tên + Ảnh + Số lượng đã bán
│   └─ Doanh thu từ sản phẩm
│
└─ [Bước 7] Quick bar
    ├─ Đánh giá trung bình: X.X / 5
    ├─ Giá trị TB đơn hàng
    ├─ Tổng doanh thu năm
    └─ Tổng đơn hàng năm
```

### 6.2. Quản lý đơn hàng Shop — `/seller/orders`

```
Người bán truy cập /seller/orders
│
├─ [Bước 1] Render danh sách đơn hàng với 9 tabs
│   ├─ Tất cả | Chờ xác nhận | Đã xác nhận | Đang chuẩn bị
│   │  | Đã giao shipper | Đang giao | Hoàn thành | Đã hủy | Hoàn trả
│   └─ Mỗi tab hiển thị số đơn
│
├─ [Bước 2] Search theo mã đơn / tên khách hàng
│
├─ [Bước 3] Bảng đơn hàng với phân trang (15 đơn/trang)
│   ├─ Mã đơn
│   ├─ Khách hàng (avatar + tên + SĐT)
│   ├─ Tổng tiền + số sản phẩm
│   ├─ Thanh toán (phương thức + trạng thái thanh toán)
│   ├─ Ngày đặt + giờ
│   ├─ Trạng thái đơn (badge)
│   └─ Hành động: Chi tiết | [Nút tiến trạng thái tiếp theo]
│
├─ [Bước 4] Luồng cập nhật trạng thái đơn hàng
│   │
│   ├─ pending → Nhấn "Xác nhận đơn" → confirmed
│   ├─ confirmed → Nhấn "Bắt đầu chuẩn bị" → preparing
│   ├─ preparing → Nhấn "Giao cho shipper" → shipped
│   ├─ shipped → Nhấn "Đang vận chuyển" → delivering
│   └─ delivering → Nhấn "Xác nhận giao thành công" → delivered
│   │
│   ├─ Khi updateOrderStatus() được gọi:
│   │   ├─ SellerOrder.status được cập nhật
│   │   ├─ CustomerOrder.status tương ứng cũng được cập nhật
│   │   ├─ Notification được tạo cho khách hàng
│   │   └─ localStorage đồng bộ
│   │
│   └─ Xác nhận bằng confirm() trước khi chuyển
│
├─ [Bước 5] Panel chi tiết đơn (slide-in từ bên phải)
│   ├─ Timeline trạng thái (visual)
│   ├─ Thông tin khách hàng
│   ├─ Danh sách sản phẩm (ảnh, tên, SKU, giá, số lượng)
│   ├─ Thông tin thanh toán (tổng, ship, giảm giá, thành tiền)
│   ├─ Mã vận đơn
│   └─ Phương thức thanh toán
│
└─ [Bước 6] Phân trang
    ├─ Hiển thị: "Hiển thị 1–15 của 42 đơn"
    ├─ Các nút trang với smart pagination
    └─ Prev / Next buttons
```

### 6.3. Quản lý sản phẩm Shop — `/seller/products`

```
Người bán truy cập /seller/products
│
├─ [Bước 1] Render danh sách sản phẩm
│   ├─ Tên, SKU, Giá, Tồn kho, Trạng thái, Rating
│   └─ Actions: Sửa, Xóa (hoặc toggle trạng thái)
│
├─ [Bước 2] Tạo sản phẩm mới
│   └─ Link "/seller/products/create" → CreateProductPage
│       ├─ Form: tên, mô tả, giá, giá gốc, tồn kho, thương hiệu
│       ├─ Upload ảnh sản phẩm
│       ├─ Chọn danh mục
│       └─ Tags, thông số kỹ thuật
│
└─ [Bước 3] Sửa sản phẩm
    └─ Link "/seller/products/edit/:id" → CreateProductPage (edit mode)
        ├─ Pre-fill dữ liệu sản phẩm hiện có
        └─ Cập nhật vào mock data
```

### 6.4. Các trang Shop khác

| Trang | Route | Mô tả |
|-------|-------|--------|
| Tồn kho | `/seller/inventory` | Quản lý kho hàng, cảnh báo hết hàng |
| Khuyến mãi | `/seller/promotions` | Tạo & quản lý mã giảm giá |
| Đánh giá | `/seller/reviews` | Xem & phản hồi đánh giá khách hàng |
| Báo cáo | `/seller/reports` | Biểu đồ doanh thu, thống kê bán hàng |
| Tài chính | `/seller/finance` | Quản lý thu chi, ví shop |
| Thanh toán | `/seller/payments` | Cài đặt phương thức thanh toán |
| Vận chuyển | `/seller/shipping` | Cài đặt đơn vị vận chuyển |
| Hồ sơ Shop | `/seller/profile` | Thông tin cửa hàng |
| Hỗ trợ | `/seller/support` | Ticket hỗ trợ từ khách hàng |
| Thông báo | `/seller/notifications` | Thông báo dành cho người bán |

---

## 7. Luồng Quản Trị Viên (Admin)

### 7.1. Dashboard Admin — `/admin`

```
Quản trị viên đã đăng nhập với vai trò ADMIN, truy cập /admin
│
├─ [Bước 1] ProtectedRoute + PermissionRoute (ADMIN only)
│
├─ [Bước 2] AdminContext khởi tạo
│   └─ Load dữ liệu từ mock data
│
├─ [Bước 3] Render Admin Dashboard
│   ├─ Tổng quan hệ thống (số người dùng, đơn hàng, doanh thu)
│   ├─ Biểu đồ thống kê
│   └─ Bảng hoạt động gần đây
│
└─ [Bước 4] Sidebar nav: Products | Orders | Customers | Stores | ...
```

### 7.2. Các trang Admin

| Trang | Route | Mô tả |
|-------|-------|--------|
| Dashboard | `/admin` | Tổng quan toàn hệ thống |
| Sản phẩm | `/admin/products` | Quản lý toàn bộ sản phẩm |
| Đơn hàng | `/admin/orders` | Quản lý tất cả đơn hàng |
| Khách hàng | `/admin/customers` | Quản lý tài khoản người dùng |
| Cửa hàng | `/admin/stores` | Quản lý cửa hàng người bán |
| Thanh toán | `/admin/payments` | Giám sát giao dịch |
| Đánh giá | `/admin/reviews` | Quản lý đánh giá sản phẩm |
| Khuyến mãi | `/admin/promotions` | Quản lý khuyến mãi toàn sàn |
| Hỗ trợ | `/admin/support` | Xử lý ticket hỗ trợ |
| Báo cáo | `/admin/reports` | Báo cáo hệ thống |
| Thông báo | `/admin/notifications` | Gửi thông báo hệ thống |
| Phân quyền | `/admin/access` | Quản lý vai trò và quyền truy cập |
| Tài chính | `/admin/finance` | Tài chính toàn hệ thống |

### 7.3. Luồng quản lý đơn hàng Admin — `/admin/orders`

```
Admin truy cập /admin/orders
│
├─ [Bước 1] AdminContext cung cấp tất cả đơn hàng
│
├─ [Bước 2] Tương tự ShopOrderListPage nhưng:
│   ├─ Thấy TẤT CẢ đơn hàng từ mọi cửa hàng
│   ├─ Có thêm cột "Cửa hàng"
│   └─ Có quyền can thiệp bất kỳ đơn nào
│
├─ [Bước 3] Cập nhật trạng thái đơn
│   └─ Khi updateOrderStatus() → đơn khách + đơn shop đều được đồng bộ
│
└─ [Bước 4] Modal chi tiết đơn (giống shop nhưng full thông tin hơn)
```

---

## 8. Sơ đồ Trạng thái Đơn Hàng

### 8.1. Trạng thái chi tiết (đầy đủ)

```
Bước    Trạng thái          Mã trạng thái    Vai trò thay đổi
─────   ──────────────────   ─────────────    ─────────────────
  0     pending             pending          Shop xác nhận
  1     confirmed           confirmed        Shop bắt đầu chuẩn bị
  2     processing          processing       Shop giao hàng cho shipper
  3     shipping           shipping         Đơn vị vận chuyển
  4     delivered           delivered        Shop xác nhận giao
─────   ──────────────────   ─────────────    ─────────────────
X      cancelled            cancelled        Shop / Khách hàng
X      returned             returned         Khách hàng hoàn trả
```

### 8.2. Luồng hoàn tiền (trả về)

```
delivered (đã giao)
      │
      ├─ Khách hàng yêu cầu hoàn trả
      │
      ▼
returned (hoàn trả)
      │
      ├─ Admin xử lý hoàn tiền
      │   ├─ Nếu thanh toán online → hoàn tiền qua VNPay/MoMo/ZaloPay
      │   └─ Nếu COD → không cần hoàn tiền
      │
      ▼
paymentStatus: refunded
```

---

## 9. Bảng Vai trò và Quyền Truy Cập

### 9.1. Các route và vai trò được phép

```
Route Pattern              | GUEST | CUSTOMER | SHOP | ADMIN
──────────────────────────|───────|──────────|──────|───────
/                          |  ✓   |    ✓     |  ✓   |   ✓
/products                  |  ✓   |    ✓     |  ✓   |   ✓
/products/:slug            |  ✓   |    ✓     |  ✓   |   ✓
/categories/:slug           |  ✓   |    ✓     |  ✓   |   ✓
/brands/:slug               |  ✓   |    ✓     |  ✓   |   ✓
/search                     |  ✓   |    ✓     |  ✓   |   ✓
/promotions                 |  ✓   |    ✓     |  ✓   |   ✓
/contact                    |  ✓   |    ✓     |  ✓   |   ✓
/wishlist                   |  ✓   |    ✓     |  ✓   |   ✓
/recently-viewed            |  ✓   |    ✓     |  ✓   |   ✓
──────────────────────────|───────|──────────|──────|───────
/login                      |  ✓   |    ✓     |  ✓   |   ✓
/register                   |  ✓   |    ✓     |  ✓   |   ✓
/forgot-password            |  ✓   |    ✓     |  ✓   |   ✓
──────────────────────────|───────|──────────|──────|───────
/account                    |  ✗   |    ✓     |  ✓   |   ✓
/account/orders             |  ✗   |    ✓     |  ✓   |   ✓
/account/orders/:id         |  ✗   |    ✓     |  ✓   |   ✓
/account/orders/:id/tracking|  ✗   |    ✓     |  ✓   |   ✓
/checkout                   |  ✗   |    ✓     |  ✓   |   ✓
/notifications              |  ✗   |    ✓     |  ✓   |   ✓
/account/support            |  ✗   |    ✓     |  ✓   |   ✓
/account/settings           |  ✗   |    ✓     |  ✓   |   ✓
──────────────────────────|───────|──────────|──────|───────
/seller/*                   |  ✗   |    ✗     |  ✓   |   ✓
──────────────────────────|───────|──────────|──────|───────
/admin/*                    |  ✗   |    ✗     |  ✗   |   ✓
──────────────────────────|───────|──────────|──────|───────
/404, /403, /500            |  ✓   |    ✓     |  ✓   |   ✓
```

### 9.2. ProtectedRoute — Cơ chế bảo vệ route

```
Người dùng truy cập route bảo vệ (ProtectedRoute)
│
├─ [Bước 1] Kiểm tra AuthContext.isAuthenticated
│   ├─ true → cho phép đi tiếp
│   └─ false → chuyển hướng → /login?redirect=<current_path>
│
├─ [Bước 2] PermissionRoute kiểm tra vai trò
│   ├─ allowedRoles chứa userRole → cho phép
│   └─ không chứa → chuyển hướng → /403 (Forbidden)
│
└─ [Bước 3] Loading state
    └─ Nếu AuthContext đang loading → hiển thị RouteLoader
```

---

## 10. Luồng Đồng Bộ Dữ Liệu (Cross-Context)

### 10.1. Đồng bộ đơn hàng giữa Customer và Seller

```
CheckoutPage → OrderContext.createOrder()
      │
      ├─ Tạo CustomerOrder trong OrderContext
      │   └─ Lưu vào localStorage: henzo_orders
      │
      ├─ SellerContext listening sự kiện 'storage'
      │   └─ Merge đơn mới vào danh sách SellerOrder
      │       └─ Lưu vào localStorage: henzo_seller_orders
      │
      └─ Tạo Notification cho khách hàng
          └─ Lưu vào localStorage: henzo_notifications
```

### 10.2. Đồng bộ đánh giá giữa Customer và Seller

```
OrderHistoryPage → ReviewContext.createReview()
      │
      ├─ Tạo Review trong ReviewContext
      │   └─ Lưu vào localStorage: henzo_reviews
      │
      └─ Đồng thời cập nhật henzo_seller_reviews
          └─ Shop nhìn thấy review mới trong /seller/reviews
```

### 10.3. Đồng bộ trạng thái đơn hàng

```
ShopOrderListPage → SellerContext.updateOrderStatus()
      │
      ├─ Cập nhật SellerOrder.status trong SellerContext
      │   └─ Lưu vào localStorage: henzo_seller_orders
      │
      ├─ Đọc henzo_orders từ localStorage
      │   └─ Cập nhật CustomerOrder.status tương ứng
      │       └─ Lưu lại: henzo_orders
      │
      └─ Tạo Notification cho khách hàng
          └─ "Đơn hàng [XXX] đã cập nhật: [trạng thái mới]"
```

---

## 11. Các Context và Vai trò

| Context | Dữ liệu lưu trữ | Storage Key | Mục đích |
|---------|-----------------|-------------|-----------|
| `ThemeProvider` | Light/Dark mode | — | Giao diện |
| `AuthProvider` | User, token, role | `henzo_auth_token`, `henzo_auth_user` | Xác thực |
| `SearchProvider` | Từ khóa, lịch sử | `henzo_search_history` | Tìm kiếm |
| `CartProvider` | Giỏ hàng | `henzo_cart` | Mua hàng |
| `WishlistProvider` | DS yêu thích | `henzo_wishlist` | Sản phẩm yêu thích |
| `NotificationProvider` | Thông báo | `henzo_notifications` | Thông báo |
| `CompareProvider` | DS so sánh (≤4) | `henzo_compare` | So sánh sản phẩm |
| `RecentlyViewedProvider` | DS đã xem (≤20) | `henzo_recently_viewed` | Lịch sử xem |
| `AdminProvider` | Dữ liệu admin | — | Dashboard admin |
| `OrderProvider` | Đơn hàng khách | `henzo_orders` | Quản lý đơn khách |
| `ReviewProvider` | Đánh giá | `henzo_reviews` | Quản lý đánh giá |
| `SellerProvider` | Dữ liệu shop | `henzo_seller_orders`, `henzo_seller_reviews` | Dashboard shop |

---

## 12. Tóm tắt Luồng Chính

### Luồng 1: Khách duyệt và mua hàng (không cần đăng nhập)
```
/ → /products → /products/:slug → "Thêm vào giỏ"
→ /cart → "Tiến hành đặt hàng" → /login (bắt buộc)
→ /checkout (Bước 1: Địa chỉ) → (Bước 2: Thanh toán)
→ "Đặt hàng thành công" → /account/orders
```

### Luồng 2: Khách hàng đã đăng nhập mua hàng
```
/login → / → /products/:slug → "Thêm vào giỏ"
→ /cart → /checkout → "Đặt hàng" → /account/orders
```

### Luồng 3: Theo dõi đơn hàng
```
/account/orders → /account/orders/:id (chi tiết)
→ /account/orders/:id/tracking (theo dõi vận chuyển)
→ Đơn delivered → "Đánh giá" → Modal đánh giá
```

### Luồng 4: Người bán xử lý đơn
```
/seller/orders → Tab "Chờ xác nhận" → "Xác nhận đơn"
→ "Bắt đầu chuẩn bị" → "Giao cho shipper"
→ "Xác nhận giao thành công"
```

### Luồng 5: Người bán quản lý sản phẩm
```
/seller/products → "Đăng sản phẩm" → /seller/products/create
→ Điền form → "Đăng sản phẩm" → Quay về /seller/products
```

### Luồng 6: Admin giám sát hệ thống
```
/admin → Dashboard tổng quan
→ /admin/orders (giám sát tất cả đơn)
→ /admin/products (quản lý sản phẩm toàn sàn)
→ /admin/customers (quản lý người dùng)
```

---

*Tài liệu được viết dựa trên mã nguồn hiện tại của dự án HenzoStore.*
*Thời điểm cập nhật: Tháng 6 năm 2026.*
