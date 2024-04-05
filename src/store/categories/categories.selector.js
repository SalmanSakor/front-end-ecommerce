import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;
export const selectIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);
export const selectErr = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.err
);
