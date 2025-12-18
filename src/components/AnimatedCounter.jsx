import { useEffect, useState } from "react";

const AnimatedCounter = ({ end, suffix = "", isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 1500;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(counter);
  }, [isVisible, end]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
