import { useState, useEffect, useRef } from "react";

/**
 * Reveals items one-by-one with a delay to simulate a terminal
 * printing output lines from top to bottom.
 */
export function useSequentialReveal(count, stepMs = 220, startDelayMs = 200) {
  const [visibleCount, setVisibleCount] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    setVisibleCount(0);
    let i = 0;

    const tick = () => {
      i += 1;
      setVisibleCount(i);
      if (i < count) {
        timerRef.current = setTimeout(tick, stepMs);
      }
    };

    timerRef.current = setTimeout(tick, startDelayMs);
    return () => clearTimeout(timerRef.current);
  }, [count, stepMs, startDelayMs]);

  return visibleCount;
}
