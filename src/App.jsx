import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // If the item already exists in the cart, increase the quantity
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // If the item is not in the cart, add it with quantity 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const addToWishlist = (item) => {
    if (!wishlist.find((wishItem) => wishItem.id === item.id)) {
      setWishlist([...wishlist, item]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <div className="container-fluid d-flex flex-column min-vh-100">
        <div className="navbar d-flex justify-content-between align-items-center p-3 bg-light sticky-top">
          <nav className="navSection d-flex justify-content-between w-100">
            <div className="logo">
              <img
                src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/09/fashion-logo-design.jpg"
                alt="Logo"
                style={{ width: "100px" }}
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
                    Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" className="wishlist">
                    Wishlist ({wishlist.length})
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
                      <p className="card-text text-center fs-5">${item.price}</p>
                      <h5 className="card-title text-center">{item.title}</h5>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-primary"
                          onClick={() => addToCart(item)}
                        >
                          {cart.some((cartItem) => cartItem.id === item.id)
                            ? `+${cart.find(
                                (cartItem) => cartItem.id === item.id
                              ).quantity} in Cart`
                            : "+ Add to Cart"}
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => addToWishlist(item)}
                          disabled={wishlist.some(
                            (wishItem) => wishItem.id === item.id
                          )}
                        >
                          {wishlist.some((wishItem) => wishItem.id === item.id)
                            ? "Added to Wishlist"
                            : "+ Add to Wishlist"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
          />
          <Route path="/cart" element={<CartPage cart={cart} />} />
          <Route
            path="/wishlist"
            element={
              <WishlistPage
                wishlist={wishlist}
                removeFromWishlist={removeFromWishlist}
                addToCart={addToCart}
              />
            }
          />
        </Routes>

        <footer className="footer text-center mt-auto">
          <p>© 2024 Your Shop</p>
        </footer>
      </div>
    </Router>
  );
}

function CartPage({ cart }) {
  const handlePlaceOrder = () => {
    alert("Your order has been placed successfully!");
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center fs-4">Your cart is empty.</div>
      ) : (
        <>
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="card"
                style={{ width: "18rem", maxWidth: "100%" }}
              >
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.title}
                />
                <div className="card-body">
                  <p className="card-text text-center fs-5">${item.price}</p>
                  <h5 className="card-title text-center">{item.title}</h5>
                  <p className="text-center">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="fs-5">Total Price: ${totalPrice.toFixed(2)}</p>
            <button className="btn btn-success" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function WishlistPage({ wishlist, removeFromWishlist, addToCart }) {
  return (
    <div className="container mt-4">
      <h2 className="text-center">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <div className="text-center fs-4">Your wishlist is empty.</div>
      ) : (
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {wishlist.map((item, index) => (
            <div
              key={index}
              className="card"
              style={{ width: "18rem", maxWidth: "100%" }}
            >
              <img src={item.image} className="card-img-top" alt={item.title} />
              <div className="card-body">
                <p className="card-text text-center fs-5">${item.price}</p>
                <h5 className="card-title text-center">{item.title}</h5>
                <div className="d-flex justify-content-center gap-2 mt-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove from Wishlist
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      addToCart(item);
                      removeFromWishlist(item.id);
                    }}
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
