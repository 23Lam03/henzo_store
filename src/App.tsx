import { RouterProvider } from 'react-router-dom';
import {
  ThemeProvider,
  AuthProvider,
  CartProvider,
  WishlistProvider,
  NotificationProvider,
  SearchProvider,
  CompareProvider,
  RecentlyViewedProvider,
  AdminProvider,
  OrderProvider,
  ReviewProvider,
} from './contexts';
import { SellerProvider } from './contexts/SellerContext';
import { router } from './router';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <WishlistProvider>
              <NotificationProvider>
                <CompareProvider>
                  <RecentlyViewedProvider>
                    <AdminProvider>
                      <OrderProvider>
                        <ReviewProvider>
                          <SellerProvider>
                            <RouterProvider router={router} />
                          </SellerProvider>
                        </ReviewProvider>
                      </OrderProvider>
                    </AdminProvider>
                  </RecentlyViewedProvider>
                </CompareProvider>
              </NotificationProvider>
            </WishlistProvider>
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
