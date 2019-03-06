import React, { Component } from "react";
import { withFirebase } from "../components/Firebase/";
import "./Login.css";
import "../App.css";
import Menu from "../components/Menu/Menu";
import { Link, Redirect } from "react-router-dom";

class MyFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.location.email,
      familyID: this.props.location.familyID,
      familyEmails: []
    };
  }

  async componentDidMount(){
    let familyEmails = await this.props.firebase.getFamily(this.state.familyID)
    window.setTimeout(()=>{console.log('FIREBASE RETURNED: ',familyEmails)},2000)
    this.setState({familyEmails:familyEmails})
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
        <div className="sectionHeader">My Family</div>
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

export default withFirebase(MyFamily);
