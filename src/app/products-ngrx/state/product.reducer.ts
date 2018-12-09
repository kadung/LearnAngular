import { createFeatureSelector, createSelector } from "../../../../node_modules/@ngrx/store";
import { Product } from "../../data-types/product";
import { ProductActions, ProductActionType } from "./product.action";

// Define data type for product slice
interface ProductState {
  showProductCode: boolean,
  currentProductID: number | null,
  products: Product[],
  err: string
}

// Initialize default value product slice
const initialState: ProductState = {
  showProductCode: true,
  currentProductID: null,
  products: [],
  err: ''
}

// Create selector to get data of a slice
const getProductFeatureState = createFeatureSelector<ProductState>('products');

// Create and export needed data
export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProductID = createSelector(
  getProductFeatureState,
  state => state.currentProductID
)

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductID,
  (state, currentProductID) => {
    if (currentProductID === 0){
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        releaseDate: '',
        description: '',
        price: 0,
        starRating: 0,
        imageUrl: ''
      };
    }
    else{
      return currentProductID ? state.products.find(p => p.id === currentProductID) : null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.err
)

export function reducer(state = initialState, action: ProductActions) {
  switch (action.type) {

    case ProductActionType.TongleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };

    case ProductActionType.SetCurrentProduct:
    return {
      // ... means creates a new copy of that object, similar to object.assign
      ...state,
      currentProductID: action.payload.id
    };

    case ProductActionType.ClearCurrentProduct:
    return {
      ...state,
      currentProductID: null
    };

    case ProductActionType.InitializeCurrentProduct:
    return {
      ...state,    
      currentProductID: 0
    };

    case ProductActionType.LoadSuccess:
    return {
      ...state,
      products: action.payload,
      err: ''
    }

    case ProductActionType.LoadFail:
    return {
      ...state,
      products: [],
      err: action.payload
    }

    case ProductActionType.UpdateProductSuccess:
      const updatedProducts = state.products.map(
        item => action.payload.id === item.id ? action.payload : item
      );
      return {
        ...state,
        products: updatedProducts,
        currentProductID: action.payload.id,
        err: ''
      }

    case ProductActionType.UpdateProductFail:
      return {
        ...state,
        err: action.payload
      }

    default:
      return state;
  }
}