import iphone14 from "../assets/images/iphone14.png"
import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

interface productCard{
  id: number,
  image: string,
  title: string,
  price: number
}

const products: productCard[] = [

  {
    id: 1,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=70",
    title: "iPhone 14",
    price: 100
  },
  {
    id: 2,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=70",
    title: "iPhone 14",
    price: 100
  },
  {
    id: 3,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=70",
    title: "iPhone 14",
    price: 100
  },
  {
    id: 4,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=70",
    title: "iPhone 14",
    price: 100
  },
  {
    id: 5,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=70",
    title: "iPhone 14",
    price: 100
  },
  {
    id: 6,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=70",
    title: "iPhone 14",
    price: 100
  },
  {
    id: 7,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=70",
    title: "iPhone 14",
    price: 100
  },
  {
    id: 8,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=70",
    title: "iPhone 14",
    price: 100
  },

]

const Cart = () => {

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  useEffect(()=>{

    const timeOutId = setTimeout(()=>{
      Math.random() > 0.5 ? setIsValidCouponCode(true) : setIsValidCouponCode(false);
    },1000)

    return() => {
      clearTimeout(timeOutId);
      setIsValidCouponCode(false);
    }
  },[couponCode])

  return (
    <div className="cart">
      <main className="cartLeftContainer">
        {

          products.length > 0 ? (products.map((product: productCard)=>
            <CartItem key={product.id} productId={product.id} image={product.image} title={product.title} price={product.price}/>
          )) : <h1>No Items Added</h1>
        }
      </main>

      <aside className="cartRightContainer">
        <span>Subtotal: $100</span>
        <span>Shipping Charget: $0</span>
        <span>Tax Charget: $10</span>
        <span>Discountt: <em> - $0 </em></span>
        <span><b>Total: $110</b></span>

        <input type="text" placeholder="Coupon Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />

        {
          couponCode && 
            (isValidCouponCode ? 
              (
                <span className="green greenText">$10 off using <code>{couponCode}</code></span>
              ) : (
                <span className="red redText">Invalid Coupon Code</span>
              ))
        }

        {
          products.length > 0 && <Link to="/shipping">
            <button className="cartCouponBtn">Check Out</button>
          </Link>
        }
      </aside>

    </div>

  )
}

export default Cart