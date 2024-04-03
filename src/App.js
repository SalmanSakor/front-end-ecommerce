import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/home";
import LandingPage from "./Pages/LandingPage/landingPage";
import Checkout from "./Pages/Checkout/checkout";
import Register from "./Pages/Auth/register";
import Login from "./Pages/Auth/login";
import GoogleCallback from "./Pages/Auth/googleCallback";
import RequireAuth from "./Pages/Auth/requireAuth";
import RequireBack from "./Pages/Auth/requireBack";
import Page404 from "./Pages/404";

// dashboard
import Dashboard from "./Dashboard/Dashboard/Dashboard/dashboard";
// user Pages
import Users from "./Dashboard/User/users";
import AddUser from "./Dashboard/User/addUser";
import UpdateUser from "./Dashboard/User/updateUser";
// category Pages
import Categories from "./Dashboard/Category/categories";
import AddCategory from "./Dashboard/Category/addCategory";
import UpdateCategory from "./Dashboard/Category/updateCategory";
// product Pages
import Products from "./Dashboard/Product/products";
import AddProduct from "./Dashboard/Product/addProduct";
import UpdateProduct from "./Dashboard/Product/updateProduct";
import AllCategories from "./Pages/allCategories/allCategories";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<LandingPage />} />
        <Route path="allCategories" element={<AllCategories />} />
        <Route path="checkout" element={<Checkout />} />
        <Route element={<RequireBack />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>

      <Route path="/auth/google/callback" element={<GoogleCallback />} />
      <Route path="/*" element={<Page404 />} />

      <Route element={<RequireAuth allowedRole={["1995", "1999"]} />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route element={<RequireAuth allowedRole={["1995"]} />}>
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UpdateUser />} />
            <Route path="addUser" element={<AddUser />} />
          </Route>
          <Route element={<RequireAuth allowedRole={["1995", "1999"]} />}>
            <Route path="categories" element={<Categories />} />
            <Route path="addCategory" element={<AddCategory />} />
            <Route path="categories/:id" element={<UpdateCategory />} />
          </Route>
          <Route element={<RequireAuth allowedRole={["1995", "1999"]} />}>
            <Route path="products" element={<Products />} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="products/:id" element={<UpdateProduct />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
