import React, { useState } from "react";
import { CATEGORIES, products as allProducts } from "../../data/products";
import styles from "./FiltersSidebar.module.css";

// Compute min/max price from the dataset once
const MIN_PRICE = Math.floor(Math.min(...allProducts.map((p) => p.price)));
const MAX_PRICE = Math.ceil(Math.max(...allProducts.map((p) => p.price)));

/**
 * FiltersSidebar – a vertical left-side panel with:
 *  - Product search
 *  - Category filter
 *  - Price range slider
 *  - Sort order
 *  - Results count
 */
export default function FiltersSidebar({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  totalResults,
}) {
  const [localMax, setLocalMax] = useState(priceRange[1]);

  const handleMaxChange = (e) => {
    const val = Number(e.target.value);
    setLocalMax(val);
    onPriceRangeChange([priceRange[0], val]);
  };

  const handleMinChange = (e) => {
    const val = Number(e.target.value);
    onPriceRangeChange([val, priceRange[1]]);
  };

  const handleReset = () => {
    onSearchChange("");
    onCategoryChange("All");
    onSortChange("default");
    onPriceRangeChange([MIN_PRICE, MAX_PRICE]);
    setLocalMax(MAX_PRICE);
  };

  const hasActiveFilters =
    search || selectedCategory !== "All" || sortOrder !== "default" ||
    priceRange[0] > MIN_PRICE || priceRange[1] < MAX_PRICE;

  return (
    <aside className={styles.sidebar} aria-label="Product filters">
      {/* ── Brand / App title ── */}
      <div className={styles.sidebarHead}>
        <h2 className={styles.sidebarTitle}>
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
            <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="4" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="4" y1="18" x2="12" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Filters
        </h2>
        {hasActiveFilters && (
          <button className={styles.resetBtn} onClick={handleReset} id="reset-filters-btn">
            Reset
          </button>
        )}
      </div>

      {/* ── Results count ── */}
      <p className={styles.resultsCount}>
        <span className={styles.resultNum}>{totalResults}</span> products found
      </p>

      {/* ── Search ── */}
      <section className={styles.section}>
        <label className={styles.sectionLabel} htmlFor="product-search">Search</label>
        <div className={styles.searchWrapper}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            id="product-search"
            type="text"
            className={styles.searchInput}
            placeholder="Name, brand..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search products"
          />
          {search && (
            <button className={styles.clearBtn} onClick={() => onSearchChange("")} aria-label="Clear">×</button>
          )}
        </div>
      </section>

      {/* ── Category ── */}
      <section className={styles.section}>
        <label className={styles.sectionLabel}>Category</label>
        <div className={styles.categoryList} role="list">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="listitem"
              className={`${styles.catBtn} ${selectedCategory === cat ? styles.catBtnActive : ""}`}
              onClick={() => onCategoryChange(cat)}
              id={`category-${cat.replace(/\s+/g, "-").toLowerCase()}`}
            >
              <span className={styles.catDot} />
              {cat}
              {selectedCategory === cat && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12" className={styles.checkIcon}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ── Price Range ── */}
      <section className={styles.section}>
        <label className={styles.sectionLabel}>Price Range</label>
        <div className={styles.priceDisplay}>
          <span className={styles.priceVal}>${priceRange[0]}</span>
          <span className={styles.priceSep}>—</span>
          <span className={styles.priceVal}>${priceRange[1]}</span>
        </div>

        <div className={styles.sliderGroup}>
          <label className={styles.sliderLabel}>Min</label>
          <input
            id="price-min"
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={10}
            value={priceRange[0]}
            onChange={handleMinChange}
            className={styles.slider}
            aria-label="Minimum price"
          />
        </div>
        <div className={styles.sliderGroup}>
          <label className={styles.sliderLabel}>Max</label>
          <input
            id="price-max"
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={10}
            value={priceRange[1]}
            onChange={handleMaxChange}
            className={styles.slider}
            aria-label="Maximum price"
          />
        </div>
      </section>

      {/* ── Sort ── */}
      <section className={styles.section}>
        <label className={styles.sectionLabel} htmlFor="sort-select">Sort By</label>
        <div className={styles.sortOptions}>
          {[
            { value: "default",      label: "Default" },
            { value: "price-asc",   label: "Price: Low → High" },
            { value: "price-desc",  label: "Price: High → Low" },
            { value: "rating-desc", label: "Top Rated" },
          ].map((opt) => (
            <button
              key={opt.value}
              className={`${styles.sortBtn} ${sortOrder === opt.value ? styles.sortBtnActive : ""}`}
              onClick={() => onSortChange(opt.value)}
              id={`sort-${opt.value}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
}

export { MIN_PRICE, MAX_PRICE };
