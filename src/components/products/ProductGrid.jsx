import React from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";

/**
 * ProductGrid – displays a responsive grid of ProductCard components.
 * Shows an empty state message when no products match the current filters.
 */
export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <h3 className={styles.emptyTitle}>No products found</h3>
        <p className={styles.emptyText}>Try adjusting your search or filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
