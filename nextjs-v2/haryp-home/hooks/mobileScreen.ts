import { useEffect, useState } from "react";

const useMobileScreen = () => {
  const [width, setWidth] = useState(0);
  const handleWindowSizeChange = () => {
    const actualWidth =
      window.innerWidth > 0 ? window.innerWidth : screen.width;
    setWidth(actualWidth);
  };

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return width <= 700;
};

export { useMobileScreen };
