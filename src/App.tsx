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
                      <SellerProvider>
                        <RouterProvider router={router} />
                      </SellerProvider>
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
