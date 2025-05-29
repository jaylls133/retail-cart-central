
import { useState } from "react";
import { Minus, Plus, MessageCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CustomerService from "@/components/CustomerService";

interface BulkOrderItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  notes: string;
}

interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  email: string;
}

const BulkOrder = () => {
  const [orderItems, setOrderItems] = useState<BulkOrderItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    phone: "",
    address: "",
    email: ""
  });

  // Sample products that can be added to bulk order
  const availableProducts = [
    {
      id: "1",
      title: "Wireless Bluetooth Headphones",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
      id: "2",
      title: "Smart Watch Series 5",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
    },
    {
      id: "3",
      title: "Premium Coffee Maker",
      price: 179.99,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400"
    },
    {
      id: "4",
      title: "Designer Sunglasses",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400"
    },
    {
      id: "5",
      title: "Laptop Backpack",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"
    }
  ];

  const addProductToOrder = (product: any) => {
    const existingItem = orderItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setOrderItems(prev => prev.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setOrderItems(prev => [...prev, {
        ...product,
        quantity: 1,
        notes: ""
      }]);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setOrderItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const updateNotes = (id: string, notes: string) => {
    setOrderItems(prev => prev.map(item =>
      item.id === id ? { ...item, notes } : item
    ));
  };

  const removeItem = (id: string) => {
    setOrderItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotalAmount = () => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const generateWhatsAppMessage = () => {
    if (orderItems.length === 0 || !customerInfo.name || !customerInfo.phone) {
      alert("Please add items to your order and fill in customer information");
      return;
    }

    let message = `🛒 *BULK ORDER REQUEST*\n\n`;
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${customerInfo.name}\n`;
    message += `Phone: ${customerInfo.phone}\n`;
    message += `Email: ${customerInfo.email}\n`;
    message += `Address: ${customerInfo.address}\n\n`;
    
    message += `📦 *Order Items:*\n`;
    orderItems.forEach((item, index) => {
      message += `${index + 1}. ${item.title}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: $${item.price} each\n`;
      message += `   Subtotal: $${(item.price * item.quantity).toFixed(2)}\n`;
      if (item.notes) {
        message += `   Notes: ${item.notes}\n`;
      }
      message += `\n`;
    });
    
    message += `💰 *Total Amount: $${getTotalAmount().toFixed(2)}*\n\n`;
    message += `Please confirm this order and provide delivery details.`;

    // Replace with your actual WhatsApp business number
    const whatsappNumber = "1234567890"; // Update this with your store's WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bulk Order via WhatsApp</h1>
          <p className="text-gray-600">Order multiple products quickly and send details via WhatsApp</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Products */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Available Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{product.title}</h3>
                        <p className="text-lg font-bold text-blue-600">${product.price}</p>
                      </div>
                      <Button
                        onClick={() => addProductToOrder(product)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Add to Order
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Order Items
                  <Badge variant="secondary">{orderItems.length} items</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orderItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No items added yet</p>
                ) : (
                  <div className="space-y-4">
                    {orderItems.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-4 mb-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.title}</h4>
                            <p className="text-sm text-gray-600">${item.price} each</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm font-medium">Quantity:</span>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-3 py-1 text-center min-w-[2rem]">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <span className="text-sm text-gray-600 ml-auto">
                            Subtotal: ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        
                        <Textarea
                          placeholder="Special notes for this item (optional)"
                          value={item.notes}
                          onChange={(e) => updateNotes(item.id, e.target.value)}
                          rows={2}
                          className="text-sm"
                        />
                      </div>
                    ))}
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Amount:</span>
                        <span className="text-blue-600">${getTotalAmount().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <Input
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <Input
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address
                  </label>
                  <Textarea
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter your delivery address"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Send Order Button */}
            <Button
              onClick={generateWhatsAppMessage}
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={orderItems.length === 0 || !customerInfo.name || !customerInfo.phone}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Send Order via WhatsApp
            </Button>
          </div>
        </div>
      </div>
      
      <CustomerService />
    </div>
  );
};

export default BulkOrder;
