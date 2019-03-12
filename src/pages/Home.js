import React, { Component } from "react";
import { withFirebase } from "../components/Firebase/";
import "./Login.css";
import "../App.css";
import Menu from "../components/Menu/Menu";
import "./Home.css";
import { Link } from "react-router-dom";
//import Navbar from 'react-bootstrap/Navbar'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.location.email,
      familyID: this.props.location.familyID,
      menu: false,
      filter: "",
      allRecipes: []
    };
  }

  async componentDidMount() {
    const recipes = await this.props.firebase.readRecipes();

    this.setState({ allRecipes: recipes });
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

  handleInput(e) {
    this.setState({ filter: e.target.value });
  }

  render() {
    const recipes = this.state.allRecipes;

    const recipeList = recipes.map((object, i) => {
      let path = "/recipes/" + object["id"];
      let a = object["data"]["recipe"]["title"].toLowerCase();
      let b = this.state.filter.toLowerCase();
      if (a.includes(b)) {
        return (
          <Link
            key={i}
            to={{
              pathname: path,
              email: this.state.email,
              familyID: this.state.familyID
            }}
          >
            <div key={i} className="nameBody">
              {" "}
              {object["data"]["recipe"]["title"]}{" "}
            </div>
            <br />
          </Link>
        );
      }
    });
    return (
      <div className="App">
        {/* We will eventually want to move all this logic into a separate component
          so we can access multiple recipes  */}

        <div className="appLogo">
          <img
            className="menuImg"
            src="/menu.png"
            alt="menu"
            onClick={() => this.toggleMenu()}
          />
        </div>

        {this.renderMenu()}

        <Link
          to={{
            pathname: "/newrecipe",
            email: this.state.email,
            familyID: this.state.familyID
          }}
        >
          <div className="addRecipe">
            <img src="/plus.png" className="addRecipeImg" alt="" />
          </div>
        </Link>

        <div className="homeLogo">
          <img className="logoImg" src="/logo.png" alt="logo" />
        </div>


        <div className="inputContainer">
          <input
            className="inputBody"
            value={this.state.filter}
            onChange={e => this.handleInput(e)}
            type="text"
            placeholder="Find a recipe"
          />
        </div>

        <div class="sectionHeader">Browse by Category</div>
        <div className="recipeBox">{recipeList}</div>

        {/*{this.renderMenu()}
        <Navbar fixed="bottom" />*/}
      </div>
    );
  }
}

export default withFirebase(Home);
