const Footer = () => {
  const date = new Date();
  const Year = date.getFullYear();
  return <div className="footer">created by salman sakor {Year}</div>;
};

export default Footer;
