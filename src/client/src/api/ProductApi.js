import axios from "axios/index"

export async function fetchProducts(dispatch) {
  try {
    const response = await axios.post('api/products/populate')
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data.data})
  } catch (ex) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', error: ex})
  }
}
