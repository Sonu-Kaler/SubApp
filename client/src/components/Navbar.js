import { Link, useNavigate } from "react-router-dom"
import useAuth from "../context/AuthContext"
import { useState } from "react";


const Navbar=()=>{
    const {signOut} = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSignout=async()=>{
        await signOut();
        navigate("/signIn")
    }

    const toggleMenu=()=>{
        setIsMenuOpen(!isMenuOpen);
    }

    const closeMenu=()=>{
        setIsMenuOpen(false);
    }

    return(
        <div className="navbar_container">
            <div>
                <h2 className="logo">
                    Trackify
                </h2>
            </div>

            <button className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={`navbar ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
            <Link to="/profile" onClick={closeMenu}>Profile</Link>
            <Link to="/subscription" onClick={closeMenu}>Subscriptions</Link>
            <button onClick={handleSignout} className="signout_btn">
                Sign Out
            </button>
            </div>
        </div>
    )
}

export default Navbar;