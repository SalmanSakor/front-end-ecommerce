import { useEffect, useState } from "react";
import { Axios } from "../../axios/axios";
import { latest_sale_products } from "../../api/api";
import Product from "../Product/product";
import SkeletonShow from "../Skeleton/skeletonShow";

const LatestSale = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // get latest sale products
  useEffect(() => {
    Axios.get(`${latest_sale_products}`)
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // mapping products
  const result = products.map((item, index) => (
    <Product
      title={item.title}
      desc={item.description}
      price={item.price}
      discount={item.discount}
      rating={item.rating}
      img={item.images[0].image}
      key={index}
      sale
      id={item.id}
      data={item}
    />
  ));

  return (
    <div>
      {loading ? (
        <SkeletonShow length={1} width="100%" height="40px" color="#dfe6e9" />
      ) : (
        <h4 className="top-header">latest sale products</h4>
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

export default LatestSale;
