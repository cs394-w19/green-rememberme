import app from "firebase/app";

// import "firebase/auth";

import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBMV524MRFG6hOv4wHh2xX5Dlh8cRXIuHE",
  authDomain: "remember-me-green.firebaseapp.com",
  databaseURL: "https://remember-me-green.firebaseio.com",
  projectId: "remember-me-green",
  storageBucket: "remember-me-green.appspot.com",
  messagingSenderId: "974904190713"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    // this.auth = app.auth();
    this.db = app.firestore();
  }

  writeFirebase = (owner, recipe) => {
    this.db
      .collection("recipes")
      .add({
        owner,
        recipe
      })
      .then(ref => {
        console.log("Added document with ID: ", ref.id);
      });
  };

  readRecipe = id => {
    var recipeRef = this.db.collection("recipes").doc(`${id}`);
    recipeRef
      .get()
      .then(recipe => {
        if (!recipe.exists) {
          console.log("No such document!");
        } else {
          // console.log(recipe.data());
          return recipe.data();
          // return recipe;
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  };
}

export default Firebase;
