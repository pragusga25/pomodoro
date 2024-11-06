import { useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  validationFn?: (value: T) => boolean
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      const parsedItem = item ? JSON.parse(item) : initialValue;
      if (validationFn && !validationFn(parsedItem)) {
        return initialValue;
      }
      return parsedItem;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  };

  return [storedValue, setValue];
};
