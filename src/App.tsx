
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={
              <>
                <Navbar />
                <main className="flex-1">
                  <Shop />
                </main>
                <Footer />
              </>
            } />
            <Route path="/category/:name" element={
              <>
                <Navbar />
                <main className="flex-1">
                  <Category />
                </main>
                <Footer />
              </>
            } />
            <Route path="/product/:id" element={
              <>
                <Navbar />
                <main className="flex-1">
                  <ProductDetail />
                </main>
                <Footer />
              </>
            } />
            <Route path="/cart" element={
              <>
                <Navbar />
                <main className="flex-1">
                  <Cart />
                </main>
                <Footer />
              </>
            } />
            <Route path="/checkout" element={
              <>
                <Navbar />
                <main className="flex-1">
                  <Checkout />
                </main>
                <Footer />
              </>
            } />
            <Route path="/order-success" element={
              <>
                <Navbar />
                <main className="flex-1">
                  <OrderSuccess />
                </main>
                <Footer />
              </>
            } />
            <Route path="/my-orders" element={
              <>
                <Navbar />
                <main className="flex-1">
                  <MyOrders />
                </main>
                <Footer />
              </>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
