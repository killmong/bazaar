import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import Category from "./pages/category/Category";
import Product from "./pages/product/Product";
import Signup from "./(auth)/signup/Signup";
import Login from "./(auth)/login/Login";
import UserContext from "./context/UserContext";
import Cart from "./pages/cart/Cart";
import AdminDashboard from "./pages/admin/AdminDashboard";

import "./App.css";
import Profile from "./pages/profile/Profile";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <UserContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id/:name" element={<Product />} />
            <Route path="/category" element={<Category />} /> 

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/adminDashboard/:user" element={<AdminDashboard />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/profile/:slug" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </UserContext>
  );
}

export default App;
