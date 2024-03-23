import { Link } from "react-router-dom";

const Page403 = (props) => {
  return (
    <>
      {props.role === "2001" && (
        <div className="page-404">
          <div className="child-404">
            <div>403 : forbidden page</div>
            <div className="btn-404">
              <Link to="/">go to home page</Link>
            </div>
          </div>
        </div>
      )}

      {props.role === "1999" && (
        <div className="page-404-dashboard">
          <div className="child-404-dashboard">
            <div>403 : forbidden page</div>
            <div className="btn-404">
              <Link to={"/dashboard/products"}>go to products page</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Page403;
