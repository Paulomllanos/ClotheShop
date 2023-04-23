import { Title, CategoryContainer } from './category.style';
import Spinner from '../../components/spinner/spinner.components';
import ProductCard from '../../components/product-card/product-card.component';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector';
import { useParams } from 'react-router-dom';

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])
    

    return (
      <>
        <Title>{category.toUpperCase()}</Title>
        {isLoading ? (
          <Spinner />
        ) : (
          <CategoryContainer>
            {products &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </CategoryContainer>
        )}
      </>
    );
}

export default Category;