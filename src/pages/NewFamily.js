import React, { Component } from "react";
import { withFirebase } from "../components/Firebase/";
import "./Login.css";
import "../App.css";
import Menu from "../components/Menu/Menu";
import { Link, Redirect } from "react-router-dom";

class NewFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      familyEmails: []
    };
  }

  componentDidMount(){
    console.log(this.state)
  }



//IN PROGRESS>>>>>>>>
  async handleSubmitEmail(e) {
    if (!this.validateEmail(this.state.email)) {
      this.setState({
        error: true,
        errorMessage: "Invalid email..."
      });
    } else {
      console.log("received email");
      // const familyID = await this.props.firebase.findFamily();
      // window.setTimeout(()=>{
      //   console.log(familyID)
      //   if (familyID == null || familyID == -1){
      //     console.log('handled the error')
      //   } else {
      //     this.setState({loggedIn: true});
      //   }}, 2000)
      this.setState({loggedIn: true});

    }
  }



  render() {
    if (this.state.loggedIn === true) {
      window.scrollTo(0, 0);
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


      <div className="section">
        <div className="sectionHeader">Add Family Emails</div>
        <input className='inputTitle' onChange={(e)=>this.setState({title:e.target.value})}/>
      </div>


          <button
            className="buttonPrimary"
            onClick={() => this.handleSubmitEmail()}>
            LOGIN
          </button>
        </div>
    );
  }
}

export default withFirebase(NewFamily);
