import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../../components/breadcrumb';
import './CreateProductPage.css';

const CATEGORIES = ['Điện thoại', 'Laptop', 'PC Gaming', 'Màn hình', 'Chuột', 'Bàn phím', 'Tai nghe', 'Phụ kiện'];
const BRANDS = ['Apple', 'Samsung', 'ASUS', 'Dell', 'Lenovo', 'MSI', 'Razer', 'Logitech', 'Sony', 'Xiaomi'];
const TAG_OPTIONS = ['Hot', 'New', 'Featured', 'Best Seller'];

export const CreateProductPage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: '', slug: '', category: CATEGORIES[0], brand: BRANDS[0],
    price: '', originalPrice: '', stock: '', description: '',
    tags: [] as string[], specifications: [] as { key: string; value: string }[],
  });

  useEffect(() => {
    const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    setForm(p => ({ ...p, slug }));
  }, [form.name]);

  const addImage = (url: string) => { if (url && images.length < 5) setImages(prev => [...prev, url]); };
  const removeImage = (i: number) => setImages(prev => prev.filter((_, idx) => idx !== i));

  const addSpec = () => setForm(p => ({ ...p, specifications: [...p.specifications, { key: '', value: '' }] }));
  const updateSpec = (i: number, field: 'key' | 'value', val: string) =>
    setForm(p => ({ ...p, specifications: p.specifications.map((s, idx) => idx === i ? { ...s, [field]: val } : s) }));
  const removeSpec = (i: number) => setForm(p => ({ ...p, specifications: p.specifications.filter((_, idx) => idx !== i) }));

  const toggleTag = (tag: string) => setForm(p => ({
    ...p, tags: p.tags.includes(tag) ? p.tags.filter(t => t !== tag) : [...p.tags, tag],
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const discount = form.originalPrice ? Math.round((1 - Number(form.price) / Number(form.originalPrice)) * 100) : 0;
    const newProduct = {
      id: Date.now().toString(),
      name: form.name,
      slug: form.slug,
      description: form.description,
      price: Number(form.price),
      originalPrice: Number(form.originalPrice) || Number(form.price),
      discount,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600'],
      categoryId: 'cat-other',
      categoryName: form.category,
      brand: form.brand,
      rating: 0,
      reviewCount: 0,
      stock: Number(form.stock) || 0,
      sold: 0,
      tags: form.tags,
      specifications: form.specifications.reduce<Record<string, string>>((acc, s) => ({ ...acc, [s.key]: s.value }), {}),
      isFeatured: form.tags.includes('Featured'),
      isNew: form.tags.includes('New'),
      isHot: form.tags.includes('Hot'),
      createdAt: new Date().toISOString(),
    };
    console.log('New product:', newProduct);
    alert('Thêm sản phẩm thành công!');
    navigate('/shop/products');
  };

  return (
    <div className="create-product-page">
      <Breadcrumb />
      <h1 className="create-product-page__title">Thêm Sản Phẩm Mới</h1>

      <form onSubmit={handleSubmit} className="create-product-page__grid">
        <div className="create-product-page__main">
          <div className="card mb-4">
            <h3 className="mb-4">Thông tin cơ bản</h3>
            <div className="input-group mb-4">
              <label className="input-label">Tên sản phẩm *</label>
              <input className="input" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required placeholder="VD: iPhone 16 Pro Max 256GB..." />
            </div>
            <div className="input-group mb-4">
              <label className="input-label">Slug (URL)</label>
              <input className="input" value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} placeholder="auto-generated-from-name" />
            </div>
            <div className="create-product-page__row">
              <div className="input-group">
                <label className="input-label">Danh mục *</label>
                <select className="input" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Thương hiệu *</label>
                <select className="input" value={form.brand} onChange={e => setForm(p => ({ ...p, brand: e.target.value }))}>
                  {BRANDS.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">Mô tả sản phẩm</label>
              <textarea className="input" rows={5} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Mô tả chi tiết sản phẩm..." />
            </div>
          </div>

          <div className="card mb-4">
            <h3 className="mb-4">Hình ảnh sản phẩm</h3>
            <p className="input-hint mb-3">Tối đa 5 hình ảnh. Sử dụng link ảnh trực tiếp từ internet.</p>
            <div className="image-upload-grid">
              {images.map((img, i) => (
                <div key={i} className="image-upload-preview">
                  <img src={img} alt={`Image ${i + 1}`} />
                  <button type="button" className="image-upload-preview__remove" onClick={() => removeImage(i)}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <div className="image-upload-box">
                  <input
                    type="url"
                    className="input"
                    placeholder="Dán link ảnh (URL)..."
                    onBlur={e => { if (e.target.value) { addImage(e.target.value); e.target.value = ''; } }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <h3 className="mb-4">Thông số kỹ thuật</h3>
            {form.specifications.map((spec, i) => (
              <div key={i} className="create-product-page__row mb-3">
                <input className="input" value={spec.key} onChange={e => updateSpec(i, 'key', e.target.value)} placeholder="VD: Màn hình" />
                <input className="input" value={spec.value} onChange={e => updateSpec(i, 'value', e.target.value)} placeholder="VD: 6.9 inch OLED" />
                <button type="button" className="btn btn-sm btn-outline" onClick={() => removeSpec(i)}>Xóa</button>
              </div>
            ))}
            <button type="button" className="btn btn-outline" onClick={addSpec}>+ Thêm thông số</button>
          </div>
        </div>

        <div className="create-product-page__sidebar">
          <div className="card mb-4">
            <h3 className="mb-4">Giá &amp; Tồn kho</h3>
            <div className="input-group mb-3">
              <label className="input-label">Giá bán (VNĐ) *</label>
              <input type="number" className="input" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} required placeholder="34990000" />
            </div>
            <div className="input-group mb-3">
              <label className="input-label">Giá gốc (VNĐ)</label>
              <input type="number" className="input" value={form.originalPrice} onChange={e => setForm(p => ({ ...p, originalPrice: e.target.value }))} placeholder="39990000" />
            </div>
            <div className="input-group">
              <label className="input-label">Số lượng tồn kho</label>
              <input type="number" className="input" value={form.stock} onChange={e => setForm(p => ({ ...p, stock: e.target.value }))} placeholder="100" />
            </div>
          </div>

          <div className="card mb-4">
            <h3 className="mb-4">Tags</h3>
            <div className="tags-grid">
              {TAG_OPTIONS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  className={`tag-btn ${form.tags.includes(tag) ? 'active' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full btn-lg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Đăng sản phẩm
          </button>
        </div>
      </form>
    </div>
  );
};
