import React, { Component } from "react"
import { withFirebase } from "../components/Firebase/"
import "./Login.css"
import "../App.css"

class Login extends Component {

  constructor(props){
    super(props)
    this.state = {
      username:''
    }
  }

  render() {
    return (
      <div className="App">
        {/* We will eventually want to move all this logic into a separate component
          so we can access multiple recipes  */}
        <div className="appLogo">
          <img className="backImg" src="/back.png" alt="back" />
          <img className="logoImg" src="/logo.png" alt="logo" />
          <img
            className="menuImg"
            src="/menu.png"
            alt="menu"
            onClick={() => this.toggleMenu()}
          />
        </div>

        {this.renderMenu()}
      </div>
    );
  }
}

export default withFirebase(Login);
