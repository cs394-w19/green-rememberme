import React, { Component } from "react";
import "../App.css";
import Menu from "../components/Menu/Menu";
import photo from "../static/grandma.png";
import { withFirebase } from "../components/Firebase/";

class Home extends Component {

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

  // componentDidMount() {
  //   this.props.firebase.writeFirebase(123, "Michael");
  // }

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

export default withFirebase(Home);
