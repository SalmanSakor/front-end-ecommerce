import { CATEGORIES_ACTION_TYPES } from "./categories.types";
import { createAction } from "../../helpers/reducer";
export const fetchCategoriesStart = (boolean) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, boolean);

export const fetchCategoriesSuccess = (categoriesMap) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesMap);

export const fetchCategoriesFailed = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

// export const fetchCategoriesAsync = () => {
//   return async (dispatch) => {
//      dispatch(fetchCategoriesStart(false));
//     try {
//       const res = await Axios.get(`${CAT}`);
//       dispatch(fetchCategoriesSuccess(res.data));
//     } catch (err) {
//       dispatch(fetchCategoriesFailed(err));
//     }
//   };
// };
