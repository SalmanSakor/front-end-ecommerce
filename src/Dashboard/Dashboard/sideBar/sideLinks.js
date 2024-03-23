import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import {
  faPlus,
  faLayerGroup,
  faUser,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

export const Data = [
  {
    role: ["1995"],
    name: "users",
    icon: faUser,
    path: "/dashboard/users",
  },
  {
    role: ["1995"],
    name: "add user",
    icon: faPlus,
    path: "/dashboard/addUser",
  },
  {
    role: ["1995", "1999"],
    name: "categories",
    icon: faLayerGroup,
    path: "/dashboard/categories",
  },
  {
    role: ["1995", "1999"],
    name: "add category",
    icon: faPlus,
    path: "/dashboard/addCategory",
  },

  {
    role: ["1995", "1999"],
    name: "products",
    icon: faProductHunt,
    path: "/dashboard/products",
  },
  {
    role: ["1995", "1999"],
    name: "add product",
    icon: faPlus,
    path: "/dashboard/addProduct",
  },
  {
    role: ["1995", "1999"],
    name: "home page",
    icon: faHome,
    path: "/",
  },
];
