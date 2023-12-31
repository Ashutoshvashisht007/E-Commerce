import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

interface CartItemContainer{
    productId: number,
    image: string,
    title: string,
    price: number,
}

const CartItem: React.FC<CartItemContainer> = ({productId,image,title,price}) => {
  return (
    <div className='cartProductsLeft'>
    <div className="cartProductDetails">
          <img src={image} alt="iPhone 14" />
          <div className="cartProductDesc">
            <span className="cartProductTitle">{title}</span>
            <h3 className="cartProductPrice">${price}</h3>
          </div>
    </div>
    <div className="cartButtons">
      <button className="cartButton">
        <FaMinus />
      </button>
      <span>1</span>
      <button className="cartButton">
        <FaPlus />
      </button>
      <button className="cartButton">
        <MdDelete className="cartButtonDelete" />
      </button>
    </div>
    </div>
  )
}

export default CartItem