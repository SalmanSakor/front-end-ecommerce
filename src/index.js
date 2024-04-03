import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

// useContext
import OpenProvider from "./Context/isOpen";
import WidthProvider from "./Context/width";
import LayoutProvider from "./Context/layout";
// css files
import "./App.css";
import "./css/form.css";
import "./css/btn.css";
import "./css/input.css";
import "./css/icon.css";
import "./css/progress.css";
import "./Components/Header/header.css";
import "./Components/Loading/loading.css";
import "./Components/tableShow/tableShow.css";
import "./Dashboard/Dashboard/sideBar/sideBar.css";
import "./Dashboard/Dashboard/topBar/topBar.css";
import "./Pages/404and403.css";
import "./Components/Paginate/paginatedItems.css";
import "./Pages/allCategories/allCategories.css";
import "./Components/Product/productCard.css";
import "./Pages/LandingPage/landingPage.css";
import "./Components/Footer/Footer.css";
import "./Pages/Home/home.css";
import "./Pages/Checkout/checkout.css";

// css media query
import "./css/media.css";

// skeleton
import "react-loading-skeleton/dist/skeleton.css";

// redux
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <WidthProvider>
      <OpenProvider>
        <LayoutProvider>
          <Router>
            <App />
          </Router>
        </LayoutProvider>
      </OpenProvider>
    </WidthProvider>
  </Provider>
);
