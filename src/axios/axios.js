import axios from "axios";
import Cookie from "cookie-universal";
import { baseurl } from "../api/api";

const cookie = Cookie();
const token = cookie.get("token");

export const Axios = axios.create({
  baseURL: baseurl,
  headers: { Authorization: `Bearer ${token}` },
});
