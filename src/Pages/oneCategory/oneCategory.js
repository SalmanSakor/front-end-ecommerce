import { Axios } from "../../axios/axios";
import { useEffect, useState } from "react";
import { PRO, CAT } from "../../api/api";
import { useParams } from "react-router-dom";
import SkeletonShow from "../../Components/Skeleton/skeletonShow";
import CategoryItems from "../../Components/CategoryItems/categgoryItems";

const Category = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // get products
  useEffect(() => {
    Axios.get(`${PRO}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // get title category
  useEffect(() => {
    Axios.get(`${CAT}`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const categoryTitle = categories
    .filter((item) => item.id.toString() === id)
    .map((item, index) => (
      <div key={index}>
        <div>{item.title}</div>
      </div>
    ));
  const result = products
    .filter((item) => item.category.toString() === id)
    .map((item, index) => (
      <CategoryItems
        title={item.title}
        desc={item.description}
        img={item.images[0].image}
        price={item.price}
        discount={item.discount}
        rating={item.rating}
        key={index}
        data={item}
        id={item.id}
      />
    ));

  return (
    <>
      <div>
        {loading ? (
          <SkeletonShow length={1} width="100%" height="40px" color="#b2bec3" />
        ) : (
          <header className="top-header">{categoryTitle}</header>
        )}
      </div>
      <div className="parent-card-product">
        {loading ? (
          <SkeletonShow
            length={6}
            width="200px"
            height="500px"
            color="#b2bec3"
          />
        ) : (
          result
        )}
      </div>
    </>
  );
};

export default Category;
