import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { STORAGE_KEYS } from '../../constants';
import { getStorageItem, setStorageItem } from '../../utils';
import type { Review } from '../../types';
import type { SellerReview } from '../../types/seller';
import { mockSellerReviews } from '../../data/sellerData';

interface CreateReviewInput {
  orderId: string;
  productId: string;
  productName: string;
  productImage: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
}

interface ReviewContextValue {
  reviews: Review[];
  sellerReviews: SellerReview[];
  createReview: (input: CreateReviewInput) => Review;
  getProductReviews: (productId: string) => Review[];
  hasReviewedProduct: (orderId: string, productId: string) => boolean;
}

const ReviewContext = createContext<ReviewContextValue | null>(null);

const DEFAULT_REVIEWS: Review[] = mockSellerReviews.map(review => ({
  id: review.id,
  productId: review.productId,
  userId: review.orderId,
  userName: review.customerName,
  userAvatar: review.customerAvatar,
  rating: review.rating,
  comment: review.content,
  createdAt: review.createdAt,
  images: review.images,
  isVerified: true,
  replies: review.hasResponse && review.sellerResponse ? [{
    id: `${review.id}-reply`,
    userId: review.storeId,
    userName: 'Henzo Tech Store',
    comment: review.sellerResponse,
    createdAt: review.createdAt,
  }] : [],
}));

const toSellerReview = (review: Review, orderId: string, productName: string, productImage: string): SellerReview => ({
  id: review.id,
  productId: review.productId,
  productName,
  productImage,
  customerName: review.userName,
  customerAvatar: review.userAvatar,
  rating: review.rating,
  content: review.comment,
  images: review.images || [],
  isHidden: false,
  hasResponse: false,
  sellerResponse: '',
  createdAt: review.createdAt,
  storeId: 'store-0001',
  orderId,
});

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>(() => getStorageItem<Review[]>(STORAGE_KEYS.reviews, DEFAULT_REVIEWS));

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.reviews, reviews);
  }, [reviews]);

  const sellerReviews = useMemo(() => {
    const existingSellerReviews = getStorageItem<SellerReview[]>('henzo_seller_reviews', mockSellerReviews);
    const dynamicReviews = reviews
      .filter(review => !existingSellerReviews.some(item => item.id === review.id))
      .map(review => toSellerReview(review, review.userId, '', ''));
    return [...dynamicReviews, ...existingSellerReviews];
  }, [reviews]);

  const createReview = useCallback((input: CreateReviewInput) => {
    const newReview: Review = {
      id: `review-${Date.now()}`,
      productId: input.productId,
      userId: input.orderId,
      userName: input.userName,
      userAvatar: input.userAvatar,
      rating: input.rating,
      comment: input.comment,
      createdAt: new Date().toISOString(),
      images: [],
      isVerified: true,
      replies: [],
    };

    setReviews(prev => [newReview, ...prev]);

    const existingSellerReviews = getStorageItem<SellerReview[]>('henzo_seller_reviews', mockSellerReviews);
    const nextSellerReviews = [
      toSellerReview(newReview, input.orderId, input.productName, input.productImage),
      ...existingSellerReviews,
    ];
    setStorageItem('henzo_seller_reviews', nextSellerReviews);

    return newReview;
  }, []);

  const getProductReviews = useCallback((productId: string) => reviews.filter(review => review.productId === productId), [reviews]);
  const hasReviewedProduct = useCallback((orderId: string, productId: string) => reviews.some(review => review.userId === orderId && review.productId === productId), [reviews]);

  const value = useMemo(() => ({ reviews, sellerReviews, createReview, getProductReviews, hasReviewedProduct }), [reviews, sellerReviews, createReview, getProductReviews, hasReviewedProduct]);

  return <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>;
};

export const useReview = (): ReviewContextValue => {
  const context = useContext(ReviewContext);
  if (!context) throw new Error('useReview must be used within ReviewProvider');
  return context;
};
