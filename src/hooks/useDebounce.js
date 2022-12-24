import React, { useEffect, useState } from "react";

const useDebounce = (inputVal, delay) => {
  const [debounce, setDebounce] = useState(inputVal);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(inputVal);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [inputVal, delay]);
  return debounce;
};

export default useDebounce;
