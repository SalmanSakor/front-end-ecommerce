import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../axios/axios";
import { CAT } from "../../api/api";
import SkeletonShow from "../../Components/Skeleton/skeletonShow";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsLoading,
  selectCategories,
  selectErr,
} from "../../store/categories/categories.selector";
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "../../store/categories/categories.action";

const AllCategories = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const categories = useSelector(selectCategories);
  const err = useSelector(selectErr);

  // get all categories
  useEffect(() => {
    Axios.get(`${CAT}`)
      .then((res) => dispatch(fetchCategoriesSuccess(res.data)))
      .catch((err) => dispatch(fetchCategoriesFailed(err)))
      .finally(() => dispatch(fetchCategoriesStart(false)));
  }, []);

  // mapping categories
  const result = categories.map((item, index) => (
    <div key={index} className="one-category">
      <p className="btn-submit">
        <Link to={`${item.id}`}>show all {item.title}</Link>
      </p>
      <img src={item.image} alt="category" />
    </div>
  ));

  return (
    <>
      {err && (
        <div
          className="btn-submit"
          style={{
            textAlign: "center",
            cursor: "default",
            textTransform: "lowercase",
          }}
        >
          check your network and try again
        </div>
      )}

      <div className="all-categories">
        {loading ? (
          <SkeletonShow
            length={7}
            width="170px"
            height="300px"
            color="#b2bec3"
          />
        ) : (
          result
        )}
      </div>
    </>
  );
};

export default AllCategories;
