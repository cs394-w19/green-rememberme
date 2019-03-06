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
      familyID: "",
      loggedIn: false
    };
  }

  componentDidMount() {
    console.log(this.state);
  }

  renderErrorEmail() {
    if (this.state.error) {
      return <div className="errorText">{this.state.errorMessage}</div>;
    }
  }

  //IN PROGRESS>>>>>>>>
  async handleSubmitEmail(e) {
    console.log('handle submit email called')
    // let temp = ["leo@gmail.com"]
    // const value = await this.props.firebase.createFamily(temp);
    // console.log("createFam returns: ", value);
    if (!this.validateEmail(this.state.email)) {
      this.setState({
        error: true,
        errorMessage: "Invalid email..."
      });
    } else {
      const familyID = await this.props.firebase.findFamily(this.state.email);
      // const value = await this.props.firebase.getFamily("vt8F995i87QgaJCiVh9Q");
      // console.log(value);
      if (familyID){
        this.setState({loggedIn:true,familyID:familyID})
      }
      else{
        window.setTimeout(()=>{console.log(familyID)},2000)
      }
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
      if (this.state.familyID == -1){
        return(
          <Redirect
            to={{
              pathname: "/newfamily",
              email: this.state.email,
              familyID: this.state.familyID
            }}
          />)
      }
      return (
        <Redirect
          to={{
            pathname: "/home",
            email: this.state.email,
            familyID: this.state.familyID
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
