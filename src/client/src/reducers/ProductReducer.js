const initialState = {
  loading: false,
  loaded: false,
  products: {},
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        loaded: true,
        products: action.payload,
      }
    case 'FETCH_PRODUCTS_FAILURE':
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export {
  reducer,
  initialState
}