import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";


/**
 * Container for the shopping cart. Contains an input box for user's name.
 * List of stock items and list of in-cart items are seperate components below.
 */
function ShoppingCart() {
  const [cartItemList, setCartItemList] = useState([]);
  const [totalCost, setTotalCost] = useState(0.00);
  const [name, setName] = useState("");
  
  /**
   * Calculates the total cost of the items for display. 
   */
  const calcTotalCost = () => {
    var cost = 0;
    for (var i = 0; i < cartItemList.length; i++) {
      cost = cost + parseFloat(cartItemList[i].cost);
    }
    setTotalCost(cost);
  }

  /**
   * Called when "Add Item to Cart" is clicked on in the StockList component.
   * 
   * @param {*} data An item to be added to the shopping cart.
   *                 Sent from the StockList component below. 
   */
  const cartItems = (data) => {
    const newList = [];
    newList.push(data);
    setCartItemList([...cartItemList, ...newList]);
    calcTotalCost();
  }

  /**
   * Handling for the Checkout button.
   * Both the customer name and items in the shopping cart are sent to the backend.
   * 
   * @param {*} event Checkout button is clicked.
   */
  const submitHandling = (event) => {
    event.preventDefault();
    const shoppingCartToSend = {
      "customer": name,
      "items": cartItemList
    }

    // Sends to the DB
    const sendCartToDB = async () => {
      try {
        await axios.post("http://localhost:8080/carts/addcart", shoppingCartToSend);
      } catch(error) {
        console.error(error);
      }
    }

    sendCartToDB();
    alert('Shopping cart for ' + name + ' submitted!');
  }

  return (
    <div className="shopping-cart-container">
      <h1>Shopping Cart</h1>
      <div className="name-container">
        <form onSubmit={submitHandling}>
          Enter your name: 
          <input 
            type="text" 
            value={name} 
            onChange={event => setName(event.target.value)} 
          />
          <br />
          <button type="submit">Checkout!</button>
        </form>
      </div>
      <div className="bottom">
        <div className="stock-container">
          <div className="heading">
            <h2>Items To Purchase</h2>
          </div>
          <div className="stock-item-container">
            <StockList func={cartItems} />
          </div>
        </div>
        <div className="in-cart-container">
          <div className="heading">
            <h2>Your Shopping Cart</h2>
          </div>
          <div className="cost-sec">
            <b>Total Cost:</b> ${totalCost.toFixed(2)}
          </div>
          <CartItems itemList={cartItemList} />
        </div>
      </div>
    </div>
  )
}


/**
 * Stock Item list. Makes API call then displays the items onscreen.
 */
function StockList(props) {
  const [itemList, setItemList] = useState([]);

  /**
   * Fetch the stock items from the DB and pass the list to setItemList above.
   */
  const fetchItems = () => {
    axios.get("http://localhost:8080/stock/getstock").then(response => {
      setItemList(response.data);
    })
  }

  useEffect(() => {
    fetchItems();
  }, []);

  /**
   * Called when an Add to Cart button is clicked.
   * An ID of the item clicked on is also passed. 
   * 
   * @param {*} id ID of the item. 
   */
  function addToCart(id) {
    const newList = [];
    for (var i = 0; i < itemList.length; i++) {
      if (itemList[i].id === id) {
        props.func(itemList[i]);
      } else {
        newList.push(itemList[i]);
      }
    }
    setItemList(newList);
  }

  return itemList.map((item) => {
    return (
      <div className="item-container" key={item.id}>
        <div className="item-section">
          <b>{item.name}</b>
        </div>
        <div className="item-section">
          ${item.cost}
        </div>
        <div className="item-section">
          {item.description}
        </div>
        <div className="item-section">
          <button type="button" onClick={() => addToCart(item.id)}>Add to Cart</button>
        </div>
      </div>
    )
  })
}


/**
 * Items currently in the cart.
 */
function CartItems({itemList}) {
  const [cartItemList, setCartItemList] = useState([]);

  useEffect(() => {
    const newList = itemList;
    setCartItemList(newList);
  }, [itemList]);

  return cartItemList.map((item) => { 
    return (
      <div className="cart-item" key={item.id}>
        <div className="cart-item-sec">
          <b>{item.name}</b>
        </div>
        <div className="cart-item-sec">
          ${item.cost}
        </div>
      </div>
    )
  })
}


function App() {
  return (
    <div className="App">
      <ShoppingCart />
    </div>
  )
}

export default App;
