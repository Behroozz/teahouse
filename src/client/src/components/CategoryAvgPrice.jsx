import React, {useEffect, useState} from 'react'
import { get, filter, reduce, size, map } from 'lodash'
import { useSelectors } from '../hooks/CustomHooks'

const CategoryAvgPrice = ({reducer}) => {
  const [avgCategoryPrice, setAvgCategoryPrice] = useState([])

  const { getCategoryAveragePrice, getCategories } = useSelectors(reducer, (state) => ({
    getCategoryAveragePrice: (category) => {
      const products = get(state, 'products')
      if(size(products) > 0) {
        const productsForCategories = filter(products, product => get(product, 'category') === category)
        const productCount = size(productsForCategories)
        return {
          avgPrice: reduce(productsForCategories,(acc, curr) => {
            acc += get(curr, 'price')
            return acc
          }, 0) / productCount,
          count: productCount
        }
      }
      return 0
    },
    getCategories: () => {
      return [...new Set(map(get(state, 'products'), product => get(product, 'category')))]
    }
  }))
  
  useEffect(() => {
    const priceMap = map(getCategories(), category => {
      const { avgPrice, count } = getCategoryAveragePrice(category)
      return {category: category, price: avgPrice, count }
    })
    setAvgCategoryPrice(priceMap)
  }, [reducer])

  return (
    <div className="avgContainer">
      <div>
        <p>{'category:'}</p>
        <p>{'count:'}</p>
        <p>{'avg price:'}</p>
      </div>
      {map(avgCategoryPrice, avg => 
        <div>
          <p>{get(avg, 'category')}</p>
          <p>{get(avg, 'count')}</p>
          <p>{Number.parseFloat(get(avg, 'price')).toFixed(2)}</p>
        </div>)}
    </div>
  )
}

export default CategoryAvgPrice