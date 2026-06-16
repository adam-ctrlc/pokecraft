"use client";

import { useEffect } from "react";

// Call `handler` when a mousedown happens outside the referenced element.
export function useClickOutside(ref, handler) {
  useEffect(() => {
    const onMouseDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handler();
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [ref, handler]);
}
