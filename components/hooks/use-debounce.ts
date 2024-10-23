'use client';
import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler); // Cleanup on value change or unmount
      };
    }, [value, delay]);
  
    return debouncedValue;
  }