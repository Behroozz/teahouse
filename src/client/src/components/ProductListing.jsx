import React, { useEffect, useReducer } from 'react'
import ProductReducer from '../reducers/ProductReducer'
import { fetchProducts } from '../api/ProductApi'
import { get } from 'lodash'
import ProductTile from '../components/ProductTile'

const ProductListing = () => {
  const [state, dispatch] = useReducer(ProductReducer)

  useEffect(() => {
    fetchProducts(dispatch)
  }, [])

  return (
    <div>
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