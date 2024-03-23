import { createContext, useState } from "react";

export const Open = createContext("");

const OpenContext = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Open.Provider value={{ isOpen, setIsOpen }}>{children}</Open.Provider>
  );
};
export default OpenContext;
