import React, { useState } from "react";
import { useWishlist } from "../../context/WishlistContext";
import styles from "./ProductCard.module.css";

/**
 * StarRating – renders filled/empty stars for a given rating value.
 */
function StarRating({ rating }) {
  return (
    <div className={styles.stars} aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <svg
            key={star}
            className={`${styles.star} ${filled ? styles.filled : half ? styles.half : styles.empty}`}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      })}
      <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
    </div>
  );
}

/**
 * ProductCard – displays a product with image, info and a single heart toggle.
 * The text "Add to Wishlist" button has been removed; only the heart on the image remains.
 */
export default function ProductCard({ product }) {
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [imgError, setImgError] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <article className={styles.card}>
      {/* ── Product image with overlaid controls ── */}
      <div className={styles.imageWrapper}>
        <img
          src={imgError ? `https://placehold.co/400x400?text=${encodeURIComponent(product.name)}` : product.image}
          alt={product.name}
          className={styles.image}
          onError={() => setImgError(true)}
          loading="lazy"
        />

        {/* Category badge – top left */}
        <span className={styles.categoryBadge}>{product.category}</span>

        {/* Heart button – top right (ONLY wishlist control) */}
        <button
          className={`${styles.heartBtn} ${inWishlist ? styles.heartActive : ""}`}
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          id={`heart-btn-${product.id}`}
        >
          <svg viewBox="0 0 24 24" fill={inWishlist ? "currentColor" : "none"} width="18" height="18">
            <path
              d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Price tag overlay – bottom left on image */}
        <div className={styles.priceTag}>
          ${product.price.toFixed(2)}
        </div>
      </div>

      {/* ── Product info ── */}
      <div className={styles.info}>
        <p className={styles.brand}>{product.brand}</p>
        <h3 className={styles.name} title={product.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <StarRating rating={product.rating} />
      </div>
    </article>
  );
}
