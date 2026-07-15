import React, { useState, useMemo } from "react";
import { WishlistProvider } from "./context/WishlistContext";
import Header from "./components/layout/Header";
import FiltersSidebar, { MIN_PRICE, MAX_PRICE } from "./components/products/FiltersSidebar";
import ProductGrid from "./components/products/ProductGrid";
import WishlistDrawer from "./components/wishlist/WishlistDrawer";
import { products } from "./data/products";
import "./App.css";

/**
 * App – new layout:
 *   Left  → FiltersSidebar  (search, category, price range, sort)
 *   Center → ProductGrid    (responsive grid)
 *   Right  → WishlistDrawer (fixed slide-in popup, opens on product add)
 */
function AppContent() {
  const [search, setSearch]                     = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder]               = useState("default");
  const [priceRange, setPriceRange]             = useState([MIN_PRICE, MAX_PRICE]);

  // Derived filtered + sorted + price-clamped product list
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // 1. Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // 2. Category filter
    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // 3. Price range filter
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // 4. Sort
    if (sortOrder === "price-asc")   list.sort((a, b) => a.price - b.price);
    if (sortOrder === "price-desc")  list.sort((a, b) => b.price - a.price);
    if (sortOrder === "rating-desc") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [search, selectedCategory, sortOrder, priceRange]);

  return (
    <div className="app-root">
      <Header />

      <div className="app-body">
        {/* ── Left: Filters sidebar ── */}
        <FiltersSidebar
          search={search}
          onSearchChange={setSearch}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          totalResults={filteredProducts.length}
        />

        {/* ── Center: Product grid ── */}
        <main className="main-content">
          <div className="main-inner">
            <div className="section-header">
              <h1 className="section-title">All Products</h1>
              <p className="section-subtitle">Discover our curated collection</p>
            </div>
            <ProductGrid products={filteredProducts} />
          </div>
        </main>
      </div>

      {/* ── Right: Wishlist drawer (fixed overlay, slide in from right) ── */}
      <WishlistDrawer />
    </div>
  );
}

export default function App() {
  return (
    <WishlistProvider>
      <AppContent />
    </WishlistProvider>
  );
}
