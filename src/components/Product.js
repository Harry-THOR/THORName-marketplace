import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Rating from './Rating'

import close from '../assets/close.svg'

const Product = ({ product, provider, account, tnm, togglePop }) => { 

  const [order, setOrder] = useState(null)

  const buyHandler = async () => {
    console.log("buying")
  }

  return (
    <div className="product">
      <div className="product__details">      
        <div className="product__image">
          <img src={product.image} alt="THORName" />
        </div>
        <div className="product__overview">
          <h3>{product.name}</h3>
          <hr />
          {/* <p>{product.description}</p> */}
          {/* <p>Category: {product.category}</p> */}
          {console.log(product)}
          <Rating value={product.rating} />
          <p>{ethers.utils.formatUnits(product.cost.toString(), 'ether')} ETH</p>
          {product.stock > 0 ? <p>In stock</p> : <p>Out of stock</p>}
          <button className="product__buy" onClick={buyHandler}>Buy Now</button>
        </div>
        <button className="product__close" onClick={togglePop}><img src={close} alt="Close" /></button>
      </div>

      {order && (
        <div className='product__bought'>
          Item bought on <br />
          <strong>
            {new Date(Number(order.time.toString() * '000')).toLocaleDateString(
              undefined,
              { 
                weekday: 'long', 
                hour: 'numeric', 
                minute: 'numeric', 
                second: 'numeric'
              }
            )}
          </strong>
        </div>
      )}
    </div >
  );
}

export default Product;