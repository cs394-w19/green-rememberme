import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Ingredients from "./components/Ingredients/Ingredients";
import Instructions from "./components/Instructions/Instructions";
import Media from "./components/Media/Media";
import Comment from "./components/Comment/Comment";
import Menu from "./components/Menu/Menu";
import AccordionList from "./components/AccordionList/AccordionList";
import photo from "./static/grandma.png";
import { withFirebase } from "./components/Firebase/";

class App extends Component {
  state = {
    currentRecipe: {
      menu: false,
      title: "Osso Bucco",
      subtitle: null,
      grandmaPic: photo,
      mediaStuff: ["i am an array of images and videos"],
      ingredients: [
        { name: "veal shanks", quantity: "4 1/2 inch thick" },
        { name: "all purpose flour for dredging", quantity: "1/2 cup" },
        { name: "unsalted butter", quantity: "1 Tbs." },
        { name: "medium onions finely diced", quantity: "2" },
        { name: "small carrots finely diced", quantity: "2" },
        { name: "dry white wine", quantity: "3/4 cup" },

        { name: "Italian cooked tomato paste", quantity: "2 1/2 cans" },

        { name: "large sprig thyme", quantity: "1" },
        { name: "zests/peels organic orange", quantity: "1/4" },
        { name: "cloves", quantity: "2" },
        { name: "salt and freshly ground black pepper", quantity: "" },
        { name: "water", quantity: "" }
      ],
      instructions: [
        "Chop the onions, add the butter, and fry them gently in the dutch oven.",
        "Dredge the shanks in the flour.",
        "Put the veal shanks in the dutch oven, and sear until nicely browned on both sides, 2 to 3 minutes per side.",
        "Add the wine, let it boil for a couple of minutes, then add the tomato cans, carrots, orange zest",
        "Add water until you obtain a thin liquid consistency.",
        "Let cook at medium heat for an hour, and turn the meat after 30 min.",
        "Tip: Add some garlic at the beginning if you like it or digest it :)"
      ]
    }
  };

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

  async componentWillMount() {
    try {
      // this.props.firebase.writeFirebase(
      //   "Michael Guo",
      //   this.state.currentRecipe
      // );
      // const response = await this.props.firebase.readRecipe(
      //   "k1r81WuFVK1i5zMiGJ1B"
      // );
      // console.log(await this.props.firebase.readRecipies());
    } catch (e) {
      console.log(e);
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
        <Header
          title={this.state.currentRecipe.title}
          subtitle={this.state.currentRecipe.subtitle}
          photo={this.state.currentRecipe.grandmaPic}
        />

        {this.renderMenu()}

        <Media />
        {/* <a href="javascript:;" className="file">
          <p>Upload&nbsp;&nbsp;Photo</p>
          <input accept="image/jpeg, image/png, video/*" disabled={false} type="file" multiple={true} autoComplete="off">
          </input>
        </a> */}

        <AccordionList name="Ingredients">
          <Ingredients ingredientList={this.state.currentRecipe.ingredients} />
        </AccordionList>
        <AccordionList name="Instructions">
          <Instructions
            instructionsList={this.state.currentRecipe.instructions}
          />
        </AccordionList>
        <Comment />
      </div>
    );
  }
}

export default withFirebase(App);
