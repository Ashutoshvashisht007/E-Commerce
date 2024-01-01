import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom';

interface CartItemContainer{
    productId: number,
    image: string,
    title: string,
    price: number,
}

const CartItem: React.FC<CartItemContainer> = ({productId,image,title,price}) => {

  const [count,setCount] = useState<number>(0);

  const handleMinus = ()=>{
    if(count > 0)
    {
      setCount((prev)=>prev - 1);
    }
  }

  return (
    <div className='cartProductsLeft'>
    <div className="cartProductDetails">
          <img src={image} alt={title}/>
          <div className="cartProductDesc">
            <Link to={`/product/${productId}`}>
              <span className="cartProductTitle">{title}</span>
            </Link>
            <h3 className="cartProductPrice">${price}</h3>
          </div>
    </div>
    <div className="cartButtons">
      <button className="cartButton" onClick={()=> handleMinus()}>
        <FaMinus />
      </button>
      <span>{count}</span>
      <button className="cartButton" onClick={()=> setCount((prev)=>prev + 1)}>
        <FaPlus />
      </button>
      <button className="cartButtonDel">
        <MdDelete className="cartButtonDelete" />
      </button>
    </div>
    </div>
  )
}

export default CartItem