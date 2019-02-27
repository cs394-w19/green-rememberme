import React, { Component } from "react"
import { withFirebase } from "../components/Firebase/"
import "./Login.css"
import "../App.css"
import Menu from "../components/Menu/Menu";
import './Home.css'
//import Navbar from 'react-bootstrap/Navbar'

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      username:''
    }
  }

  toggleMenu() {
    console.log("toggling menu");
    if (this.state.menu) {
      this.setState({
        menu: false
      });
    } else {
      this.setState({
        menu: true
      });
    }
  }

  renderMenu() {
    if (this.state.menu) {
      return (
        <div>
          <div className="menuWrapper" onClick={() => this.toggleMenu()} />
          <Menu toggle={() => this.toggleMenu.bind(this)} />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="App">
        {/* We will eventually want to move all this logic into a separate component
          so we can access multiple recipes  */}

        <div className="appLogo">
          <img className="backImg" src="/back.png" alt="back" />
          <img
            className="menuImg"
            src="/menu.png"
            alt="menu"
            onClick={() => this.toggleMenu()}
          />
        </div>


        <div className="homeLogo">
          <img className="largeLogo" src="/logo.png" alt="logo" />
        </div>

        <div className="inputContainer">
          <input className="inputBody" type="text" placeholder="Find a recipe"/>
        </div>

        <div className="recipeBox">
          <div className="nameBody"> Osso Bucco </div>
          <br/>
          <div className="nameBody"> Pumpkin Bread </div>
          <br/>
          <div className="nameBody"> Grandma's Pancakes </div>
          <br/>
          <div className="nameBody"> Cheezits </div>
          <br/>
        </div>

        {/*{this.renderMenu()}
        <Navbar fixed="bottom" />*/}
      </div>
    );
  }
}

export default withFirebase(Home);
