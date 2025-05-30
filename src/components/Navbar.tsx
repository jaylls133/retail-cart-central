
import { ShoppingCart, Search, Menu, User, Heart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { getTotalItems } = useCart();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const categories = [
    "Electronics",
    "Clothing", 
    "Home & Garden",
    "Sports",
    "Beauty",
    "Books"
  ];

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          🎉 Free shipping on orders over $50! Limited time offer
        </div>
      </div>

      {/* Main navbar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900">RetailShop</span>
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search products..." 
                className="pl-10 border-gray-200 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Welcome, {user?.name || user?.email}
                    {isAdmin && <span className="ml-1 text-purple-600">(Admin)</span>}
                  </span>
                </div>
                
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <Heart className="h-4 w-4" />
                </Button>

                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm" className="hidden md:flex text-purple-600 hover:text-purple-700">
                      Admin
                    </Button>
                  </Link>
                )}

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hidden md:flex text-red-600 hover:text-red-700"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="hidden md:flex">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                
                <Link to="/register">
                  <Button size="sm" className="hidden md:flex">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            <Link to="/bulk-order">
              <Button variant="ghost" size="sm" className="hidden md:flex text-green-600 hover:text-green-700">
                Bulk Order
              </Button>
            </Link>

            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Categories and mobile menu */}
        <div className={`border-t ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8 py-4">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                className="text-gray-600 hover:text-blue-600 transition-colors py-2 md:py-0 text-sm font-medium"
              >
                {category}
              </Link>
            ))}
            
            {/* Mobile auth buttons */}
            <div className="md:hidden space-y-2 mt-4 pt-4 border-t">
              {isAuthenticated ? (
                <>
                  <div className="text-sm text-gray-600 py-2">
                    Welcome, {user?.name || user?.email}
                    {isAdmin && <span className="ml-1 text-purple-600">(Admin)</span>}
                  </div>
                  {isAdmin && (
                    <Link to="/admin" className="block py-2 text-purple-600 hover:text-purple-700 text-sm font-medium">
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="block py-2 text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block py-2 text-gray-600 hover:text-blue-600 text-sm font-medium">
                    Login
                  </Link>
                  <Link to="/register" className="block py-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
            
            <Link
              to="/bulk-order"
              className="text-green-600 hover:text-green-700 transition-colors py-2 md:py-0 text-sm font-medium md:hidden"
            >
              Bulk Order
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <div className={`md:hidden border-t py-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search products..." 
              className="pl-10 border-gray-200 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
