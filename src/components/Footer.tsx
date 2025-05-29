import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6 text-blue-100">Get the latest deals and new arrivals delivered to your inbox</p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <Input 
              placeholder="Enter your email" 
              className="bg-white text-gray-900 border-0"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold">RetailShop</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted online retail destination for quality products at great prices.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="secondary" className="p-2">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="secondary" className="p-2">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="secondary" className="p-2">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
              <li><Link to="/category/electronics" className="hover:text-white transition-colors">Electronics</Link></li>
              <li><Link to="/category/clothing" className="hover:text-white transition-colors">Clothing</Link></li>
              <li><Link to="/my-orders" className="hover:text-white transition-colors">My Orders</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Your Order</a></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@retailshop.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Shopping St, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 RetailShop. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
