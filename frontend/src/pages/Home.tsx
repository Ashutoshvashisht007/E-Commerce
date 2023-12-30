import iPhone14 from "../assets/images/iphone14.png"
// import gadgets from "../assets/gadgets.jpg"

const Home = () => {
  return (
    <div className="home">
      <section className="homeSection">
      </section>
      <div className="homeHeading">
        <h1>LATEST PRODUCTS</h1>
        <h3>MORE</h3>
      </div>
      <div className="homeProducts">
        <div className="homeProduct">
          <img className="homeProductIMG" src={iPhone14} alt="Image" />
          <h3 className="homeProductTitle">iPhone 14</h3>
          <span className="homeProductPrice">$100</span>
        </div>
        <div className="homeProduct">
          <img className="homeProductIMG" src={iPhone14} alt="Image" />
          <h3 className="homeProductTitle">iPhone 14</h3>
          <span className="homeProductPrice">$100</span>
        </div>
        <div className="homeProduct">
          <img className="homeProductIMG" src={iPhone14} alt="Image" />
          <h3 className="homeProductTitle">iPhone 14</h3>
          <span className="homeProductPrice">$100</span>
        </div>
        <div className="homeProduct">
          <img className="homeProductIMG" src={iPhone14} alt="Image" />
          <h3 className="homeProductTitle">iPhone 14</h3>
          <span className="homeProductPrice">$100</span>
        </div>
      </div>
      
    </div>
  )
}

export default Home;
