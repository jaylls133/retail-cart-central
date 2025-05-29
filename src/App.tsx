
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Index from './pages/Index';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import MyOrders from './pages/MyOrders';
import BulkOrder from './pages/BulkOrder';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/category/:name" element={<Category />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />
                <Route path="/order-success" element={
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                } />
                <Route path="/my-orders" element={
                  <ProtectedRoute>
                    <MyOrders />
                  </ProtectedRoute>
                } />
                <Route path="/bulk-order" element={<BulkOrder />} />
                <Route path="/admin" element={
                  <ProtectedRoute adminOnly>
                    <Admin />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <Toaster />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
