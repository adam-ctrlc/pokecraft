"use client";

import { useState, useEffect, useCallback } from "react";

// String state persisted to sessionStorage so it survives route changes
// (e.g. wiki pagination remounts) within the same tab.
export function useSessionState(key, initial) {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    const stored = sessionStorage.getItem(key);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored !== null) setValue(stored);
  }, [key]);

  const update = useCallback(
    (v) => {
      setValue(v);
      if (typeof window !== "undefined") sessionStorage.setItem(key, v);
    },
    [key]
  );

  return [value, update];
}
