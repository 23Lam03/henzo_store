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
} from './contexts';
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
                    <RouterProvider router={router} />
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
