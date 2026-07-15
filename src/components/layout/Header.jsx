import React from "react";
import { useWishlist } from "../../context/WishlistContext";
import styles from "./Header.module.css";

/**
 * Header – top navigation bar with app branding and wishlist count badge.
 * Clicking the heart icon opens the wishlist drawer.
 */
export default function Header() {
  const { wishlist, setIsDrawerOpen } = useWishlist();

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <svg className={styles.logo} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          />
          <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className={styles.brandText}>
          <span className={styles.brandName}>ShopWise</span>
          <span className={styles.brandTagline}>Curated for you</span>
        </div>
      </div>

      <nav className={styles.nav}>
        <span className={styles.navLink}>New Arrivals</span>
        <span className={styles.navLink}>Categories</span>
        <span className={styles.navLink}>Deals</span>
      </nav>

      <div className={styles.actions}>
        <button
          className={styles.wishlistBadge}
          onClick={() => setIsDrawerOpen(true)}
          aria-label={`Open wishlist (${wishlist.length} items)`}
          id="header-wishlist-btn"
          title="Open Wishlist"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={wishlist.length > 0 ? "#e04f5f" : "none"}>
            <path
              d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
              stroke="#e04f5f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
          {wishlist.length > 0 && (
            <span className={styles.badge}>{wishlist.length}</span>
          )}
        </button>
      </div>
    </header>
  );
}
