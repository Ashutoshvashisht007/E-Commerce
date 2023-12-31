import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"

interface Products{
  id: number,
  image: string,
  name: string,
  price: number,
  stock: number,
}

const productsArray: Products[] = [
  {
    id: 1,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=70",
    name: "iPhone 14",
    price: 100,
    stock: 2,
  },
  {
    id: 2,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=70",
    name: "iPhone 14",
    price: 100,
    stock: 4,
  },
  {
    id: 4,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=70",
    name: "iPhone 14",
    price: 100,
    stock: 0,
  },
  {
    id: 5,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=70",
    name: "iPhone 14",
    price: 100,
    stock: 5,
  },
  {
    id: 6,
    image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=70",
    name: "iPhone 14",
    price: 100,
    stock: 1,
  }
]

const Home = () => {

  const addToCardHandler = ()=>{

  }

  return (
    <div className="home">
      <section className="homeSection">
        <h1 className="homeSectionDesc">Welcome to Gadets store</h1>
      </section>
      <div className="homeHeading">
        <h1>LATEST PRODUCTS</h1>
        <Link className="homeHeadingProduct" to="/search" >
          MORE
        </Link>
        
      </div>
      <div className="homeProducts">
        {
          productsArray.map((product: Products)=>
            <ProductCard key={product.id} productID={product.id} image={product.image} name={product.name} price={product.price} stock={product.stock} handler={addToCardHandler} />
          )
        
        }
      </div>
      
    </div>
  )
}

export default Home;
