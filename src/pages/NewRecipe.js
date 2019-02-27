import React, { Component } from "react";
import { withFirebase } from "../components/Firebase/";
import "./Login.css";
import "../App.css";
import Menu from "../components/Menu/Menu";
import { Link, Redirect } from "react-router-dom";

class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.location.email,
      loggedIn: false
    };
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

  renderErrorEmail() {
    if (this.state.error) {
      return <div className="errorText">{this.state.errorMessage}</div>;
    }
  }

  handleSubmitEmail(e) {
    if (!this.validateEmail(this.state.email)) {
      this.setState({
        error: true,
        errorMessage: "Invalid email..."
      });
    } else {
      console.log("here");
      return this.setState({
        loggedIn: true
      });
    }
  }

  validateEmail(email) {
    /*eslint-disable */
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /*eslint-enable */
    return re.test(email);
  }

  handleInputEmail(e) {
    this.setState({ email: e.target.value, error: false });
  }

  render() {
    window.scrollTo(0, 0);
    if (this.state.loggedIn === true) {
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
        <div className="header">New Recipe</div>
        <br />
        <br />
        <div style={{ width: "100%", textAlign: "center" }}>
          {" "}
          This feature coming soon!
        </div>
        <Link to={{ pathname: "/home", email: this.state.email }}>
          <button className="buttonPrimary">back</button>
        </Link>
        {this.renderMenu()}
      </div>
    );
  }
}

export default withFirebase(NewRecipe);
