import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Ingredients from "./components/Ingredients/Ingredients";
import Instructions from "./components/Instructions/Instructions";
import Media from "./components/Media/Media";

import photo from "./static/grandma.png";

class App extends Component {
  state = {
    currentRecipe: {
      title: "Pumpkin Bread",
      subtitle: null,
      grandmaPic: photo,
      mediaStuff: ["i am an array of images and videos"],
      ingredients: [
        { name: "shortening", quantity: "2/3 c." },
        { name: "sugar", quantity: "3 c." },
        { name: "eggo", quantity: "4" },
        { name: "pumpkin", quantity: "2 c." },
        { name: "salt", quantity: "1 tsp." },
        { name: "flour", quantity: "3 1/3 c." },
        { name: "baking powder", quantity: "1/2 tsp." },
        { name: "soda", quantity: "2 tsp." },
        { name: "cinnamon", quantity: "1 tsp." },
        { name: "cloves", quantity: "1 tsp." },
        { name: "ginger", quantity: "1 tsp." }
      ],
      instructions: [
        "Add ingredients in order as given above",
        "Bake about one hour @ 350 degree oven in 2 greased bread pans"
      ]
    }
  };
  render() {
    return (
      <div className="App">
        {/* We will eventually want to move all this logic into a separate component
          so we can access multiple recipes  */}
        <Header
          title={this.state.currentRecipe.title}
          subtitle={this.state.currentRecipe.subtitle}
          photo={this.state.currentRecipe.grandmaPic}
        />
        <Media />
        <Ingredients ingredientList={this.state.currentRecipe.ingredients} />
        <Instructions
          instructionsList={this.state.currentRecipe.instructions}
        />
      </div>
    );
  }
}

export default App;
