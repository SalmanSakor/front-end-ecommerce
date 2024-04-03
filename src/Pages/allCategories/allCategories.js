import React from "react";
import { useEffect, useState } from "react";
import { Axios } from "../../axios/axios";
import { CAT } from "../../api/api";
import StringSlice from "../../helpers/stringSlice";
import SkeletonShow from "../../Components/Skeleton/skeletonShow";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // get all categories
  useEffect(() => {
    Axios.get(`${CAT}`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // mapping categories
  const result = categories.map((item, index) => (
    <div key={index} className="one-category">
      <p title={item.title}>name : {StringSlice(item.title, 10)}</p>
      <img src={item.image} alt="category" />
    </div>
  ));

  return (
    <div className="all-categories">
      {loading ? (
        <SkeletonShow
          length={25}
          width="150px"
          height="150px"
          color="#b2bec3"
        />
      ) : (
        result
      )}
    </div>
  );
};

export default AllCategories;
