import React, { Component } from "react";
import { withFirebase } from "../components/Firebase/";
import "./MyFamily.css";
import "../App.css";
import Menu from "../components/Menu/Menu";
import { Link, Redirect } from "react-router-dom";

class MyFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.location.email,
      familyID: this.props.location.familyID,
      familyEmails: [],
      menu: false,
      complete: false,
      addMember: false,
      newMember: ""
    };
  }

  async componentDidMount() {
    let familyEmails = await this.props.firebase.getFamily(this.state.familyID);
    window.setTimeout(() => {
      console.log("FIREBASE RETURNED: ", familyEmails);
    }, 2000);
    if (familyEmails === -1) {
      familyEmails = [];
    }
    this.setState({ familyEmails: familyEmails });
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

  removeFamilyMember(email) {
    console.log("removing member ", email);
    let arr = this.state.familyEmails;
    arr = arr.filter(e => e !== email);
    this.setState({ familyEmails: arr });
  }

  addFamilyMember = async e => {
    e.preventDefault();
    console.log("adding member ", this.state.newMember);
    let arr = this.state.familyEmails;
    arr.push(this.state.newMember);
    await this.props.firebase.updateFamily(this.state.familyID, arr);
    this.setState({ addMember: false, newMember: "" });
    console.log("done adding");
  };

  renderNewMemberForm() {
    if (this.state.addMember) {
      return (
        <form>
          <input
            className="familyMember"
            type="text"
            placeholder="email"
            value={this.state.newMember}
            onChange={e => this.setState({ newMember: e.target.value })}
          />
          <input
            type="submit"
            className="addMember"
            value="Submit"
            onClick={e => {
              this.addFamilyMember(e);
            }}
          />
        </form>
      );
    }
  }

  renderEmails() {
    const members = this.state.familyEmails.map((email, i) => {
      let me = " (me)";
      if (email === this.state.email) {
        return (
          <div key={i} className="familyMember">
            {email} {me}
          </div>
        );
      }
      return (
        <div key={i} className="familyMember">
          {email}
          <div
            className="removeFamilyMember"
            onClick={() => this.removeFamilyMember(email)}
          >
            X
          </div>
        </div>
      );
    });
    return members;
  }

  async updateFamily() {
    let response = await this.props.firebase.updateFamily(
      this.state.familyID,
      this.state.familyEmails
    );
    this.setState({ complete: true });
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
        <div className="appLogo">
          <Link
            to={{
              pathname: "/home",
              email: this.state.email,
              familyID: this.state.familyID
            }}
          >
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

        <div className="section">
          <div className="sectionHeader">My Family</div>
          {this.renderEmails()}
          {this.renderNewMemberForm()}
          <button
            className="addMember"
            onClick={e => {
              this.setState({ addMember: true });
            }}
          >
            <img src="/plus.png" className="addMemberImg" alt="" />
            add member
          </button>
        </div>

        <button className="buttonPrimary" onClick={() => this.updateFamily()}>
          SAVE
        </button>
        {this.renderMenu()}
      </div>
    );
  }
}

export default withFirebase(MyFamily);
