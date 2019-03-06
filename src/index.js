import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Firebase, { FirebaseContext } from "./components/Firebase";
import App from "./App";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NewRecipe from "./pages/NewRecipe";
import "./index.css";
import NewFamily from "./pages/NewFamily";
import MyFamily from "./pages/MyFamily";

class Routes extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/newrecipe" component={NewRecipe} />
        <Route exact path="/recipes/:recipe" component={App} />
        <Route exact path="/newfamily" component={NewFamily} />
        <Route exact path="/myfamily" component={MyFamily} />
      </div>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <FirebaseContext.Provider value={new Firebase()}>
      <Routes />
    </FirebaseContext.Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
