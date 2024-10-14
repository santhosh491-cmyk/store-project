import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <Router>
      <div className="container-fluid d-flex flex-column min-vh-100">
        <div className="navbar d-flex justify-content-between align-items-center p-3 bg-light">
          <nav className="navSection d-flex justify-content-between w-100">
            <div className="logo">
              <img
                src="https://th.bing.com/th/id/OIP.xr5clCZa4ynehP3IX5-W0AAAAA?rs=1&pid=ImgDetMain"
                alt="Logo"
                style={{ width: "50px" }}
              />
            </div>
            <div className="d-flex gap-4">
              <ul className="d-flex gap-3 mb-0">
                <li>
                  <Link to="/" className="home">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="cart">
                    Cart ({cart.length})
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <div className="d-flex flex-wrap justify-content-center gap-4 flex-grow-1">
                {data.map((item) => (
                  <div
                    key={item.id}
                    className="card"
                    style={{ width: "18rem", maxWidth: "100%" }}
                  >
                    <img
                      src={item.image}
                      className="card-img-top"
                      alt={item.title}
                    />
                    <div className="card-body">
                      <p className="card-text text-center fs-5">
                        ${item.price}
                      </p>
                      <h5 className="card-title text-center">{item.title}</h5>
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-primary"
                          onClick={() => addToCart(item)}
                        >
                          + Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
          />
          <Route path="/cart" element={<CartPage cart={cart} />} />
        </Routes>

        {/* Footer */}
        <footer className="footer text-center mt-auto">
          <p>© 2024 Your Shop</p>
        </footer>
      </div>
    </Router>
  );
}

function CartPage({ cart }) {
  return (
    <div className="container mt-4">
      <h2 className="text-center">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center fs-4">Your cart is empty.</div>
      ) : (
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="card"
              style={{ width: "18rem", maxWidth: "100%" }}
            >
              <img src={item.image} className="card-img-top" alt={item.title} />
              <div className="card-body">
                <p className="card-text text-center fs-5">${item.price}</p>
                <h5 className="card-title text-center">{item.title}</h5>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
