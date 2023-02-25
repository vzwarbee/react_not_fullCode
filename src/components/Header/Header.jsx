import React, { useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.css"
import { motion } from 'framer-motion'
import logo from "../../assets/images/eco-logo.png"
import { Container, Row } from "reactstrap";
import userIcon from "../../assets/images/user-icon.png"
import { useSelector } from "react-redux";
import useAuth from '../../custom-hooks/customHook'
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";

const nav__links = [
    {
        path: 'home',
        display: 'Home'
    },
    {
        path: 'shop',
        display: 'Shop'
    },
    {
        path: 'cart',
        display: 'Cart'
    },
]

const Header = () => {

    const headerRef = useRef(null);
    const totalQuantity = useSelector(state => state.cart.totalQuantity)

    const profileActions = useRef(null)
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const { currentUser } = useAuth()

    const stickyheader = () => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('sticky__header');
            } else {
                headerRef.current.classList.remove('sticky__header');

            }
        })
    }

    const logout = () => {
        signOut(auth).then(() => {
            toast.success('logged out')
            navigate('/home')
        }).catch(err => {
            toast.error(err.message)
        })
    }

    useEffect(() => {
        stickyheader()

        return () => window.removeEventListener('scroll', stickyheader)
    });

    const menuToggle = () => menuRef.current.classList.toggle('active__menu');

    const navigateToCart = () => {
        navigate('/cart')
    }

    const toggleProfileActions = () => profileActions.current.classList.toggle('show__profileActions')

    return <header className="header" ref={headerRef}>
        <Container>
            <Row>
                <div className="nav__wrapper">
                    <div className="logo">
                        <Link to={'/home'}>
                            <img src={logo} alt="logo" />
                            <div>
                                <h1>Multimart</h1>
                            </div>

                        </Link>
                    </div>
                    <div className="navigation" ref={menuRef} onClick={menuToggle}>
                        <ul className="menu">
                            {
                                nav__links.map((item, index) => (
                                    <li className="nav__item" key={index}>
                                        <NavLink to={item.path} className={(navClass) => navClass.isActive ? 'nav__active' : ''}>{item.display}</NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className="nav__icons">


                        {/* <span className="fav__icon">
                            <i class="ri-heart-line"></i>
                            <span className="badge">1</span>
                        </span> */}
                        <span className="cart__icon" onClick={navigateToCart}>
                            <i class="ri-shopping-bag-line"></i>
                            <span className="badge">{totalQuantity}</span>

                        </span>

                        <div className="profile">
                            <motion.img whileTap={{ scale: 1.2 }} src={currentUser ? currentUser.photoURL : userIcon} alt="" onClick={toggleProfileActions} />

                            <div className="profile__actions" ref={profileActions} onClick={toggleProfileActions}>
                                {
                                    currentUser ? <span onClick={logout}>Logout</span> : <div className="action__link d-flex align-items-center justify-content-center flex-column">
                                        <Link to='/signup'>Signup</Link>
                                        <Link to='/login'>Login</Link>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="mobile__menu" onClick={menuToggle}>
                            <span>
                                <i class="ri-menu-line"></i>
                            </span>
                        </div>
                    </div>



                </div>
            </Row>
        </Container>
    </header>
}

export default Header;