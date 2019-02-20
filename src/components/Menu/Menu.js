import React, { Component } from "react";
import "./Menu.css";

class Menu extends Component {


  render() {

    return (
      <div>
        <div className='menuContainer'>
          <div className='logoContainer'>
            <img className='logo' src='/logo.png' alt='logo' />
          </div>
          <div className='menuItem'>Home</div>
          <div className='menuItem'>My Recipes</div>
          <div className='menuItem'>New Recipe</div>
          <div className='menuItem'>Sign Out</div>
        </div>
      </div>
    );
  }
}

export default Menu;
