import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import { useWishlist } from '../../../contexts/WishlistContext';
import { useNotification } from '../../../contexts/NotificationContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useScrollY, useWindowSize, useClickOutside } from '../../../hooks';
import { MegaMenu } from '../MegaMenu/MegaMenu';
import { MiniCart } from '../MiniCart/MiniCart';
import { NotificationCenter } from '../NotificationCenter/NotificationCenter';
import { UserMenu } from '../UserMenu/UserMenu';
import { SearchBar } from '../SearchBar/SearchBar';
import { CATEGORIES } from '../../../constants';
import './Header.css';

const IconLogo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="10" fill="url(#logoGrad)"/>
    <path d="M10 26L18 10L26 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 20H23" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36">
        <stop offset="0%" stopColor="#4F46E5"/>
        <stop offset="100%" stopColor="#6366F1"/>
      </linearGradient>
    </defs>
  </svg>
);

const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

const IconHeart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const IconCart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

const IconBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const IconUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconMoon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const IconSun = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const IconX = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const IconCompare = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

export const Header = () => {
  const scrollY = useScrollY();
  const { width } = useWindowSize();
  const { items: cartItems } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { unreadCount } = useNotification();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const megaMenuRef = useRef<HTMLDivElement>(null!);
  const miniCartRef = useRef<HTMLDivElement>(null!);
  const notifRef = useRef<HTMLDivElement>(null!);
  const userMenuRef = useRef<HTMLDivElement>(null!);
  const mobileMenuRef = useRef<HTMLDivElement>(null!);

  const isMobile = width < 768;
  const isTransparent = scrollY < 50;

  useEffect(() => {
    setIsScrolled(scrollY > 50);
  }, [scrollY]);

  useClickOutside(megaMenuRef as React.RefObject<HTMLElement>, () => setShowMegaMenu(false));
  useClickOutside(miniCartRef as React.RefObject<HTMLElement>, () => setShowMiniCart(false));
  useClickOutside(notifRef as React.RefObject<HTMLElement>, () => setShowNotifications(false));
  useClickOutside(userMenuRef as React.RefObject<HTMLElement>, () => setShowUserMenu(false));
  useClickOutside(mobileMenuRef as React.RefObject<HTMLElement>, () => setShowMobileMenu(false));

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <header
        className={`header ${isScrolled ? 'header--scrolled' : ''} ${isTransparent && !isScrolled ? 'header--transparent' : ''}`}
      >
        <div className="container">
          <div className="header__inner">
            <Link to="/" className="header__logo">
              <IconLogo />
              <span className="header__logo-text hide-mobile">Henzo</span>
            </Link>

            <nav className="header__nav hide-mobile">
              <Link to="/" className="header__nav-link">Trang Chủ</Link>
              <div
                className="header__nav-item header__nav-item--dropdown"
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}
              >
                {/* <button className="header__nav-link header__nav-link--dropdown">
                  Danh Mục
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button> */}
                {showMegaMenu && (
                  <MegaMenu
                    categories={CATEGORIES.map(c => ({ ...c, children: c.children?.map(ch => ({ ...ch })) }))}
                    onClose={() => setShowMegaMenu(false)}
                    innerRef={megaMenuRef}
                  />
                )}
              </div>
              <Link to="/promotions" className="header__nav-link">Khuyến Mãi</Link>
              <Link to="/contact" className="header__nav-link">Liên Hệ</Link>
            </nav>

            {!isMobile && (
              <div className="header__search">
                <SearchBar />
              </div>
            )}

            <div className="header__actions">
              {isMobile && (
                <button className="header__action-btn" onClick={() => setShowSearch(!showSearch)}>
                  <IconSearch />
                </button>
              )}

              <Link to="/wishlist" className="header__action-btn header__action-btn--with-badge">
                <IconHeart />
                {wishlistCount > 0 && <span className="header__badge">{wishlistCount}</span>}
              </Link>

              <Link to="/compare" className="header__action-btn hide-tablet">
                <IconCompare />
              </Link>

              <div className="header__action-wrapper" ref={notifRef}>
                <button
                  className="header__action-btn header__action-btn--with-badge"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <IconBell />
                  {unreadCount > 0 && <span className="header__badge">{unreadCount}</span>}
                </button>
                {showNotifications && (
                  <NotificationCenter onClose={() => setShowNotifications(false)} />
                )}
              </div>

              <div className="header__action-wrapper" ref={miniCartRef}>
                <button
                  className="header__action-btn header__action-btn--with-badge"
                  onClick={() => setShowMiniCart(!showMiniCart)}
                >
                  <IconCart />
                  {cartCount > 0 && <span className="header__badge">{cartCount}</span>}
                </button>
                {showMiniCart && <MiniCart onClose={() => setShowMiniCart(false)} />}
              </div>

              <div className="header__action-wrapper" ref={userMenuRef}>
                {isAuthenticated ? (
                  <button
                    className="header__action-btn header__user-btn"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <img src={user?.avatar} alt={user?.name} className="header__user-avatar" />
                    <span className="header__user-name hide-tablet">{user?.name}</span>
                  </button>
                ) : (
                  <Link to="/login" className="header__action-btn">
                    <IconUser />
                  </Link>
                )}
                {showUserMenu && <UserMenu onClose={() => setShowUserMenu(false)} />}
              </div>

              <button className="header__action-btn hide-tablet" onClick={toggleTheme}>
                {theme === 'dark' ? <IconSun /> : <IconMoon />}
              </button>

              <button className="header__action-btn header__menu-btn hide-desktop" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                {showMobileMenu ? <IconX /> : <IconMenu />}
              </button>
            </div>
          </div>

          {isMobile && showSearch && (
            <div className="header__mobile-search">
              <SearchBar autoFocus />
            </div>
          )}
        </div>

        {showMobileMenu && (
          <div className="header__mobile-menu" ref={mobileMenuRef}>
            <div className="header__mobile-menu-header">
              <Link to="/" className="header__logo" onClick={() => setShowMobileMenu(false)}>
                <IconLogo />
                <span className="header__logo-text">Henzo</span>
              </Link>
              <button className="header__action-btn" onClick={() => setShowMobileMenu(false)}>
                <IconX />
              </button>
            </div>
            <nav className="header__mobile-nav">
              <Link to="/" className="header__mobile-nav-link" onClick={() => setShowMobileMenu(false)}>Trang Chủ</Link>
              <Link to="/products" className="header__mobile-nav-link" onClick={() => setShowMobileMenu(false)}>Sản Phẩm</Link>
              <Link to="/promotions" className="header__mobile-nav-link" onClick={() => setShowMobileMenu(false)}>Khuyến Mãi</Link>
              <Link to="/wishlist" className="header__mobile-nav-link" onClick={() => setShowMobileMenu(false)}>Yêu Thích ({wishlistCount})</Link>
              <Link to="/cart" className="header__mobile-nav-link" onClick={() => setShowMobileMenu(false)}>Giỏ Hàng ({cartCount})</Link>
              <Link to="/account" className="header__mobile-nav-link" onClick={() => setShowMobileMenu(false)}>Tài Khoản</Link>
              <div className="header__mobile-nav-divider" />
              <div className="header__mobile-categories">
                <p className="header__mobile-categories-title">Danh Mục</p>
                {CATEGORIES.map(cat => (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.slug}`}
                    className="header__mobile-nav-link header__mobile-nav-link--sub"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </nav>
            <div className="header__mobile-menu-footer">
              <button className="btn btn-outline btn-full" onClick={toggleTheme}>
                {theme === 'dark' ? 'Chế Độ Sáng' : 'Chế Độ Tối'}
              </button>
            </div>
          </div>
        )}
      </header>

      {showMobileMenu && <div className="header__backdrop" onClick={() => setShowMobileMenu(false)} />}
    </>
  );
};
