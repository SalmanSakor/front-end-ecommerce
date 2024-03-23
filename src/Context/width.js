import { createContext, useState, useEffect } from "react";

export const Width = createContext("");

const WidthContext = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const widthWindow = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", widthWindow);
    return () => {
      window.removeEventListener("resize", widthWindow);
    };
  }, []);
  return (
    <Width.Provider value={{ windowWidth, setWindowWidth }}>
      {children}
    </Width.Provider>
  );
};
export default WidthContext;
