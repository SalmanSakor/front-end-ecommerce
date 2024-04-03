import { useEffect, useState } from "react";
import { Axios } from "../../axios/axios";
import { top_rated } from "../../api/api";
import Product from "./product";
import SkeletonShow from "../Skeleton/skeletonShow";

const TopRated = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // get top rated products
  useEffect(() => {
    Axios.get(`${top_rated}`)
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // map latest products
  const result = products.map((item, index) => (
    <Product
      title={item.title}
      desc={item.description}
      img={item.images[0].image}
      price={item.price}
      discount={item.discount}
      rating={item.rating}
      key={index}
      data={item}
    />
  ));

  return (
    <div className="products">
      <h4 className="top-header">top rated products</h4>
      <div className="parent-card">
        {loading ? (
          <SkeletonShow
            length={4}
            width="200px"
            height="300px"
            color="#dfe6e9"
          />
        ) : (
          result
        )}
      </div>
    </div>
  );
};

export default TopRated;
