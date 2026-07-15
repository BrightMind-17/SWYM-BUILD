import React, { useState } from "react";
import { useWishlist } from "../../context/WishlistContext";
import { WISHLIST_A, WISHLIST_B } from "../../data/products";
import styles from "./MergeWishlists.module.css";

/**
 * MergeWishlists – shows two sample wishlists (A & B) and a button
 * that merges them (deduped, A-first) into the current wishlist.
 */
export default function MergeWishlists() {
  const { mergeWishlists } = useWishlist();
  const [expanded, setExpanded] = useState(false);

  const handleMerge = () => {
    mergeWishlists();
    setExpanded(false);
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.toggleBtn}
        onClick={() => setExpanded((v) => !v)}
        id="merge-wishlists-toggle"
        aria-expanded={expanded}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
          <path d="M8 6H21M8 12H21M8 18H21M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" />
        </svg>
        Merge Wishlists
        <svg
          className={`${styles.chevron} ${expanded ? styles.chevronUp : ""}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          width="12" height="12"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {expanded && (
        <div className={styles.panel}>
          <div className={styles.listsRow}>
            {/* Wishlist A */}
            <WishlistPreview title="Wishlist A" items={WISHLIST_A} color="purple" />
            {/* Merge arrow */}
            <div className={styles.arrowCol}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#6c63ff" strokeWidth="2" width="20" height="20">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="13 6 19 12 13 18" />
              </svg>
            </div>
            {/* Wishlist B */}
            <WishlistPreview title="Wishlist B" items={WISHLIST_B} color="teal" />
          </div>

          <p className={styles.mergeNote}>
            Duplicates removed · Wishlist A order preserved · Unique B items appended
          </p>

          <button
            className={styles.mergeBtn}
            onClick={handleMerge}
            id="merge-wishlists-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Merge &amp; Save
          </button>
        </div>
      )}
    </div>
  );
}

/** Mini preview of a wishlist's items */
function WishlistPreview({ title, items, color }) {
  return (
    <div className={`${styles.preview} ${styles[`preview_${color}`]}`}>
      <p className={styles.previewTitle}>{title}</p>
      <ul className={styles.previewList}>
        {items.filter(Boolean).map((item) => (
          <li key={item.id} className={styles.previewItem}>
            <span className={styles.previewDot} />
            <span className={styles.previewName}>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
