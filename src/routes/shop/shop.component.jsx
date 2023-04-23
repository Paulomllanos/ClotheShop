import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';

import Category from '../category/category.component';

import { fecthCategoriesStart } from '../../store/categories/category.action';

const Shop = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fecthCategoriesStart());
  }, []);
  
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />}></Route>
    </Routes>
  );
};

export default Shop;
