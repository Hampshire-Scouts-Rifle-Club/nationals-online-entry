import { useEffect, useRef } from 'react';

/**
 * Poll the callback. Sets up an interval and clears it after unmounting.
 * Source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * @param callback
 * @param intervalInMs
 */
export function useInterval(callback: () => void, intervalInMs: number) {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (intervalInMs) {
      const id = setInterval(tick, intervalInMs);
      return () => clearInterval(id);
    }

    // For ESLint
    return () => {};
  }, [intervalInMs]);
}
