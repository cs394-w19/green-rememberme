import React, { Component } from "react";
import { withFirebase } from "../components/Firebase/";
import "./NewRecipe.css";
import "../App.css";
import Menu from "../components/Menu/Menu";
import { Link, Redirect } from "react-router-dom";

class NewFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.location.email,
      familyID: this.props.location.familyID,
      emails: [""],
      complete: false,
      addEmails: false
    };
  }

  componentDidMount() {
    console.log(this.state);
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
          <Menu
            toggle={() => this.toggleMenu.bind(this)}
            email={this.state.email}
            familyID={this.state.familyID}
          />
        </div>
      );
    }
  }

  addEmail() {
    this.setState(prevState => ({
      emails: [...prevState.emails, ""]
    }));
  }

  renderEmail() {
    const ins = this.state.emails.map((val, i) => {
      let varname = "e" + i;
      return (
        <div className="inputContainer" key={i}>
          <input
            className="inputInstruction"
            onChange={e => this.setState({ [varname]: e.target.value })}
          />
        </div>
      );
    });
    return ins;
  }

  createEmailObject() {
    let emails = [this.state.email];
    var i;
    for (i = 0; i < this.state.emails.length; i++) {
      let varname = "e" + i;
      emails.push(this.state[varname]);
    }

    console.log(emails);
    this.writeFamily(emails);
  }

  renderContent() {
    if (this.state.addEmails) {
      return (
        <div>
          <div className="section">
            <div className="sectionHeader">Add Family Emails</div>
            {this.renderEmail()}
            <button className="addIngredient" onClick={() => this.addEmail()}>
              <img src="/plus.png" className="addIngredientImg" alt="" />
              add member
            </button>
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              className="buttonPrimary"
              onClick={() => this.createEmailObject()}
            >
              Done
            </button>
            <button
              style={{
                background: "#8bb1ef",
                marginTop: "-10px",
                transform: "scale(0.8)"
              }}
              className="buttonPrimary"
              onClick={() => this.createEmailObject()}
            >
              Continue Alone
            </button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <br />
        <div className="title">Welcome.</div>
        <br />
        <br />
        <br />
        <br />
        <div
          style={{ fontFamily: "arial", fontSize: ".9em" }}
          className="description"
        >
          <b style={{ fontSize: "1.5em" }}>Looks like you're new here!</b>
          <br />
          <br />
          You'll need to create a family
          <br />
          to begin sharing recipes.
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            className="buttonPrimary"
            onClick={() => this.setState({ addEmails: true })}
          >
            Add Family Members
          </button>
          <button
            style={{
              background: "#8bb1ef",
              marginTop: "-10px",
              transform: "scale(0.8)"
            }}
            className="buttonPrimary"
            onClick={() => this.createEmailObject()}
          >
            Continue Alone
          </button>
        </div>
      </div>
    );
  }

  async writeFamily(emails) {
    console.log("there she goes");

    // Need to check if emails already exist in database
    let error = [];
    for (var i = 1; i < emails.length; i++) {
      console.log(emails[i]);
      const response = await this.props.firebase.findFamily(emails[i]);
      if (response !== -1) {
        error.push(emails[i]);
      }
    }
    // Need to check if emails are valid

    if (error.length === 0) {
      let id = await this.props.firebase.createFamily(emails);
      window.setTimeout(() => {
        this.setState({ familyID: id, complete: true });
      }, 2000);
    } else{
      let errmessage = "The following emails already exists: \n\n" + error + "\n\nEach person can only exist in one family at a time!"
      alert(errmessage);
    }
  }

  render() {
    if (this.state.complete) {
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
          <Link to="/">
            <img className="backImg" src="/back.png" alt="back" />
          </Link>
          <img className="logoImg" src="/logo.png" alt="logo" />
          <img
            className="menuImg"
            src="/menu.png"
            alt="menu"
            onClick={() => this.toggleMenu()}
          />
        </div>
        {this.renderContent()}

        {this.renderMenu()}
      </div>
    );
  }
}

export default withFirebase(NewFamily);
