const initialState = {
  loading: false,
  loaded: false,
  products: {},
  error: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...initialState,
        loaded: true,
        products: action.payload,
      }
    case 'FETCH_PRODUCTS_FAILURE':
      return {
        ...initialState,
        error: action.error
      }
    default:
      return state
  }
}

export default reducer