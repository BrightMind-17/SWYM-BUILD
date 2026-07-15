import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { WISHLIST_A, WISHLIST_B } from "../data/products";

// ─── Context ───────────────────────────────────────────────────────────────────
const WishlistContext = createContext(null);

/**
 * WishlistProvider – wraps the app and exposes wishlist state & actions.
 * The wishlist is persisted in localStorage under the key "wishlist".
 * Drawer open/close state is managed here so adding an item auto-opens it.
 */
export function WishlistProvider({ children }) {
  // Initialise from localStorage (or empty array)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem("wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Notification state for user feedback
  const [notification, setNotification] = useState(null);

  // Wishlist drawer open/close – auto-opens when an item is added
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Persist every change
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Show a temporary notification
  const notify = useCallback((message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  /** Add a product – silently ignores duplicates, then opens the drawer */
  const addToWishlist = useCallback((product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      notify(`"${product.name}" added to wishlist!`);
      return [...prev, product];
    });
    // Open the drawer so the user sees the item was added
    setIsDrawerOpen(true);
  }, [notify]);

  /** Remove a product by id */
  const removeFromWishlist = useCallback((productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  /** Check if a product is already in the wishlist */
  const isInWishlist = useCallback(
    (productId) => wishlist.some((item) => item.id === productId),
    [wishlist]
  );

  /**
   * Merge Wishlists:
   * - Combines WISHLIST_A (base) with the current wishlist.
   * - Deduplicates by id, keeping Wishlist A order first, then new unique items.
   * - Saves result to localStorage.
   */
  const mergeWishlists = useCallback(() => {
    const base = WISHLIST_A.filter(Boolean);
    const extra = WISHLIST_B.filter(Boolean);
    const seen = new Set(base.map((p) => p.id));
    const merged = [...base];

    // Add unique items from Wishlist B
    extra.forEach((item) => {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        merged.push(item);
      }
    });

    // Also include any items already in the current wishlist not yet in merged
    wishlist.forEach((item) => {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        merged.push(item);
      }
    });

    setWishlist(merged);
    setIsDrawerOpen(true);
    notify(`Wishlists merged! ${merged.length} unique items saved.`, "merge");
  }, [wishlist, notify]);

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    mergeWishlists,
    notification,
    isDrawerOpen,
    setIsDrawerOpen,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

/** Hook for consuming the WishlistContext */
export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
