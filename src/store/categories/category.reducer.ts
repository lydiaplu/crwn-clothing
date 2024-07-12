import { AnyAction } from "redux";
import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";

/** initial state */
export type CategoriesState = {
    categories: Category[];
    isLoading: boolean;
    error: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action: AnyAction): CategoriesState => {

    switch (action.type) {
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            return {
                ...state,
                isLoading: true
            };
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categories: action.payload
            };
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
}