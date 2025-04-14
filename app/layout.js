import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { ProductProvider } from '@/contexts/ProductContext';
import { OrderProvider } from '@/contexts/OrderContext';
import { NavBar, Footer } from '@/components/Layout';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fashion Store',
  description: 'Cửa hàng thời trang trực tuyến',
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <OrderProvider>
                <div className="min-h-screen flex flex-col">
                  <NavBar />
                  <main className="flex-grow pt-16">
                    {children}
                  </main>
                  <Footer />
                </div>
                <Toaster position="top-right" />
              </OrderProvider>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  )
} 