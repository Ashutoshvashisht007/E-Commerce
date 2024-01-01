import { ChangeEvent, useMemo, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import countryList from 'react-select-country-list'

const Shipping = () => {

    const navigate = useNavigate();

    const [shippingInfo,setShippingInfo] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
    });

    const changeHandler = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        setShippingInfo((prev) => ({...prev, [e.target.name] : e.target.value}))
    };

    const options = useMemo(()=> countryList().getData(),[]);

  return (
    <div className="shipping">
        <button className="shippingBtn" onClick={()=> navigate("/cart")}>
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
            <input 
                required
                type="text" 
                placeholder="City" 
                name="city" 
                value={shippingInfo.city}
                onChange={changeHandler}
            />
            <input 
                required
                type="text" 
                placeholder="State" 
                name="state"
                value={shippingInfo.state}
                onChange={changeHandler}    
            />
           <select name="country" required
           value={shippingInfo.country} onChange={changeHandler}>
            <option value="">Choose Country</option>
            {
                options.map((e)=>(
                    <option key={e.value} value={e.label}>{e.label}</option>
                ))
            }
           </select>
            <input 
                required
                type="number" 
                placeholder="Pin Code" 
                name="pinCode"
                value={shippingInfo.pinCode}
                onChange={changeHandler}
            />
            <button type="submit" className="shippingSubmitBtn">PAY NOW</button>
        </form>

    </div>
  )
}

export default Shipping