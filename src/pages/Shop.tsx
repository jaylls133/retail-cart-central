import { useState } from "react";
import { Filter, Grid, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import CustomerService from "@/components/CustomerService";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";

const Shop = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInStock, setShowInStock] = useState(false);
  const [showOnSale, setShowOnSale] = useState(false);
  
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const allProducts = [
    {
      id: "1",
      title: "Wireless Bluetooth Headphones - Premium Quality Sound",
      price: 99.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      rating: 4.5,
      reviews: 124,
      inStock: true,
      isSale: true,
      category: "Electronics"
    },
    {
      id: "2",
      title: "Smart Watch Series 5 - Health & Fitness Tracker",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      rating: 4.8,
      reviews: 89,
      inStock: true,
      isNew: true,
      category: "Electronics"
    },
    {
      id: "3",
      title: "Premium Coffee Maker - Barista Quality",
      price: 179.99,
      originalPrice: 219.99,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
      rating: 4.3,
      reviews: 67,
      inStock: true,
      isSale: true,
      category: "Home & Garden"
    },
    {
      id: "4",
      title: "Designer Sunglasses - UV Protection",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400",
      rating: 4.6,
      reviews: 156,
      inStock: true,
      category: "Clothing"
    },
    {
      id: "5",
      title: "Laptop Backpack - Water Resistant",
      price: 49.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      rating: 4.4,
      reviews: 203,
      inStock: true,
      isSale: true,
      category: "Clothing"
    },
    {
      id: "6",
      title: "Wireless Phone Charger - Fast Charging",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400",
      rating: 4.2,
      reviews: 98,
      inStock: true,
      category: "Electronics"
    },
    {
      id: "7",
      title: "Gaming Mouse - RGB Lighting",
      price: 59.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
      rating: 4.7,
      reviews: 145,
      inStock: false,
      isSale: true,
      category: "Electronics"
    },
    {
      id: "8",
      title: "Bluetooth Speaker - Waterproof",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
      rating: 4.5,
      reviews: 176,
      inStock: true,
      isNew: true,
      category: "Electronics"
    }
  ];

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Beauty",
    "Books",
    "Toys & Games",
    "Automotive"
  ];

  const priceRanges = [
    "Under $25",
    "$25 - $50",
    "$50 - $100",
    "$100 - $200",
    "Over $200"
  ];

  // Filter products based on selected filters
  const filteredProducts = allProducts.filter(product => {
    // Search filter
    if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }

    // Price range filter
    if (selectedPriceRanges.length > 0) {
      const matchesPriceRange = selectedPriceRanges.some(range => {
        switch (range) {
          case "Under $25":
            return product.price < 25;
          case "$25 - $50":
            return product.price >= 25 && product.price <= 50;
          case "$50 - $100":
            return product.price >= 50 && product.price <= 100;
          case "$100 - $200":
            return product.price >= 100 && product.price <= 200;
          case "Over $200":
            return product.price > 200;
          default:
            return true;
        }
      });
      if (!matchesPriceRange) return false;
    }

    // Stock filter
    if (showInStock && !product.inStock) {
      return false;
    }

    // Sale filter
    if (showOnSale && !product.isSale) {
      return false;
    }

    return true;
  });

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case 'featured':
      default:
        return 0; // Keep original order for featured
    }
  });

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handlePriceRangeChange = (range: string, checked: boolean) => {
    if (checked) {
      setSelectedPriceRanges([...selectedPriceRanges, range]);
    } else {
      setSelectedPriceRanges(selectedPriceRanges.filter(r => r !== range));
    }
  };

  const ProductListItem = ({ product }: { product: any }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-32 h-32 object-cover rounded-lg cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          />
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 
                className="font-medium text-lg cursor-pointer hover:text-blue-600"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {product.title}
              </h3>
              <div className="flex gap-1">
                {product.isNew && <Badge className="bg-green-500">New</Badge>}
                {product.isSale && <Badge className="bg-red-500">Sale</Badge>}
              </div>
            </div>
            
            <div className="flex items-center mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">({product.reviews} reviews)</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  View Details
                </Button>
                <Button 
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Discover amazing products at great prices</p>
        </div>

        {/* Search and Controls */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 max-w-md">
              <Input 
                placeholder="Search products..." 
                className="border-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border border-gray-200 rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'} w-full lg:w-64 flex-shrink-0`}>
            <div className="space-y-6">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                      />
                      <label htmlFor={category} className="text-sm text-gray-700 cursor-pointer">
                        {category}
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Price Range */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Price Range</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {priceRanges.map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <Checkbox 
                        id={range}
                        checked={selectedPriceRanges.includes(range)}
                        onCheckedChange={(checked) => handlePriceRangeChange(range, checked as boolean)}
                      />
                      <label htmlFor={range} className="text-sm text-gray-700 cursor-pointer">
                        {range}
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Availability */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Availability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="in-stock"
                      checked={showInStock}
                      onCheckedChange={(checked) => setShowInStock(checked as boolean)}
                    />
                    <label htmlFor="in-stock" className="text-sm text-gray-700 cursor-pointer">
                      In Stock
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="on-sale"
                      checked={showOnSale}
                      onCheckedChange={(checked) => setShowOnSale(checked as boolean)}
                    />
                    <label htmlFor="on-sale" className="text-sm text-gray-700 cursor-pointer">
                      On Sale
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Showing {sortedProducts.length} results</span>
                <Badge variant="secondary">New arrivals available</Badge>
              </div>
            </div>

            {/* Products */}
            {viewMode === 'grid' ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProducts.map((product) => (
                  <ProductListItem key={product.id} product={product} />
                ))}
              </div>
            )}

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategories([]);
                    setSelectedPriceRanges([]);
                    setShowInStock(false);
                    setShowOnSale(false);
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}

            {/* Load More */}
            {sortedProducts.length > 0 && (
              <div className="text-center mt-12">
                <Button size="lg" variant="outline" className="px-8">
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <CustomerService />
    </div>
  );
};

export default Shop;
