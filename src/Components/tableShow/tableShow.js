import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Axios } from "../../axios/axios";
import PaginatedItems from "../Paginate/paginatedItems";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TransformDate from "../../helpers/transformDate";
import StringSlice from "../../helpers/stringSlice";

const TableShow = (props) => {
  const currentUser = props.currentUser || false;
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [searching, setSearching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  // filter data
  const filteredBySearch =
    date.length !== 0
      ? filteredData.filter((item) => TransformDate(item.created_at) === date)
      : filteredData;

  const filteredByDate =
    date.length !== 0
      ? props.data.filter((item) => TransformDate(item.created_at) === date)
      : props.data;

  const showData = search.length > 0 ? filteredBySearch : filteredByDate;

  useEffect(() => {
    const gitFilteredData = async () => {
      try {
        const res = await Axios.post(
          `${props.searchLink}/search?title=${search}`
        );
        setFilteredData(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setSearching(false);
      }
    };
    const delay = setTimeout(() => {
      search.length > 0 ? gitFilteredData() : setSearching(false);
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  //header show
  const headerShow = props.header.map((item, index) => (
    <th key={index}>{item.name}</th>
  ));

  //body show
  const dataShow = showData.map((item1, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      {props.header.map((item2, index) => (
        <td key={index}>
          {item1[item2.key] === item1.created_at ||
          item1[item2.key] === item1.updated_at ? (
            TransformDate(item1[item2.key])
          ) : item1[item2.key] === item1.title ||
            item1[item2.key] === item1.description ? (
            <div className="table-desc-title" title={item1[item2.key]}>
              {StringSlice(item1[item2.key], 15)}
            </div>
          ) : item1[item2.key] === "1995" ? (
            "Admin"
          ) : item1[item2.key] === "2001" ? (
            "User"
          ) : item1[item2.key] === "1999" ? (
            "Product Manger"
          ) : item1[item2.key] === currentUser.name ? (
            `${item1[item2.key]} ( you )`
          ) : item1[item2.key] === item1.image ? (
            <div className="table-img">
              <img src={item1[item2.key]} alt="category" />{" "}
            </div>
          ) : item1[item2.key] === item1.images ? (
            <div className="table-group-img">
              {item1[item2.key]
                .filter((_, index) => index <= 4)
                .map((item, index) => (
                  <img src={item.image} alt="product" key={index} />
                ))}
            </div>
          ) : (
            item1[item2.key]
          )}
        </td>
      ))}

      <td>
        {currentUser.id !== item1.id && (
          <div className="action-icons">
            <Link to={`${item1.id}`}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="icon-table"
                color="#2e86de"
              />
            </Link>
            <div>
              <FontAwesomeIcon
                className="icon-table"
                icon={faTrash}
                onClick={() => props.handleDelete(item1.id)}
                color=" #f53b57"
              />
            </div>
          </div>
        )}
      </td>
    </tr>
  ));

  return (
    <>
      <div className="filter-inputs">
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSearching(true);
          }}
          className="search-input"
          placeholder="search .."
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="date-input"
        />
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              {headerShow}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.loading ? (
              <tr>
                <td colSpan={12}>loading ...</td>
              </tr>
            ) : searching ? (
              <tr>
                <td colSpan={12}>searching ...</td>
              </tr>
            ) : (
              dataShow
            )}
          </tbody>
        </table>
      </div>
      <div className="paginate-grand">
        <select
          onChange={(e) => props.setLimit(e.target.value)}
          className="paginate-select"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <PaginatedItems
          setPage={props.setPage}
          itemsPerPage={props.perPage}
          total={props.total}
        />
      </div>
    </>
  );
};

export default TableShow;
