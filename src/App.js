import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    currentRecipe: {
      title: "Grandma's favorite eggs",
      mediaStuff: ["i am an array of images and videos"],
      ingredients: ["two cage free eggs"],
      instructions: ["The first step", "The second step"]
    }
  };
  render() {
    return (
      <div className="App">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
