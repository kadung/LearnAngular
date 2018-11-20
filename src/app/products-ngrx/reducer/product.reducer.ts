import { createFeatureSelector, createSelector } from "../../../../node_modules/@ngrx/store";
import { Product } from "../../models/product";

// Define data type for product slice
interface ProductState {
  showProductCode: boolean,
  currentProduct: Product,
  products: Product[]
}

// Initialize default value product slice
const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
}

// Create selector to get data of a slice
const getProductFeatureState = createFeatureSelector<ProductState>('products');

// Create and export needed data
export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export function reducer(state = initialState, action) {
  switch (action.type) {

    case 'TOGGLE_PRODUCT_CODE':
      return {
        ...state,
        showProductCode: action.payload
      };

    default:
      return state;
  }
}