import { FaPlus } from "react-icons/fa"

interface ProductsComponent {
  productID: number,
  image: string,
  name: string,
  price: number,
  stock: number,
  handler: ()=>void
}

const ProductCard: React.FC<ProductsComponent> = ({ image, name, price, stock, handler}) => {

  return (
    <div className="homeProduct">
      <img className="homeProductIMG" src={image} alt={name} />
      <h3 className="homeProductTitle">{name}</h3>
      <span className="homeProductPrice">${price}</span>

      <div className="productBtn">
        <button onClick={()=> handler()}><FaPlus/></button>
      </div>
    </div>
  )
}

export default ProductCard