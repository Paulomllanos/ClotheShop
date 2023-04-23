import {takeLatest, all, call, put} from 'redux-saga/effects';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import { fecthCategoriesFailed, fecthCategoriesSuccess } from './category.action';

import { CATEGORIES_ACTION_TYPES } from './category.types';

export function* fecthCategoriesAsync(){
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
        yield put(fecthCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield put(fecthCategoriesFailed(error))
    }
}

export function* onFecthCategories(){
    yield takeLatest(CATEGORIES_ACTION_TYPES.FECTH_CATEGORIES_START, fecthCategoriesAsync)
}

export function* categoriesSaga() {
    yield all([call(onFecthCategories)])
}