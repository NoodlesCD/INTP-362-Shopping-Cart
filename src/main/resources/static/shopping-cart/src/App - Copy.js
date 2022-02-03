import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";

function NewCart() {
  return (
    <div className="new-cart">
      <button>New Shopping Cart</button>
    </div>
  )
}

function ShoppingCart() {
  const [cartItemList, setCartItemList] = useState([]);

  const cartItems = (data) => {
    const newList = cartItemList;
    newList.push(data);
    setCartItemList(newList);
  }

  return (
    <div className="shopping-cart">
      <div className="item-list">
        <div className="heading">
          <h1>Items To Purchase</h1>
        </div>
        <ItemList func={cartItems} />
      </div>
      <div className="in-cart">
        <div className="heading">
          <h1>Your Shopping Cart</h1>
        </div>
        <CartList items={cartItemList} />
      </div>
    </div>
  )
}

function ItemList(props) {
  const [itemList, setItemList] = useState([]);

  const fetchItems = () => {
    axios.get("http://localhost:8080/stock/getstock").then(response => {
      setItemList(response.data);
    })
  }

  useEffect(() => {
    fetchItems();
  }, []);

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

function CartList(props) {
  const [totalCost, setTotalCost] = useState(0.00);
  const [itemList, setItemList] = useState([]);

  const calcTotalCost = () => {
    var cost = 0;
    for (var i = 0; i < props.items.length; i++) {
      cost = cost + parseFloat(props.items[i].cost);
    }
    setTotalCost(cost);
  }

  useEffect(() => {
    setItemList(props.items);
    calcTotalCost();
  }, props.items);
  return (
    <div className="cart-list">
      <CartItems items={itemList} />
      <div className="cost-sec">
        <b>Total Cost:</b> ${totalCost}
      </div>
    </div>
  )
}

function CartItems(props) {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    setItemList(props.items);
  }, props.items)

  return itemList.map((item) => {
    return (
      <div className="cart-item" key={item.id}>
        <div className="cart-item-sec">
          {item.name}
        </div>
        <div className="cart-item-sec">
          {item.cost}
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
