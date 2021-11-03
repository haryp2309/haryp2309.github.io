import { useEffect, useState } from "react";

export const useScrollDirection = (threshold = 0): "up" | "down" => {
  const [scrollingDirection, setScrollingDirection] = useState<"up" | "down">(
    "up"
  );

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        return;
      }
      setScrollingDirection(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollingDirection, threshold]);

  return scrollingDirection;
};
