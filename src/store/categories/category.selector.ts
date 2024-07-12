import { createSelector } from "reselect";
import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";
import { RootState } from "../store";

const selectCategoryReducer = (state: RootState): CategoriesState => {
    console.log("category selector fire 1 - get state.categories data")
    return state.categories;
}

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        console.log("category selector fire 2 - selectCategories");
        return categoriesSlice.categories
    }
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories): CategoryMap => {
        console.log("category selector fire 3 - selectCategoriesMap");
        return categories.reduce((acc, docSnapshot) => {
            // get data from collection
            const { title, items } = docSnapshot;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {} as CategoryMap);
    }
)

export const selectIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)