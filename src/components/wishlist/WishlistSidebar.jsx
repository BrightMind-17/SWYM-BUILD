import React from "react";
import { useWishlist } from "../../context/WishlistContext";
import WishlistItem from "./WishlistItem";
import MergeWishlists from "./MergeWishlists";
import styles from "./WishlistSidebar.module.css";

/**
 * WishlistSidebar – the fixed left panel showing:
 * - Wishlist count header
 * - Merge Wishlists feature
 * - List of wishlisted items (each with similar product suggestions)
 * - Empty state illustration
 * - Total price footer
 */
export default function WishlistSidebar() {
  const { wishlist, notification } = useWishlist();

  const totalPrice = wishlist.reduce((sum, item) => sum + item.price, 0);

  return (
    <aside className={styles.sidebar} aria-label="Wishlist sidebar">

      {/* ── Notification toast ── */}
      {notification && (
        <div className={`${styles.toast} ${styles[`toast_${notification.type}`]}`} role="alert">
          {notification.type === "merge" ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          )}
          {notification.message}
        </div>
      )}

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>My Wishlist</h2>
          <span className={styles.count}>{wishlist.length}</span>
        </div>
        {wishlist.length > 0 && (
          <p className={styles.subtitle}>
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
          </p>
        )}
      </div>

      {/* ── Merge Wishlists feature ── */}
      <MergeWishlists />

      {/* ── Wishlist items or empty state ── */}
      {wishlist.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <>
          <ul className={styles.list}>
            {wishlist.map((item) => (
              <WishlistItem key={item.id} item={item} />
            ))}
          </ul>

          {/* ── Total price footer ── */}
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalPrice}>${totalPrice.toFixed(2)}</span>
            </div>
            <button className={styles.checkoutBtn} id="checkout-btn">
              Proceed to Checkout
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="13 6 19 12 13 18" />
              </svg>
            </button>
          </div>
        </>
      )}
    </aside>
  );
}

/** Empty state illustration + message */
function EmptyWishlist() {
  return (
    <div className={styles.empty}>
      {/* Minimal heart illustration */}
      <div className={styles.emptyIllustration}>
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
          <circle cx="40" cy="40" r="38" fill="#f5f4ff" stroke="#e8e6ff" strokeWidth="2" />
          <path
            d="M40 54s-16-10-16-21a10 10 0 0120 0 10 10 0 0120 0c0 11-24 21-24 21z"
            fill="#e8e6ff" stroke="#c8c4ff" strokeWidth="1.5"
          />
          <path d="M32 40h16M40 32v16" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className={styles.emptyTitle}>Your wishlist is empty</h3>
      <p className={styles.emptyText}>
        Browse products and click the heart icon or "Add to Wishlist" to save items here.
      </p>
    </div>
  );
}
