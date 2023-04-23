import { CATEGORIES_ACTION_TYPES } from "./category.types";

import { createAction } from "../../utils/reducer/reducer.utils";

export const fecthCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FECTH_CATEGORIES_START);

export const fecthCategoriesSuccess = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPES.FECTH_CATEGORIES_SUCCESS, categoriesArray);

export const fecthCategoriesFailed = (error) => createAction(CATEGORIES_ACTION_TYPES.FECTH_CATEGORIES_FAILED, error);

