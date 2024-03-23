import LatestSale from "../../Components/Product/latestSale.js";
import LatestProduct from "../../Components/Product/latestProduct.js";
import TopRated from "../../Components/Product/topRated.js";
import Footer from "../../Components/Footer/Footer.js";

const LandingPage = () => {
  return (
    <div className="landing-parent">
      <div className="landing-search-input">
        <input
          type="search"
          placeholder="search product .."
          className="search-input"
        />
      </div>

      <div className="landing-latestSale">
        <LatestSale />
      </div>
      <hr style={{ marginBottom: "20px" }} color="#2e86de" />
      <div className="parent-landing-top-latest">
        <TopRated />
        <LatestProduct />
      </div>
      <hr style={{ marginTop: "20px" }} color="#2e86de" />
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
