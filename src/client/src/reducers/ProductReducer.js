import { asyncActionCreator, actions } from './Actions'
const { FETCH_PRODUCTS } = actions

const initialState = {
  loading: false,
  loaded: false,
  products: {},
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case asyncActionCreator(FETCH_PRODUCTS).SUCCESS:
      return {
        ...state,
        loaded: true,
        products: action.payload,
      }
    case asyncActionCreator(FETCH_PRODUCTS).FAILURE:
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