const Footer = () => {
  const date = new Date();
  const Year = date.getFullYear();
  return <div className="footer">created by Salman Sakor {Year}</div>;
};

export default Footer;
