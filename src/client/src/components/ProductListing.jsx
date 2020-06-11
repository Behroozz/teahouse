import React, { useEffect, useReducer } from 'react'
import { get } from 'lodash'
import { reducer as ProductReducer, initialState } from '../reducers/ProductReducer'
import { fetchProducts } from '../api/ProductApi'
import ProductTile from '../components/ProductTile'
import CategoryAvgPrice from '../components/CategoryAvgPrice'

const ProductListing = () => {
  const reducer = useReducer(ProductReducer, initialState)
  const [state, dispatch] = reducer

  useEffect(() => {
    fetchProducts(dispatch)
  }, [])

  return (
    <div>
      <CategoryAvgPrice reducer={reducer}/>
      <div className="productContainer row">
        {get(state, 'loaded') &&
          state.products.map((product, index) =>
            <div key={get(product, 'id')} className="productCell col-md-4 col-sm-6 col-lg-3">
              <ProductTile
                key={get(product, 'id')}
                title={get(product, 'title')}
                description={get(product, 'description')}
                price={get(product, 'price')}
                creator={get(product, 'creator')}
                type={get(product, 'type')}
                img={get(product, 'img')}
                category={get(product, 'category')}
                color={get(product, 'color')}
              />
            </div>
          )}
      </div>
    </div>
  )
}

export default ProductListing