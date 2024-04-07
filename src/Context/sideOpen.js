import { createContext, useState } from "react";

export const OpenSide = createContext("");

const SideOpenContext = ({ children }) => {
  const [isOpenSide, setIsOpenSide] = useState(true);
  return (
    <OpenSide.Provider value={{ isOpenSide, setIsOpenSide }}>
      {children}
    </OpenSide.Provider>
  );
};
export default SideOpenContext;
