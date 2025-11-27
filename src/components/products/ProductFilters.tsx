import { Search, SlidersHorizontal, X, Sparkles } from "lucide-react";
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
import { categories } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  filters: FilterState;
  sortOption: SortOption;
  onFiltersChange: (filters: FilterState) => void;
  onSortChange: (sort: SortOption) => void;
  isLoading?: boolean;
}

export const ProductFilters = ({
  filters,
  sortOption,
  onFiltersChange,
  onSortChange,
  isLoading = false,
}: ProductFiltersProps) => {
  const hasActiveFilters = filters.category || filters.search || filters.minPrice > 0 || filters.maxPrice < 1000;

  const clearFilters = () => {
    onFiltersChange({
      category: null,
      minPrice: 0,
      maxPrice: 1000,
      search: "",
    });
  };

  const sortOptions = [
    { value: "rating", label: "Top Rated", icon: Sparkles },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ];

  return (
    <div className="space-y-6">
      {/* Main filter bar */}
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl blur-xl opacity-50" />

        <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Search input */}
            <div className="relative flex-1 max-w-md group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                <Input
                  placeholder="Search amazing products..."
                  value={filters.search}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, search: e.target.value })
                  }
                  className={cn(
                    "pl-12 h-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300",
                    "hover:bg-background/80 hover:shadow-sm",
                    filters.search && "border-primary/50 bg-primary/5"
                  )}
                  disabled={isLoading}
                />
                {filters.search && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-colors duration-200"
                    onClick={() => onFiltersChange({ ...filters, search: "" })}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>

            {/* Filter controls */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Category filter */}
              <div className="relative group">
                <Select
                  value={filters.category || "all"}
                  onValueChange={(value) =>
                    onFiltersChange({
                      ...filters,
                      category: value === "all" ? null : value,
                    })
                  }
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-[180px] h-12 bg-background/50 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group-hover:shadow-sm">
                    <SlidersHorizontal className="h-4 w-4 mr-2 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="border-border/50">
                    <SelectItem value="all" className="hover:bg-primary/10 focus:bg-primary/10">
                      <span className="flex items-center gap-2">
                        <Sparkles className="h-3 w-3" />
                        All Categories
                      </span>
                    </SelectItem>
                    {categories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="hover:bg-primary/10 focus:bg-primary/10"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort options */}
              <div className="relative group">
                <Select
                  value={sortOption}
                  onValueChange={(value) => onSortChange(value as SortOption)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-[180px] h-12 bg-background/50 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group-hover:shadow-sm">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent className="border-border/50">
                    {sortOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="hover:bg-primary/10 focus:bg-primary/10"
                      >
                        <span className="flex items-center gap-2">
                          {option.icon && <option.icon className="h-3 w-3" />}
                          {option.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active filters */}
      {hasActiveFilters && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <SlidersHorizontal className="h-3 w-3" />
              Active filters:
            </span>

            {filters.category && (
              <Badge
                variant="secondary"
                className="group gap-2 px-3 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-300 cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, category: null })}
              >
                {filters.category}
                <X className="h-3 w-3 transition-transform group-hover:scale-110" />
              </Badge>
            )}

            {filters.search && (
              <Badge
                variant="secondary"
                className="group gap-2 px-3 py-1 bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 transition-all duration-300 cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, search: "" })}
              >
                <Search className="h-3 w-3" />
                "{filters.search}"
                <X className="h-3 w-3 transition-transform group-hover:scale-110" />
              </Badge>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 px-3 text-muted-foreground hover:text-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-300 group"
              disabled={isLoading}
            >
              <X className="h-3 w-3 mr-1 transition-transform group-hover:scale-110" />
              Clear all
            </Button>
          </div>
        </div>
      )}

      {/* Loading state overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <span className="text-sm">Updating results...</span>
          </div>
        </div>
      )}
    </div>
  );
};
