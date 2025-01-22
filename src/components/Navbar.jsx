import React from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';

const Navbar = () => {
    const state = useSelector((state) => state.handleCart);

    // Retrieve the user information from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem("user");
        // Redirect or reload the page to update the UI (optional)
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">React Ecommerce</NavLink>
                <button
                    className="navbar-toggler mx-2"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <div className="buttons text-center">
                        {!user ? (
                            <>
                                <NavLink to="/login" className="btn btn-outline-dark m-2">
                                    <i className="fa fa-sign-in-alt mr-1"></i> Login
                                </NavLink>
                                <NavLink to="/register" className="btn btn-outline-dark m-2">
                                    <i className="fa fa-user-plus mr-1"></i> Register
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to="/" className="btn btn-outline-dark m-2">
                                    <i className="fa fa-user-plus mr-1"></i> {user.fullName}
                                </NavLink>
                                <NavLink to="/" className="btn btn-outline-dark m-2"
                                         onClick={handleLogout}>
                                    <i className="fa fa-sign-out-alt mr-1"></i> Logout
                                </NavLink>
                            </>
                        )}
                        <NavLink to="/cart" className="btn btn-outline-dark m-2">
                            <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
        ;
};

export default Navbar;
