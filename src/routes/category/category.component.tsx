import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from "../../components/spinner/spinner.component";

import { selectCategoriesMap, selectIsLoading } from '../../store/categories/category.selector';

import { Title, CategotyContainer } from './category.styles';

type CategoryRouteParams = {
    category: string;
}

const Category = () => {
    console.log("render/re-render category component")

    // get title from params
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    
    // get categories, isLoading data from context
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsLoading);
    // get products from categories data
    const [products, setProducts] = useState(categoriesMap[category]);


    // here is the page refresh will has data
    useEffect(() => {
        console.log("category effect fired, and set products")
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <>
            <Title>{category.toUpperCase()}</Title>
            {isLoading ? (
                <Spinner />
            ) : (
                <CategotyContainer>
                    {products &&
                        products.map((product) => (<ProductCard key={product.id} product={product} />))
                    }
                </CategotyContainer>
            )}
        </>
    )
}

export default Category;