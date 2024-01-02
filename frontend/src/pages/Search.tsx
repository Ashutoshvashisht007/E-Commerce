import { useState } from "react"
import ProductCard from "../components/ProductCard";

const Search = () => {

  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(100000);
  const [page, setPage] = useState(1);

  const isNextPage = page < 4;
  const isPrevPage = page > 1;

  interface Products {
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
    // {
    //   id: 4,
    //   image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=70",
    //   name: "iPhone 14",
    //   price: 100,
    //   stock: 0,
    // },
    // {
    //   id: 5,
    //   image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=70",
    //   name: "iPhone 14",
    //   price: 100,
    //   stock: 5,
    // },
    // {
    //   id: 6,
    //   image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=70",
    //   name: "iPhone 14",
    //   price: 100,
    //   stock: 1,
    // }
  ]

  const addToCardHandler = () => {

  }

  return (
    <div className="search">
      <aside className="searchLeftContainer">
          <h2>FILTERS</h2>
          <div>
            <label>Sort</label>
            <select value={value} onChange={(e) => setValue(e.target.value)}>
              <option value="">None</option>
              <option value="asc">Price (Low to High)</option>
              <option value="dsc">Price (High to Low)</option>
            </select>
          </div>
          <div>
            <label>Max Price: {price || ""}</label>
            <input
              type="range"
              min={100}
              max={100000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">All</option>
              <option value="Mobiles">Mobiles</option>
            </select>
          </div>
      </aside>
      <main className="searchRightContainer">
        <h1>PRODUCTS</h1>
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Search by name" />
        <div className="searchRightProductContainer">
          {
            productsArray.map((product: Products) =>
              <ProductCard key={product.id} productID={product.id} image={product.image} name={product.name} price={product.price} stock={product.stock} handler={addToCardHandler} />
            )

          }
        </div>

        <article>
          <button
            disabled={!isPrevPage}
            onClick={() => setPage(prev => prev - 1)}>
            Prev
          </button>
          <span>{page} of {4}</span>
          <button
            disabled={!isNextPage}
            onClick={() => setPage(prev => prev + 1)}>
            Next
          </button>
        </article>
      </main>
    </div>
  )
}

export default Search