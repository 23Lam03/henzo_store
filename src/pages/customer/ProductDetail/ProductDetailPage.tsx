import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../../components/breadcrumb';
import { BackToTop } from '../../../components/common/BackToTop';
import { ProductGallery } from '../../../components/product/ProductGallery';
import { ProductSpecification } from '../../../components/product/ProductSpecification';
import { ProductReview } from '../../../components/product/ProductReview';
import { ProductCard } from '../../../components/common/ProductCard';
import { useCart, useReview } from '../../../contexts';
import { useWishlist } from '../../../contexts/WishlistContext';
import { useCompare } from '../../../contexts/CompareContext';
import { useRecentlyViewed } from '../../../contexts/RecentlyViewedContext';
import { mockApi } from '../../../services';
import { formatPrice } from '../../../utils';
import type { Product } from '../../../types';
import './ProductDetailPage.css';

export const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { addItem: addToCompare, isInCompare, removeItem: removeFromCompare } = useCompare();
  const { addItem: addToRecentlyViewed } = useRecentlyViewed();
  const { getProductReviews } = useReview();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  useEffect(() => {
    if (!slug) return;
    const load = async () => {
      setLoading(true);
      const [p, r] = await Promise.all([
        mockApi.getProductBySlug(slug),
        mockApi.getRelatedProducts(slug, 8),
      ]);
      if (!p) { navigate('/products'); return; }
      setProduct(p);
      setRelated(r);
      addToRecentlyViewed(p);
      window.scrollTo(0, 0);
      setLoading(false);
    };
    load();
  }, [slug]);

  const reviews = useMemo(() => product ? getProductReviews(product.id) : [], [product, getProductReviews]);
  const averageRating = reviews.length > 0 ? +(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : product?.rating || 0;

  if (loading || !product) {
    return (
      <div className="container">
        <div className="product-detail">
          <div className="product-detail__gallery-skeleton">
            <div className="skeleton" style={{ aspectRatio: '1/1', borderRadius: 20 }} />
          </div>
          <div className="product-detail__info-skeleton">
            <div className="skeleton" style={{ height: 32, width: '60%', borderRadius: 8 }} />
            <div className="skeleton" style={{ height: 20, width: '40%', marginTop: 16, borderRadius: 8 }} />
            <div className="skeleton" style={{ height: 48, marginTop: 24, borderRadius: 8 }} />
            <div className="skeleton" style={{ height: 48, marginTop: 16, borderRadius: 8 }} />
          </div>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleWishlist = () => {
    if (inWishlist) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const handleCompare = () => {
    if (inCompare) removeFromCompare(product.id);
    else addToCompare(product);
  };

  return (
    <div className="container">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: product.categoryName, href: `/categories/${product.categoryId}` },
          { label: product.name },
        ]}
      />

      <div className="product-detail">
        <div className="product-detail__gallery">
          <ProductGallery product={product} />
        </div>

        <div className="product-detail__info">
          <div className="product-detail__brand-badge">{product.brand}</div>
          <h1 className="product-detail__name">{product.name}</h1>

          <div className="product-detail__meta">
            <div className="product-detail__rating">
              <div className="product-detail__stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < Math.floor(averageRating) ? '#F59E0B' : '#E5E7EB'}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="product-detail__rating-num">{averageRating}</span>
              <span className="product-detail__review-count">({reviews.length} đánh giá)</span>
            </div>
            <span className="product-detail__sold">Đã bán {product.sold}+</span>
          </div>

          <div className="product-detail__price-block">
            <span className="product-detail__price">{formatPrice(product.price)}</span>
            {product.discount > 0 && (
              <>
                <span className="product-detail__original-price">{formatPrice(product.originalPrice)}</span>
                <span className="product-detail__discount-badge">-{product.discount}%</span>
              </>
            )}
          </div>

          <div className="product-detail__stock-info">
            {isOutOfStock ? (
              <span className="product-detail__out-stock">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                Hết hàng
              </span>
            ) : (
              <span className="product-detail__in-stock">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Còn hàng ({product.stock} sản phẩm)
              </span>
            )}
          </div>

          <div className="product-detail__sku">
            SKU: <strong>{product.id.toUpperCase()}</strong>
          </div>

          <div className="product-detail__quantity">
            <span className="product-detail__quantity-label">Số lượng:</span>
            <div className="product-detail__quantity-control">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>−</button>
              <input type="number" value={quantity} min={1} max={product.stock} onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))} />
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={quantity >= product.stock}>+</button>
            </div>
          </div>

          <div className="product-detail__actions">
            <button className="btn btn-primary btn-lg product-detail__add-cart" onClick={handleAddToCart} disabled={isOutOfStock}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Thêm vào giỏ hàng
            </button>

            <button className={`product-detail__action-btn ${inWishlist ? 'active' : ''}`} onClick={handleWishlist} title={inWishlist ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill={inWishlist ? '#EF4444' : 'none'} stroke={inWishlist ? '#EF4444' : 'currentColor'} strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>

            <button className={`product-detail__action-btn ${inCompare ? 'active' : ''}`} onClick={handleCompare} title={inCompare ? 'Xóa khỏi so sánh' : 'Thêm vào so sánh'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
              </svg>
            </button>
          </div>

          <div className="product-detail__badges">
            <div className="product-detail__badge-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><span>100% Chính hãng</span></div>
            <div className="product-detail__badge-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg><span>Giao hàng nhanh</span></div>
            <div className="product-detail__badge-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg><span>Đổi trả dễ dàng</span></div>
          </div>
        </div>
      </div>

      <div className="product-detail__tabs">
        <button className={activeTab === 'description' ? 'active' : ''} onClick={() => setActiveTab('description')}>Mô tả</button>
        <button className={activeTab === 'specs' ? 'active' : ''} onClick={() => setActiveTab('specs')}>Thông số kỹ thuật</button>
        <button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>Đánh giá ({reviews.length})</button>
      </div>

      <div className="product-detail__tab-content">
        {activeTab === 'description' && <div className="product-detail__description">{product.description}</div>}
        {activeTab === 'specs' && <ProductSpecification specifications={product.specifications} />}
        {activeTab === 'reviews' && <ProductReview reviews={reviews} productId={product.id} />}
      </div>

      {related.length > 0 && (
        <section className="product-detail__related">
          <h2>Sản phẩm liên quan</h2>
          <div className="product-detail__related-grid">
            {related.map(item => <ProductCard key={item.id} product={item} />)}
          </div>
        </section>
      )}
      <BackToTop />
    </div>
  );
};
