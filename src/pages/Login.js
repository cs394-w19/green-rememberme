import React, { Component } from "react";
import { withFirebase } from "../components/Firebase/";
import "./Login.css";
import "../App.css";
import Menu from "../components/Menu/Menu";
import { Link, Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      loggedIn: false
    };
  }

  renderErrorEmail() {
    if (this.state.error) {
      return <div className="errorText">{this.state.errorMessage}</div>;
    }
  }


//IN PROGRESS>>>>>>>>
  async handleSubmitEmail(e) {
    if (!this.validateEmail(this.state.email)) {
      this.setState({
        error: true,
        errorMessage: "Invalid email..."
      });
    } else {
      console.log("received email");
      const familyID = await this.props.firebase.findFamily();
      window.setTimeout(()=>{
        console.log(familyID)
        if (familyID == null || familyID == -1){
          console.log('handled the error')
        } else {
          return this.setState({
            loggedIn: true
          });
        }}, 2000)

    }
  }

  validateEmail(email) {
    /*eslint-disable */
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /*eslint-enable */
    // return re.test(email);

    // For now, do not validate email
    return true;
  }

  handleInputEmail(e) {
    this.setState({ email: e.target.value, error: false });
  }

  render() {
    if (this.state.loggedIn === true) {
      window.scrollTo(0, 0);
      return (
        <Redirect
          to={{
            pathname: "/home",
            email: this.state.email
          }}
        />
      );
    }

    return (
      <div className="App">
        {/* We will eventually want to move all this logic into a separate component
          so we can access multiple recipes  */}
        <div className="appLogo">
          <img className="mainLogo" src="/logo.png" alt="logo" />
        </div>
        <div className="header">RememberMe Recipes</div>

        <div className="inputContainer">
          <input
            autoFocus
            className="inputBody"
            value={this.state.email}
            type="email"
            onChange={e => this.handleInputEmail(e)}
            placeholder="email..."
          />
          <br />
          <br />
          <input
            type="password"
            className="inputBody"
            placeholder="password..."
          />
          {this.renderErrorEmail()}
          <br />
          <button
            className="buttonPrimary"
            onClick={() => this.handleSubmitEmail()}
          >
            LOGIN
          </button>
        </div>
      </div>
    );
  }
}

export default withFirebase(Login);
