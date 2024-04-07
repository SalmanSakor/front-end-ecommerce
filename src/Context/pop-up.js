import { createContext, useState } from "react";

export const Pop = createContext("");

const PopUpContext = ({ children }) => {
  const [isPop, setIsPop] = useState(true);
  return <Pop.Provider value={{ isPop, setIsPop }}>{children}</Pop.Provider>;
};
export default PopUpContext;
