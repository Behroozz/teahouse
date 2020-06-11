import React from 'react'

const ProductTile = ({ id, title, description, price, creator, type, img, category, color }) => {
  return (
    <div className="productCard">
      <img className="productImage" src={img} alt={title} />
      <div className="productInfo">
        <h5 className="productTitle">{title}</h5>
        <p className="productCreator">{creator}</p>
        <p className="productType">{type}</p>
        <p className="productPrice">{`${price} $`}</p>
        <p className="productDescription">{description}</p>
      </div>
      <p><button>Add to Cart</button></p>
    </div>
  )
}

export default ProductTile