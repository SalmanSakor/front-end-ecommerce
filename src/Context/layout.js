import { createContext, useState } from "react";

export const Layout = createContext("");

const LayoutContext = ({ children }) => {
  const [layoutOpen, setLayoutOpen] = useState(true);
  return (
    <Layout.Provider value={{ layoutOpen, setLayoutOpen }}>
      {children}
    </Layout.Provider>
  );
};
export default LayoutContext;
