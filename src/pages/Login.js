import React, { Component } from "react"
import { withFirebase } from "../components/Firebase/"
import "./Login.css"
import "../App.css"
import Menu from "../components/Menu/Menu";
import { Link } from 'react-router-dom'

class Login extends Component {

  constructor(props){
    super(props)
    this.state = {
      email:''
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

  renderErrorEmail(){
    if (this.state.error){
      return(
        <div className='errorText'>
          {this.state.errorMessage}
        </div>
      )
    }
  }

  validateEmail(email){
    /*eslint-disable */
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /*eslint-enable */
    return re.test(email);
  }

  handleInputEmail(e){
    this.setState({email:e.target.value,error:false})
  }

  render() {
    return (
      <div className="App">
        {/* We will eventually want to move all this logic into a separate component
          so we can access multiple recipes  */}
        <div className="appLogo">
          <img className="backImg" src="/back.png" alt="back" />
          <img className="mainLogo" src="/logo.png" alt="logo" />
          <img
            className="menuImg"
            src="/menu.png"
            alt="menu"
            onClick={() => this.toggleMenu()}
          />
        </div>
        <div className='header'>RememberMe Recipes</div>

        <div className='inputContainer'>
          <input className='inputBody' value={this.state.email} type='email' onChange={(e)=>this.handleInputEmail(e)} placeholder='email...'/>
          <br/><br/>
          <input type='password'className='inputBody' placeholder='password...'/>
          <br/>
          <button
            className='buttonPrimary'>
            LOGIN
          </button>
        </div>

        {this.renderMenu()}
      </div>
    );
  }
}

export default withFirebase(Login);
