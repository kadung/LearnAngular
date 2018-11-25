import { createFeatureSelector, createSelector } from "../../../../node_modules/@ngrx/store";
import { Product } from "../../data-types/product";
import { ProductActions, ProductActionType } from "./product.action";

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

export function reducer(state = initialState, action: ProductActions) {
  switch (action.type) {

    case ProductActionType.TongleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };

    case ProductActionType.SetCurrentProduct:
    return {
      // ... means creates a new copy of that object
      ...state,
      currentProduct: {...action.payload}
    };

    case ProductActionType.ClearCurrentProduct:
    return {
      ...state,
      currentProduct: null
    };

    case ProductActionType.InitializeCurrentProduct:
    return {
      ...state,
      currentProduct: {
        id: 0,
        productName: '',
        productCode: 'new',
        description: '',
        startRating: 0
      }
    };

    default:
      return state;
  }
}