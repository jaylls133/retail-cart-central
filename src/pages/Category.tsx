
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Filter, Grid, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";

const Category = () => {
  const { name } = useParams<{ name: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInStock, setShowInStock] = useState(false);
  const [showOnSale, setShowOnSale] = useState(false);

  const categoryName = name?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';

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

  const priceRanges = [
    "Under $25",
    "$25 - $50",
    "$50 - $100",
    "$100 - $200",
    "Over $200"
  ];

  // Filter products by category and other filters
  const filteredProducts = allProducts.filter(product => {
    // Category filter
    if (!product.category.toLowerCase().includes(categoryName.toLowerCase())) {
      return false;
    }

    // Search filter
    if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
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

  // Sort products
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
        return 0;
    }
  });

  const handlePriceRangeChange = (range: string, checked: boolean) => {
    if (checked) {
      setSelectedPriceRanges([...selectedPriceRanges, range]);
    } else {
      setSelectedPriceRanges(selectedPriceRanges.filter(r => r !== range));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryName}</h1>
          <p className="text-gray-600">Shop the best {categoryName.toLowerCase()} products</p>
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

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Showing {sortedProducts.length} results</span>
                {sortedProducts.some(p => p.isNew) && (
                  <Badge variant="secondary">New arrivals available</Badge>
                )}
              </div>
            </div>

            {/* Products */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found in this category.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
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
    </div>
  );
};

export default Category;
