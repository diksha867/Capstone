import { useCallback, useEffect, useRef } from 'react';

const useDebounce = (callback, delay = 800) => {
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return useCallback((...args) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => callback(...args), delay);
  }, [callback, delay]);
};

export default useDebounce;
