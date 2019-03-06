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
      instructions:[''],
    };
  }

  componentDidMount(){
    console.log(this.state)
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


  addEmail(){
    this.setState((prevState) => ({
      instructions:[...prevState.instructions, '']
    }))
  }

  renderEmail(){
    const ins = this.state.instructions.map((val, i)=>{
      let varname = "ins" + i
      return(
        <div className='inputContainer' key={i}>
          <input className='inputInstruction' onChange={(e)=>this.setState({[varname]:e.target.value})}/>
        </div>
      )
    })
    return ins
  }

  createRecipeObject(){
    let recipe={
      instructions:[]
    }
    var i;
    for (i=0; i < this.state.instructions.length; i++){
      let insname = 'ins' + i
      recipe.instructions.push(this.state[insname])
    }

    console.log(recipe)
    this.writeRecipe(recipe)
  }

  writeRecipe(recipe){
    console.log('there she goes')
    let val = this.props.firebase.writeRecipe(recipe)
    window.setTimeout(()=>{console.log(val)},2000)
  }



  render() {
    return (
      <div className="App">
        {/* We will eventually want to move all this logic into a separate component
          so we can access multiple recipes  */}
        <div className="appLogo">
          <Link to={{ pathname: "/home", email: this.state.email, familyID: this.state.familyID }}>
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
            <div className="sectionHeader">Add Family Emails</div>
            {this.renderEmail()}
            <button className="addIngredient" onClick={()=>this.addEmail()}>
              <img src="/plus.png" className="addIngredientImg" alt=""/>
              add instruction
            </button>
            </div>


        <button className="buttonPrimary" onClick={()=>this.createRecipeObject()}>Done</button>
        {this.renderMenu()}

      </div>
    );
  }
}

export default withFirebase(NewFamily);
