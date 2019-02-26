import React from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import Firebase, { FirebaseContext } from "./components/Firebase";
import App from "./App";
import Login from './pages/Login'
import Home from './pages/Home'
import "./index.css";

class Routes extends React.Component {

  render(){

    return(
      <div>
        <Route exact path="/" component={Login}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/recipes/:recipe" component={App}/>
      </div>
    )
  }

}

ReactDOM.render(
  <BrowserRouter>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </BrowserRouter>,document.getElementById("root")
);
