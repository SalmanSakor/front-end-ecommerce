import { useEffect, useState } from "react";
import { Axios } from "../../axios/axios";
import { latest_products } from "../../api/api";
import Product from "./product";
import SkeletonShow from "../Skeleton/skeletonShow";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // get latest products
  useEffect(() => {
    Axios.get(`${latest_products}`)
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // map latest products
  const result = products
    .filter((_, index) => index <= 2)
    .map((item, index) => (
      <Product
        title={item.title}
        desc={item.description}
        price={item.price}
        discount={item.discount}
        rating={item.rating}
        img={item.images[0].image}
        key={index}
        id={item.id}
        sale
        data={item}
      />
    ));

  return (
    <div>
      {loading ? (
        <SkeletonShow length={1} width="100%" height="40px" color="#dfe6e9" />
      ) : (
        <h4 className="top-header">latest products</h4>
      )}
      <div className="parent-card-product">
        {loading ? (
          <SkeletonShow
            length={4}
            width="200px"
            height="500px"
            color="#dfe6e9"
          />
        ) : (
          result
        )}
      </div>
    </div>
  );
};

export default LatestProducts;
