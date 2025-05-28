
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

export const ProductCard = ({
  id,
  title,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  inStock,
  isNew,
  isSale
}: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-blue-200">
      <CardContent className="p-4">
        <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
          <Link to={`/product/${id}`}>
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isNew && <Badge className="bg-green-500">New</Badge>}
            {isSale && <Badge className="bg-red-500">Sale</Badge>}
            {!inStock && <Badge variant="secondary">Out of Stock</Badge>}
          </div>

          {/* Wishlist button */}
          <Button
            size="sm"
            variant="secondary"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 p-0"
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Quick add to cart */}
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button 
              size="sm" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Link to={`/product/${id}`}>
            <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
              {title}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">${price}</span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
