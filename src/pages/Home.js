import React, { Component } from "react"
import { withFirebase } from "../components/Firebase/"
import "./Login.css"
import "../App.css"
import Menu from "../components/Menu/Menu";
import './Home.css'
import { Link } from 'react-router-dom'
//import Navbar from 'react-bootstrap/Navbar'

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      email: this.props.location.email,
      menu:false,
      filter:''
    }
  }

  componentDidMount(){
    console.log(this.state.email)
  }

  toggleMenu() {
    console.log("toggling menu");
    if (this.state.menu) {
      this.setState({
        menu: false
      });
    }
    else {
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
          <Menu toggle={() => this.toggleMenu.bind(this)} email={this.state.email}/>
        </div>
      );
    }
  }

  handleInput(e){
    this.setState({filter:e.target.value})
  }

  render() {

    const recipes = [['Osso Bucco',1],['Pumpkin Bread',2],["Grandma's Pancakes",3], ['Cheezits',4],["Michael's Mac and Cheeze",5],["Terry's Terry-iaki",6],["Ryan's Cereal",7],["Cristobal's Rice",8],["Vanessa's Ramen",9]]
    const recipeList = recipes.map((recipe, i) => {
      let path = '/recipes/' + recipe[1]
      let a = recipe[0].toLowerCase()
      let b = this.state.filter.toLowerCase()
      if (a.includes(b)){
        return(
          <Link key={i} to={{pathname:path,email:this.state.email}}>
            <div key={i} className="nameBody"> {recipe[0]} </div>
            <br/>
          </Link>
        )
      }
    })
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

        <Link to={{pathname:'/newrecipe', email:this.state.email}}>
          <div className='addRecipe'>
            <img src='/plus.png' className='addRecipeImg' alt='' />
          </div>
        </Link>


        <div className="homeLogo">
          <img className="largeLogo" src="/logo.png" alt="logo" />
        </div>

        <div className="inputContainer">
          <input className="inputBody" value={this.state.filter} onChange={(e)=>this.handleInput(e)} type="text" placeholder="Find a recipe"/>
        </div>

        <div className="recipeBox">
          {recipeList}
        </div>

        {/*{this.renderMenu()}
        <Navbar fixed="bottom" />*/}
      </div>
    );
  }
}

export default withFirebase(Home);
