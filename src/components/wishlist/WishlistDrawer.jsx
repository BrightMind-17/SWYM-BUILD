import React from "react";
import { useWishlist } from "../../context/WishlistContext";
import WishlistItem from "./WishlistItem";
import MergeWishlists from "./MergeWishlists";
import styles from "./WishlistDrawer.module.css";

/**
 * WishlistDrawer – a fixed right-side slide-in panel.
 *
 * Behaviour:
 * - Hidden by default (translated off screen to the right).
 * - Auto-opens whenever a product is added to the wishlist.
 * - Has a ✕ close button at the top.
 * - A semi-transparent backdrop appears when open (click it to close).
 * - A floating FAB (bottom-right) always shows the wishlist count and
 *   lets the user re-open the drawer at any time.
 */
export default function WishlistDrawer() {
  const { wishlist, isDrawerOpen, setIsDrawerOpen, notification } = useWishlist();

  const totalPrice = wishlist.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* ── Backdrop (click to close) ── */}
      {isDrawerOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setIsDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Drawer panel ── */}
      <aside
        className={`${styles.drawer} ${isDrawerOpen ? styles.drawerOpen : ""}`}
        aria-label="Wishlist"
        aria-hidden={!isDrawerOpen}
      >
        {/* ── Toast notification (inside drawer) ── */}
        {notification && (
          <div
            className={`${styles.toast} ${notification.type === "merge" ? styles.toastMerge : ""}`}
            role="alert"
          >
            {notification.type === "merge" ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            )}
            {notification.message}
          </div>
        )}

        {/* ── Drawer header ── */}
        <div className={styles.drawerHeader}>
          <div className={styles.titleRow}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" className={styles.heartIcon}>
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
            <h2 className={styles.title}>My Wishlist</h2>
            {wishlist.length > 0 && (
              <span className={styles.countBadge}>{wishlist.length}</span>
            )}
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close wishlist"
            id="close-wishlist-drawer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* ── Merge wishlists ── */}
        <div className={styles.mergeWrapper}>
          <MergeWishlists />
        </div>

        {/* ── Content ── */}
        <div className={styles.drawerBody}>
          {wishlist.length === 0 ? (
            <EmptyWishlist />
          ) : (
            <ul className={styles.list}>
              {wishlist.map((item) => (
                <WishlistItem key={item.id} item={item} />
              ))}
            </ul>
          )}
        </div>

        {/* ── Footer with total + checkout ── */}
        {wishlist.length > 0 && (
          <div className={styles.drawerFooter}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total ({wishlist.length} items)</span>
              <span className={styles.totalPrice}>${totalPrice.toFixed(2)}</span>
            </div>
            <button className={styles.checkoutBtn} id="checkout-btn">
              Proceed to Checkout
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="13 6 19 12 13 18"/>
              </svg>
            </button>
          </div>
        )}
      </aside>

      {/* ── Floating action button to re-open drawer ── */}
      {!isDrawerOpen && (
        <button
          className={styles.fab}
          onClick={() => setIsDrawerOpen(true)}
          aria-label={`Open wishlist (${wishlist.length} items)`}
          id="open-wishlist-fab"
          title="Open Wishlist"
        >
          <svg viewBox="0 0 24 24" fill={wishlist.length > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" width="22" height="22">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
          {wishlist.length > 0 && (
            <span className={styles.fabBadge}>{wishlist.length}</span>
          )}
        </button>
      )}
    </>
  );
}

function EmptyWishlist() {
  return (
    <div className={styles.empty}>
      <div className={styles.emptyIllustration}>
        <svg viewBox="0 0 80 80" fill="none" width="72" height="72">
          <circle cx="40" cy="40" r="38" fill="#f5f4ff" stroke="#e8e6ff" strokeWidth="2"/>
          <path
            d="M40 54s-16-10-16-21a10 10 0 0120 0 10 10 0 0120 0c0 11-24 21-24 21z"
            fill="#e8e6ff" stroke="#c8c4ff" strokeWidth="1.5"
          />
          <path d="M32 40h16M40 32v16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <h3 className={styles.emptyTitle}>Nothing saved yet</h3>
      <p className={styles.emptyText}>
        Tap the <strong>pink heart</strong> on any product to add it here.
      </p>
    </div>
  );
}
