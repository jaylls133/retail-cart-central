
import { Link } from "react-router-dom";
import { CheckCircle, Download, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const OrderSuccess = () => {
  const orderDetails = {
    orderId: "ORD-2024-001234",
    orderDate: "March 15, 2024",
    estimatedDelivery: "March 20, 2024",
    items: [
      {
        id: "1",
        title: "Wireless Phone Charger",
        price: 29.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=100"
      },
      {
        id: "2",
        title: "Bluetooth Headphones",
        price: 99.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100"
      }
    ],
    total: 139.97
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order Details Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order Details</span>
                <Badge className="bg-green-500">Confirmed</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-medium">{orderDetails.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-medium">{orderDetails.orderDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Delivery</p>
                  <p className="font-medium text-green-600">{orderDetails.estimatedDelivery}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-medium text-lg">${orderDetails.total}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-medium mb-4">Items Ordered</h3>
                <div className="space-y-4">
                  {orderDetails.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <span className="font-medium">${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Timeline */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="h-5 w-5" />
                <span>Delivery Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Order Confirmed</p>
                    <p className="text-sm text-gray-600">March 15, 2024 - 2:30 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Package className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Processing</p>
                    <p className="text-sm text-gray-600">Expected by March 16, 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <Truck className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Shipped</p>
                    <p className="text-sm text-gray-600">Expected by March 18, 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Delivered</p>
                    <p className="text-sm text-gray-600">Expected by March 20, 2024</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
              <Link to="/my-orders">
                <Button variant="outline" className="w-full">
                  Track Order
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/shop">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Continue Shopping
                </Button>
              </Link>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </div>
          </div>

          {/* Email Confirmation Notice */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              📧 A confirmation email has been sent to your email address with order details and tracking information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
