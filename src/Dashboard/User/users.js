import { useEffect, useState } from "react";
import { Axios } from "../../axios/axios";
import { USERS, USER } from "../../api/api";
import TableShow from "../../Components/tableShow/tableShow";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState("");
  const [perPage, setPerPage] = useState("");
  const [loading, setLoading] = useState(false);

  // get current user
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) => {
        setCurrentUser(data.data);
      })
      .catch((err) => console.log(err));
  }, [limit, page]);

  // get all users
  useEffect(() => {
    setLoading(true);
    Axios.get(`${USERS}?page=${page}&limit=${limit}`)
      .then((data) => {
        setUsers(data.data.data);
        setTotal(data.data.total);
        setPerPage(data.data.per_page);
      })

      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  // handle delete
  const handleDelete = async (id) => {
    id !== currentUser.id &&
      (await Axios.delete(`${USER}/${id}`).catch((c) => console.log(c)));
    setUsers((prev) => prev.filter((item) => item.id !== id));
  };

  const header = [
    { name: "name", key: "name" },
    { name: "email", key: "email" },
    { name: "role", key: "role" },
    { name: "last login", key: "updated_at" },
    { name: "created", key: "created_at" },
  ];
  return (
    <>
      <h4 className="top-header">users page</h4>
      <TableShow
        header={header}
        data={users}
        handleDelete={handleDelete}
        currentUser={currentUser}
        total={total}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        perPage={perPage}
        loading={loading}
        searchLink={USER}
      />
    </>
  );
};

export default Users;
