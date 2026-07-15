import React, { useState } from "react";
import { useWishlist } from "../../context/WishlistContext";
import SimilarProducts from "./SimilarProducts";
import styles from "./WishlistItem.module.css";

/**
 * WishlistItem – a single row inside the wishlist sidebar.
 * Shows product image, name, price, a remove button, and a collapsible
 * SimilarProducts section beneath it.
 */
export default function WishlistItem({ item }) {
  const { removeFromWishlist } = useWishlist();
  const [imgError, setImgError] = useState(false);
  const [showSimilar, setShowSimilar] = useState(false);

  return (
    <li className={styles.item}>
      {/* ── Main row ── */}
      <div className={styles.row}>
        <div className={styles.imageWrapper}>
          <img
            src={
              imgError
                ? `https://placehold.co/60x60?text=${encodeURIComponent(item.name[0])}`
                : item.image
            }
            alt={item.name}
            className={styles.image}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        </div>

        <div className={styles.details}>
          <p className={styles.brand}>{item.brand}</p>
          <p className={styles.name} title={item.name}>{item.name}</p>
          <p className={styles.price}>${item.price.toFixed(2)}</p>
        </div>

        <button
          className={styles.removeBtn}
          onClick={() => removeFromWishlist(item.id)}
          aria-label={`Remove ${item.name} from wishlist`}
          id={`wishlist-remove-${item.id}`}
          title="Remove"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
          </svg>
        </button>
      </div>

      {/* ── Similar products toggle ── */}
      <button
        className={styles.similarToggle}
        onClick={() => setShowSimilar((v) => !v)}
        aria-expanded={showSimilar}
        id={`similar-toggle-${item.id}`}
      >
        <span>Similar picks</span>
        <svg
          className={`${styles.chevron} ${showSimilar ? styles.chevronUp : ""}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          width="12" height="12"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* ── Collapsible similar products ── */}
      {showSimilar && <SimilarProducts item={item} />}
    </li>
  );
}
