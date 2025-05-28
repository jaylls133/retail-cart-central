
import { useState } from "react";
import { Package, Truck, CheckCircle, Download, Eye, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MyOrders = () => {
  const orders = [
    {
      id: "ORD-2024-001234",
      date: "March 15, 2024",
      status: "processing",
      total: 139.97,
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
      estimatedDelivery: "March 20, 2024"
    },
    {
      id: "ORD-2024-001123",
      date: "March 10, 2024",
      status: "shipped",
      total: 249.99,
      items: [
        {
          id: "3",
          title: "Smart Watch Series 5",
          price: 249.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100"
        }
      ],
      estimatedDelivery: "March 18, 2024",
      trackingNumber: "1Z999AA1234567890"
    },
    {
      id: "ORD-2024-001022",
      date: "March 5, 2024",
      status: "delivered",
      total: 179.99,
      items: [
        {
          id: "4",
          title: "Premium Coffee Maker",
          price: 179.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100"
        }
      ],
      deliveredDate: "March 8, 2024"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Package className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-blue-500";
      case "shipped":
        return "bg-yellow-500";
      case "delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const filterOrdersByStatus = (status: string) => {
    if (status === "all") return orders;
    return orders.filter(order => order.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your recent orders</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="processing">Processing ({filterOrdersByStatus("processing").length})</TabsTrigger>
            <TabsTrigger value="shipped">Shipped ({filterOrdersByStatus("shipped").length})</TabsTrigger>
            <TabsTrigger value="delivered">Delivered ({filterOrdersByStatus("delivered").length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <OrdersList orders={orders} />
          </TabsContent>
          <TabsContent value="processing" className="mt-6">
            <OrdersList orders={filterOrdersByStatus("processing")} />
          </TabsContent>
          <TabsContent value="shipped" className="mt-6">
            <OrdersList orders={filterOrdersByStatus("shipped")} />
          </TabsContent>
          <TabsContent value="delivered" className="mt-6">
            <OrdersList orders={filterOrdersByStatus("delivered")} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  function OrdersList({ orders }: { orders: typeof orders }) {
    return (
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Order {order.id}</CardTitle>
                <Badge className={getStatusColor(order.status)}>
                  {getStatusIcon(order.status)}
                  <span className="ml-1 capitalize">{order.status}</span>
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Placed on {order.date}</span>
                <span className="font-medium text-lg text-gray-900">${order.total}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium text-sm">${item.price}</span>
                  </div>
                ))}
              </div>

              {/* Order Status Details */}
              <div className="pt-4 border-t">
                {order.status === "processing" && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Estimated delivery:</span>
                    <span className="font-medium text-green-600">{order.estimatedDelivery}</span>
                  </div>
                )}
                {order.status === "shipped" && (
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Tracking number:</span>
                      <span className="font-medium">{order.trackingNumber}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Estimated delivery:</span>
                      <span className="font-medium text-green-600">{order.estimatedDelivery}</span>
                    </div>
                  </div>
                )}
                {order.status === "delivered" && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Delivered on:</span>
                    <span className="font-medium text-green-600">{order.deliveredDate}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
                {order.status === "shipped" && (
                  <Button variant="outline" size="sm">
                    <Truck className="h-4 w-4 mr-2" />
                    Track Package
                  </Button>
                )}
                {order.status === "delivered" && (
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Return/Exchange
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
            <Button>Start Shopping</Button>
          </div>
        )}
      </div>
    );
  }
};

export default MyOrders;
