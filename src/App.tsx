import React from 'react';
import { useState } from 'react';
import './App.css';
import DisplayMenu from './components/Display'
import Calc from './components/Calc';
import { Dish } from "./components/Display"

function App() {
  const [choice, setChoice] = useState<Dish[]>([]);

  const handleDeleteOrder = (dish: Dish) => {
    setChoice(choice.filter((selectedDish) => selectedDish !== dish));
  };

  const command = choice.map((dish: Dish) => (
    <li key={dish.key} id="selection" onClick={() => handleDeleteOrder(dish)}>
      {dish.name}, ${dish.price}
    </li>
  ));

  return (
    <div>
      <div id="restaurant_info_container">
        <h1 id="restaurant_name">The Velvet Table</h1>
        <h2 id="restaurant_intro">Indulge in the finest culinary experience and
          enjoy the perfect ambiance at our elegant and sophisticated restaurant.</h2>
      </div>
      <div className="App">
        <div id="menu">
          <DisplayMenu setChoice={setChoice} choice={choice} />
        </div>
        <div id="command">
          <h3>Commande:</h3>
          {choice.length > 0 ? <h4>Click on an element if you want to remove it</h4> : null}
          <ul id="commande_selection">
            {command}
          </ul>
        </div>
        <div id="total">
          <Calc total={choice} />
        </div>
      </div>
    </div>
  );
}

export default App;
