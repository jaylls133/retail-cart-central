import { useState } from "react";
import { Package, Truck, CheckCircle, Clock, Download, Eye, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CustomerService from "@/components/CustomerService";
import { useToast } from "@/hooks/use-toast";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const mockOrders: Order[] = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 149.98,
      trackingNumber: "TRK123456789",
      estimatedDelivery: "2024-01-18",
      items: [
        {
          id: "1",
          title: "Wireless Bluetooth Headphones",
          price: 99.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
        },
        {
          id: "5",
          title: "Laptop Backpack",
          price: 49.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"
        }
      ]
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-20",
      status: "shipped",
      total: 249.99,
      trackingNumber: "TRK987654321",
      estimatedDelivery: "2024-01-25",
      items: [
        {
          id: "2",
          title: "Smart Watch Series 5",
          price: 249.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
        }
      ]
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-22",
      status: "processing",
      total: 89.99,
      items: [
        {
          id: "8",
          title: "Bluetooth Speaker",
          price: 89.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400"
        }
      ]
    }
  ];

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <RotateCcw className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-500';
      case 'shipped':
        return 'bg-blue-500';
      case 'delivered':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredOrders = activeTab === "all" 
    ? mockOrders 
    : mockOrders.filter(order => order.status === activeTab);

  const handleDownloadInvoice = (orderId: string) => {
    toast({
      title: "Invoice Downloaded",
      description: `Invoice for order ${orderId} has been downloaded.`,
    });
    
    const invoiceData = `
INVOICE
Order ID: ${orderId}
Date: ${new Date().toLocaleDateString()}

Thank you for your purchase!
    `;
    
    const blob = new Blob([invoiceData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${orderId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const OrderDetailsModal = ({ order }: { order: Order }) => (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Order Details - {order.id}</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">Order Date</p>
            <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <Badge className={`${getStatusColor(order.status)} text-white`}>
              {getStatusIcon(order.status)}
              <span className="ml-1 capitalize">{order.status}</span>
            </Badge>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="font-medium text-lg">${order.total}</p>
          </div>
          {order.trackingNumber && (
            <div>
              <p className="text-sm text-gray-600">Tracking Number</p>
              <p className="font-medium">{order.trackingNumber}</p>
            </div>
          )}
        </div>

        <div>
          <h3 className="font-medium mb-4">Items Ordered</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-sm font-medium text-gray-900">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleDownloadInvoice(order.id)}
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Invoice
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="space-y-6">
              {filteredOrders.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                    <p className="text-gray-500">You don't have any orders in this category yet.</p>
                  </CardContent>
                </Card>
              ) : (
                filteredOrders.map((order) => (
                  <Card key={order.id} className="border border-gray-200">
                    <CardHeader className="border-b border-gray-100">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div>
                            <CardTitle className="text-lg">{order.id}</CardTitle>
                            <p className="text-sm text-gray-500">Ordered on {new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <Badge className={`${getStatusColor(order.status)} text-white`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1 capitalize">{order.status}</span>
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <OrderDetailsModal order={order} />
                          </Dialog>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownloadInvoice(order.id)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Invoice
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{item.title}</h4>
                              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                              <p className="text-sm font-medium text-gray-900">${item.price}</p>
                            </div>
                          </div>
                        ))}
                        
                        <div className="border-t border-gray-100 pt-4">
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                              {order.trackingNumber && (
                                <p>Tracking: {order.trackingNumber}</p>
                              )}
                              {order.estimatedDelivery && (
                                <p>Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">Total: ${order.total}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <CustomerService />
    </div>
  );
};

export default MyOrders;
