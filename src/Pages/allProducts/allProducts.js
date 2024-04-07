import { useEffect, useState } from "react";
import { Axios } from "../../axios/axios.js";
import { useParams } from "react-router-dom";
import { PRO } from "../../api/api";
import ProductItems from "../../Components/ProductItems/productItems.js";
import SkeletonShow from "../../Components/Skeleton/skeletonShow";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  console.log(id);
  console.log(products);

  // get one product
  useEffect(() => {
    Axios.get(`${PRO}`)
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // map product items
  const result = products
    .filter((item) => item.id.toString() === id)
    .map((item, index) => (
      <ProductItems
        key={index}
        about={item.About}
        title={item.title}
        desc={item.description}
        img={item.images[0].image}
        price={item.price}
        discount={item.discount}
        rating={item.rating}
        data={item}
      />
    ));

  return (
    <div>
      {loading ? (
        <SkeletonShow length={1} width="100%" height="400px" color="#b2bec3" />
      ) : (
        result
      )}
    </div>
  );
};

export default AllProducts;
