import TableShow from "../../Components/tableShow/tableShow";
import { useEffect, useState } from "react";
import { cat, CAT } from "../../api/api";
import { Axios } from "../../axios/axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState("");
  const [perPage, setPerPage] = useState("");
  const [loading, setLoading] = useState(false);

  // get categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`${CAT}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCategories(data.data.data);
        setTotal(data.data.total);
        setPerPage(data.data.per_page);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  // handle delete
  const handleDelete = async (id) => {
    await Axios.delete(`${cat}/${id}`).catch((c) => console.log(c));
    setCategories((prev) => prev.filter((item) => item.id !== id));
  };

  const header = [
    {
      name: "title",
      key: "title",
    },
    { name: "image", key: "image" },
    { name: "updated", key: "updated_at" },
    { name: "created", key: "created_at" },
  ];

  return (
    <>
      <h4 className="top-header">categories page</h4>
      <TableShow
        header={header}
        data={categories}
        handleDelete={handleDelete}
        limit={limit}
        page={page}
        setLimit={setLimit}
        setPage={setPage}
        perPage={perPage}
        total={total}
        loading={loading}
        searchLink={cat}
      />
    </>
  );
};

export default Categories;
