import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Ingredients from "./components/Ingredients/Ingredients";
import Instructions from "./components/Instructions/Instructions";
import Media from "./components/Media/Media";

class App extends Component {
  state = {
    currentRecipe: {
      title: "Grandma's favorite eggs",
      subtitle: null,
      grandmaPic: null,
      mediaStuff: ["i am an array of images and videos"],
      ingredients: ["two cage free eggs"],
      instructions: ["The first step", "The second step"]
    }
  };
  render() {
    return (
      <div className="App">
        <div className="Header">
          <Header />
        </div>
        <div className="Media">
          <Media />
        </div>
        <div className="Ingredients">
          <Ingredients />
        </div>
        <div className="Instructions">
          <Instructions />
        </div>
      </div>
    );
  }
}

export default App;
