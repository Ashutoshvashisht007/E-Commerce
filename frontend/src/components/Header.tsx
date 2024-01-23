import { Link } from "react-router-dom"
import { FaShoppingCart, FaSearch, FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { User } from "../types/types";

interface PropsType{
    user: User | null;
}

const Header = ({user}: PropsType) => {

    const [open,isOpen] = useState<boolean>(false);

    const logOutHandler = ()=> {
        isOpen(false);
    }

  return (
    <nav className="header">
        <div className="navLeft">
            <Link to='/' style={{ textDecoration: "none", color: "inherit" }}>
            <h2 onClick={()=> isOpen(false)}>Home</h2>
            </Link>
        </div>
        <div className="navRight">
            <Link to={'/search'} style={{textDecoration: "none", color: "inherit"}}>
                <button onClick={()=> isOpen(false)}><FaSearch/></button>
            </Link>
            <Link to={'/cart'} style={{textDecoration: "none", color: "inherit"}}>
                <button onClick={()=> isOpen(false)}><FaShoppingCart /></button>
            </Link>

            {
                user?._id?(
                    <>
                        <button onClick={()=> isOpen((prev) => !prev)}>
                            <FaUser />
                        </button>
                        <dialog open={open}>
                            <div>
                                {
                                    user.role === "admin" && (
                                        <Link to="admin/dashboard">Admin</Link>
                                    )
                                }
                                <Link onClick={()=> isOpen(false)} to="/orders">Orders</Link>
                                <button onClick={logOutHandler}>
                                    <FaSignOutAlt/>
                                </button>
                            </div>
                        </dialog>
                    </>
                ) :<Link to={'/signin'} style={{textDecoration: "none", color: "inherit"}}>
                    <button>
                        <FaSignInAlt/>
                    </button>
            </Link>
            }   

        </div>
    </nav>
  )
}

export default Header