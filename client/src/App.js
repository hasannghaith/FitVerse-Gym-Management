import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import NavBar from "./Components/NavBar";
import Intro from "./Components/Intro";
import About from "./pages/About";
import Services from "./pages/Services";
import Equipments from "./pages/Equipments";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [programs, setPrograms] = useState([]);

  /* ===========================
     FETCH PRODUCTS & PROGRAMS
  =========================== */
  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:5000/api/programs")
      .then(res => setPrograms(res.data))
      .catch(err => console.error(err));
  }, []);

  /* ===========================
     ADD TO CART (NORMALIZED)
  =========================== */
  const addToCart = (item) => {
    const normalizedItem = {
      id: item.ProdID || item.ProgID || item.id,
      name: item.Name || item.name,
      price: Number(item.Price || item.price || 0),
      type: item.ProdID ? "product" : "program",
      quantity: 1
    };

    setCart(prev => [...prev, normalizedItem]);
  };

  /* ===========================
     REMOVE FROM CART
  =========================== */
  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  /* ===========================
     AUTH
  =========================== */
 const handleLogin = async ({ username, password }) => {
  try {
    const res = await axios.post("http://localhost:5000/api/login", {
      username,
      password,
    });

    if (res.data.success) {
      setUser(res.data.user);
      return { success: true, userType: res.data.user.UserType };
    } else {
      return { success: false, message: res.data.message };
    }
  } catch (err) {
    console.error("LOGIN ERROR:", err.response || err);
    return { success: false, message: "Server error" };
  }
};




  const handleLogout = () => {
    setUser(null);
    setCart([]);
  };

  /* ===========================
     PLACE ORDER
  =========================== */
  const placeOrder = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    try {
      await axios.post("http://localhost:5000/api/orders", {
        userId: user.UserID,
        totalPrice: totalPrice,
        items: cart
      });

      alert("Order placed successfully!");
      setCart([]);
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  return (
    <Router>
      <NavBar cartCount={cart.length} user={user} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/about" element={<About />} />
        <Route path="/services"element={<Services programs={programs} onAddToCart={addToCart} />}/>
        <Route path="/equipments"element={<Equipments products={products} onAddToCart={addToCart} />}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              placeOrder={placeOrder}
            />
          }
        />
       {user?.UserType === "admin" && (
       <Route path="/admin" element={<AdminDashboard user={user} />} />
       )}

      </Routes>
    </Router>
  );
}

export default App;