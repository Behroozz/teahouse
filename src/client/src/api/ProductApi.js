import axios from "axios/index"
import { asyncActionCreator, actions } from '../reducers/Actions'
const { FETCH_PRODUCTS } = actions

export async function fetchProducts(dispatch) {
  try {
    const response = await axios.post('api/products/populate')
    dispatch({ type: asyncActionCreator(FETCH_PRODUCTS).SUCCESS, payload: response.data.data})
  } catch (ex) {
    dispatch({ type: asyncActionCreator(FETCH_PRODUCTS).FAILURE, error: ex})
  }
}
