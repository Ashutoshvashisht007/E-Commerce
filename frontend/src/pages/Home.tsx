import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { useLatestProductsQuery } from "../redux/api/productAPI"
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";

const Home = () => {

  const { data, isLoading, isError } = useLatestProductsQuery("");

  const addToCardHandler = () => {

  }

  if (isError) toast.error("Cannot fetch the data");

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
          isLoading ? <Skeleton width="80vw"/>
            : data?.products.map((product) => (
              <ProductCard key={product._id} productID={product._id} image={product.photo} name={product.name} price={product.price} stock={product.stock} handler={addToCardHandler} />
            ))
        }
      </div>

    </div>
  )
}

export default Home;
