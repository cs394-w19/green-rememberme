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
      allRecipes: [],
      buttonsOn: "buttonContainerHidden"
    };
  }

  async componentDidMount() {
    const recipes = await this.props.firebase.readRecipes();

    // Working feature which separates recipes by family ID.
    // TODO: ask client if they want to enable this feature or not.

    // const recipesID = recipes.filter(
    //   recipe => recipe.data.recipe.family === this.state.familyID
    // );
    // this.setState({ allRecipes: recipesID });

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

  buttonClass(button) {
    return this.state.selectedFilter === button
      ? "button buttonOn"
      : "button buttonOff";
  }

  toggleButton(button) {
    if (button === this.state.selectedFilter) {
      this.setState({ selectedFilter: null });
      return;
    }
    this.setState({ selectedFilter: button });
  }

  renderToggleText() {
    if (this.state.buttonsOn === "buttonContainer") {
      return (
        <div className="linktext" onClick={() => this.toggleButtons()}>
          hide category filters...
        </div>
      );
    } else {
      return (
        <div className="linktext" onClick={() => this.toggleButtons()}>
          show category filters...
        </div>
      );
    }
  }

  toggleButtons() {
    if (this.state.buttonsOn === "buttonContainer") {
      this.setState({
        buttonsOn: "buttonContainerHidden",
        selectedFilter: null
      });
    } else {
      this.setState({ buttonsOn: "buttonContainer" });
    }
  }

  render() {
    const recipes = this.state.allRecipes;

    const recipeList = recipes.map((object, i) => {
      let path = "/recipes/" + object["id"];
      let a = object["data"]["recipe"]["title"].toLowerCase();
      let b = this.state.filter.toLowerCase();
      let imgUrl = object["data"]["recipe"]["imageArray"][0];
      if (imgUrl == null) {
        imgUrl = "/default-image.jpg";
      }
      if (a.includes(b)) {
        if (
          this.state.selectedFilter === object["data"]["recipe"]["category"] ||
          !this.state.selectedFilter
        ) {
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
                <img className="recipeImg" src={imgUrl} />{" "}
                {object["data"]["recipe"]["title"]}{" "}
              </div>
            </Link>
          );
        }
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

        <div className={this.state.buttonsOn}>
          <button
            className={this.buttonClass("Breakfast")}
            onClick={() => this.toggleButton("Breakfast")}
          >
            <div className="buttonImgText">B</div>
            <div className="buttonDescription">Breakfast</div>
          </button>

          <button
            className={this.buttonClass("Lunch")}
            onClick={() => this.toggleButton("Lunch")}
          >
            <div className="buttonImgText">L</div>
            <div className="buttonDescription">Lunch</div>
          </button>

          <button
            className={this.buttonClass("Dinner")}
            onClick={() => this.toggleButton("Dinner")}
          >
            <div className="buttonImgText">D</div>
            <div className="buttonDescription">Dinner</div>
          </button>

          <button
            className={this.buttonClass("Dessert")}
            onClick={() => this.toggleButton("Dessert")}
          >
            <div className="buttonImgText">D</div>
            <div className="buttonDescription">Dessert</div>
          </button>
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
        {this.renderToggleText()}
        <div className="recipeBox">{recipeList}</div>

        {/*{this.renderMenu()}
        <Navbar fixed="bottom" />*/}
      </div>
    );
  }
}

export default withFirebase(Home);
