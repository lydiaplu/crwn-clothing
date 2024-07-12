import { createContext, useState, useEffect } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesMap = await getCategoriesAndDocuments();
            console.log("categoriesMap: ", categoriesMap);
            setCategoriesMap(categoriesMap);
        }

        getCategoriesMap();
    }, [])

    /** create data from shop-data to database */
    // useEffect(()=>{
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, [])

    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}