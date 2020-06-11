import { reducer as productReducer, initialState } from '../ProductReducer'
import { asyncActionCreator, actions }  from '../Actions'

const { FETCH_PRODUCTS } = actions

describe('Product Reducer', () => {
  it('should return initial state', () => {
    expect(productReducer(undefined, { type: '' }))
      .toEqual(initialState)
  })

  it('fetch product success should update the state correctly', () => {
    expect(productReducer(initialState, { type:  asyncActionCreator(FETCH_PRODUCTS).SUCCESS, payload: [{a:1}]}))
      .toEqual({
        ...initialState,
        loaded: true,
        products: [{a:1}]
      })
  })
})
