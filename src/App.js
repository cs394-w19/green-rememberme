import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Ingredients from "./components/Ingredients/Ingredients";
import Instructions from "./components/Instructions/Instructions";
import Media from "./components/Media/Media";

import photo from "./static/gettyimages-887636042.jpg";

class App extends Component {
  state = {
    currentRecipe: {
      title: "Pumpkin Bread",
      subtitle: null,
      grandmaPic: photo,
      mediaStuff: ["i am an array of images and videos"],
      ingredients: [
        "2/3 c. shortening",
        "3 c. sugar",
        "4 eggo",
        "2 c. pumpkin",
        "1 tsp. salt",
        "3 1/3 c. flour",
        "1/2 tsp. baking powder",
        "2 tsp soda",
        "1 tsp cinnamon",
        "1 tsp. cloves",
        "1 tsp. ginger"
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
        <Instructions />
      </div>
    );
  }
}

export default App;
