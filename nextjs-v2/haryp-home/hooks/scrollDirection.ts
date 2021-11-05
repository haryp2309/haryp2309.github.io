import { useEffect, useState } from "react";
type ReturnValue = {
  scrollingDirection: "up" | "down";
};
export const useScrollDirection = (threshold = 0) => {
  const [scrollingDirection, setScrollingDirection] =
    useState<ReturnValue["scrollingDirection"]>("up");
  const [scrollLevel, setScrollLevel] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        return;
      }
      setScrollingDirection(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      setScrollLevel(lastScrollY);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { scrollingDirection, scrollLevel };
};
