import { Link } from "react-router-dom"
import { FaShoppingCart, FaSearch, FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

const user = { _id: "asdf",role: "user"};

const Header = () => {

    const [open,isOpen] = useState<boolean>(false)

  return (
    <nav className="header">
        <div className="navLeft">
            <Link to='/' style={{ textDecoration: "none", color: "inherit" }}>
            <h2>Home</h2>
            </Link>
        </div>
        <div className="navRight">
            <Link to={'/search'} style={{textDecoration: "none", color: "inherit"}}>
                <button><FaSearch/></button>
            </Link>
            <Link to={'/cart'} style={{textDecoration: "none", color: "inherit"}}>
                <button><FaShoppingCart /></button>
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
                                <Link to="/orders">Orders</Link>
                                <button>
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