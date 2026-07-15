import React, { useState } from "react";
import { useWishlist } from "../../context/WishlistContext";
import { products as allProducts } from "../../data/products";
import styles from "./SimilarProducts.module.css";

/**
 * SimilarProducts – shows 2-3 products in the same category or by the same brand
 * as the given wishlist item. Clicking adds directly to the wishlist.
 */
export default function SimilarProducts({ item }) {
  const { addToWishlist, isInWishlist } = useWishlist();

  // Find similar products (same category OR same brand), exclude the item itself and already-wishlisted items
  const similar = allProducts
    .filter(
      (p) =>
        p.id !== item.id &&
        (p.category === item.category || p.brand === item.brand)
    )
    .slice(0, 3);

  if (similar.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Similar picks</p>
      <div className={styles.list}>
        {similar.map((product) => (
          <SimilarCard
            key={product.id}
            product={product}
            inWishlist={isInWishlist(product.id)}
            onAdd={addToWishlist}
          />
        ))}
      </div>
    </div>
  );
}

function SimilarCard({ product, inWishlist, onAdd }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`${styles.card} ${inWishlist ? styles.cardAdded : ""}`}
      title={inWishlist ? "Already in wishlist" : `Add "${product.name}" to wishlist`}
    >
      <img
        src={imgError ? `https://placehold.co/60x60?text=${encodeURIComponent(product.name[0])}` : product.image}
        alt={product.name}
        className={styles.image}
        onError={() => setImgError(true)}
        loading="lazy"
      />
      <div className={styles.info}>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
      </div>
      <button
        className={`${styles.addBtn} ${inWishlist ? styles.addBtnAdded : ""}`}
        onClick={() => !inWishlist && onAdd(product)}
        disabled={inWishlist}
        aria-label={inWishlist ? "Already in wishlist" : `Add ${product.name} to wishlist`}
        id={`similar-add-${product.id}`}
      >
        {inWishlist ? (
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
            <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        )}
      </button>
    </div>
  );
}
