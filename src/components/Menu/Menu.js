import React, { Component } from "react";
import "./Menu.css";

class Menu extends Component {

  constructor(props){
    super(props);
    this.state = {
      exiting: false
    }
  }

  componentWillUnmount(){
    this.setState({exiting:true})
  }

  closeMenu(){
    console.log('closing inside child')
    this.props.toggle()
  }

  selectClass(){
    if (this.state.exiting){
      return('menuContainer exiting')
    }
    return('menuContainer')
  }


  render() {

    return (
      <div>
        <div className={this.selectClass()} onClick={this.closeMenu()}>
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
