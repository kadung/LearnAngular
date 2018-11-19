const initialState: any = {
  showProductCode: true,
  currentProduct: null,
  products: []
}

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