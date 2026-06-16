"use client";

import { useState, useEffect, useCallback } from "react";

const KEY = "pokecraft:spriteView";

// Module-level pub/sub so every mounted component (wiki cards, toggles,
// detail page) stays in sync within the same tab.
const listeners = new Set();

function read() {
  if (typeof window === "undefined") return "3d";
  return sessionStorage.getItem(KEY) || "3d";
}

export function useSpriteView() {
  const [view, setView] = useState("3d");

  useEffect(() => {
    // Sync from sessionStorage after mount (keeps SSR markup stable, then
    // hydrates to the stored preference). Subscribe for cross-component updates.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setView(read());
    const cb = (v) => setView(v);
    listeners.add(cb);
    return () => listeners.delete(cb);
  }, []);

  const update = useCallback((v) => {
    if (typeof window !== "undefined") sessionStorage.setItem(KEY, v);
    listeners.forEach((cb) => cb(v));
  }, []);

  return [view, update];
}
