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

  // Reads the recipe from firestore
  readRecipe = async id => {
    var recipeRef = this.db.collection("recipes").doc(`${id}`);
    const recipe = await recipeRef.get();

    try {
      if (!recipe.exists) {
        console.log("No such document!");
      } else {
        return recipe.data();
      }
    } catch (e) {
      console.log("Error getting document", e);
    }
  };
}

export default Firebase;
