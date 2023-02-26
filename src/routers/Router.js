import { Route, Routes, Navigate } from "react-router-dom"


import Home from "../pages/Home"
import Shop from "../pages/Shop"
import Cart from "../pages/Cart"
import ProductDetails from "../pages/ProductDetails"
import Checkout from "../pages/Checkout"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import ProtectedRouter from "./ProtectedRouter"

import Order from "../admin/Order"
import AddProducts from "../admin/AddProducts"
import AllProducts from "../admin/AllProducts"
import Dashboard from "../admin/Dashboard"
import Users from "../admin/Users"
import LoginAdmin from "../admin/LoginAdmin"
import ChoseYourPage from "../admin/ChoseYourPage"
import Success from "../pages/Success"

const Routers = () => {
    return <Routes>
        <Route path="/" element={<Navigate to="Home" />} />
        <Route path="home" element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />

        <Route path="/*" element={<ProtectedRouter />}>
            <Route path="checkout" element={<Checkout />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/all-products" element={<AllProducts />} />
            <Route path="dashboard/users" element={<Users />} />
            <Route path="dashboard/order" element={<Order />} />
            <Route path="dashboard/add-product" element={<AddProducts />} />

        </Route>

        <Route path="admin" element={<LoginAdmin />} />
        <Route path="/success" element={<Success />} />
        <Route path="chose-your-page" element={<ChoseYourPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
    </Routes>
};

export default Routers;