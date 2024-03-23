import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="page-404">
      <div className="child-404">
        <div>404 : not found page</div>
        <div className="btn-404">
          <Link to="/">go to home page</Link>
        </div>
      </div>
    </div>
  );
};

export default Page404;
