import { ChangeEvent, useState } from "react"
import { BiArrowBack } from "react-icons/bi"

const Shipping = () => {

    const [shippingInfo,setShippingInfo] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
    })

    const changeHandler = (e:ChangeEvent<HTMLInputElement>)=>{};

  return (
    <div className="shipping">
        <button className="shippingBtn">
            <BiArrowBack/>
        </button>
        <form className="shippingForm">
            <h1 className="shippingTitle">SHIPPING ADDRESS</h1>
            <input 
                required
                type="text" 
                placeholder="Address" 
                name="address"
                value={shippingInfo.address}
                onChange={changeHandler}
            />
            <input type="text" placeholder="City" name="city" />
            <input type="text" placeholder="State" />
            <label>Choose Country</label>
            <select name="category" id="category">
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            <input type="number" placeholder="Pin Code" />
            <button className="shippingSubmitBtn">PAY NOW</button>
        </form>

    </div>
  )
}

export default Shipping