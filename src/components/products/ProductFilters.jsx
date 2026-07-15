import React from "react";
import { CATEGORIES } from "../../data/products";
import styles from "./ProductFilters.module.css";

/**
 * ProductFilters – search bar + category filter tabs + sort dropdown.
 * All state is lifted to the parent (App).
 */
export default function ProductFilters({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
  totalResults,
}) {
  return (
    <div className={styles.filtersWrapper}>
      {/* ── Search ── */}
      <div className={styles.searchWrapper}>
        <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          id="product-search"
          type="text"
          className={styles.searchInput}
          placeholder="Search products..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search products"
        />
        {search && (
          <button
            className={styles.clearSearch}
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* ── Controls row ── */}
      <div className={styles.controlsRow}>
        {/* Category tabs */}
        <div className={styles.categoryTabs} role="tablist" aria-label="Filter by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`${styles.tab} ${selectedCategory === cat ? styles.tabActive : ""}`}
              onClick={() => onCategoryChange(cat)}
              id={`category-tab-${cat.replace(/\s+/g, "-").toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort + results count */}
        <div className={styles.sortRow}>
          <span className={styles.resultsCount}>{totalResults} products</span>
          <select
            id="sort-select"
            className={styles.sortSelect}
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort products"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating-desc">Top Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
}
