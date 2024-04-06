import { useEffect, useState } from "react";
import { Axios } from "../../axios/axios.js";
import { useParams } from "react-router-dom";
import { PRO } from "../../api/api";
import ProductItems from "../../Components/ProductItems/productItems.js";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  console.log(id);
  console.log(products);

  // get one product
  useEffect(() => {
    Axios.get(`${PRO}`)
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, []);

  // map product items
  const result = products
    .filter((item) => item.id.toString() === id)
    .map((item, index) => (
      <ProductItems
        key={index}
        title={item.title}
        desc={item.description}
        img={item.images[0].image}
        price={item.price}
        discount={item.discount}
        rating={item.rating}
        data={item}
      />
    ));

  return <div>{result}</div>;
};

export default AllProducts;
