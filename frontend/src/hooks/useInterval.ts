// https://gist.github.com/babakness/faca3b633bc23d9a0924efb069c9f1f5
import * as React from 'react';

const { useEffect, useRef } = React;

type IntervalFunction = () => unknown | void;

export function useInterval(callback: IntervalFunction, delay: number): void {
  const savedCallback = useRef<IntervalFunction | null>(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick(): void {
      if (savedCallback.current !== null) {
        savedCallback.current();
      }
    }
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}