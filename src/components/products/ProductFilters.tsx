import { useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterState, SortOption } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/hooks/useProducts";

interface ProductFiltersProps {
  filters: FilterState;
  sortOption: SortOption;
  onFiltersChange: (filters: FilterState) => void;
  onSortChange: (sort: SortOption) => void;
}

export const ProductFilters = ({
  filters,
  sortOption,
  onFiltersChange,
  onSortChange,
}: ProductFiltersProps) => {
  const { data: products = [] } = useProducts();
  const categories = useMemo(() => Array.from(new Set(products.map((product) => product.category))), [products]);
  const hasActiveFilters = filters.category || filters.search || filters.minPrice > 0 || filters.maxPrice < 1000;

  const clearFilters = () => {
    onFiltersChange({
      category: null,
      minPrice: 0,
      maxPrice: 1000,
      search: "",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-3">
          <Select
            value={filters.category || "all"}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                category: value === "all" ? null : value,
              })
            }
          >
            <SelectTrigger className="w-[160px]">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={sortOption}
            onValueChange={(value) => onSortChange(value as SortOption)}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.category && (
            <Badge variant="secondary" className="gap-1">
              {filters.category}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, category: null })}
              />
            </Badge>
          )}
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              "{filters.search}"
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, search: "" })}
              />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};
