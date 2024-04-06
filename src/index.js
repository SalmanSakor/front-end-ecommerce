import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

// useContext
import MenuProvider from "./Context/menu";
import WidthProvider from "./Context/width";

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
import "./Components/ProductItems/productItems.css";

// css media query
import "./css/media.css";

// skeleton
import "react-loading-skeleton/dist/skeleton.css";

// redux
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <WidthProvider>
        <MenuProvider>
          <Router>
            <App />
          </Router>
        </MenuProvider>
      </WidthProvider>
    </PersistGate>
  </Provider>
);
