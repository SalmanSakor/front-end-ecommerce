import TableShow from "../../Components/tableShow/tableShow";
import { useEffect, useState } from "react";
import { PRO, pro } from "../../api/api";
import { Axios } from "../../axios/axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState("");
  const [perPage, setPerPage] = useState("");
  const [loading, setLoading] = useState(false);

  // get products

  useEffect(() => {
    setLoading(true);
    Axios.get(`${PRO}?page=${page}&limit=${limit}`)
      .then((data) => {
        setProducts(data.data.data);
        setTotal(data.data.total);
        setPerPage(data.data.per_page);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  // handle delete

  const handleDelete = async (id) => {
    await Axios.delete(`${pro}/${id}`).catch((c) => console.log(c));
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const header = [
    { name: "images", key: "images" },
    { name: "title", key: "title" },
    { name: "description", key: "description" },
    { name: "price", key: "price" },
    { name: "rating", key: "rating" },
    { name: "updated", key: "updated_at" },
    { name: "created", key: "created_at" },
  ];

  return (
    <>
      <h4 className="top-header">products page</h4>
      <TableShow
        header={header}
        data={products}
        handleDelete={handleDelete}
        total={total}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        perPage={perPage}
        loading={loading}
        searchLink={pro}
      />
    </>
  );
};

export default Products;
