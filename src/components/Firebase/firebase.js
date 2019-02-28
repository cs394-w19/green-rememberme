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

  // Takes in an owner and a recipe and writes it to firebase
  writeRecipe = (owner, recipe) => {
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

  // Read all recipes stored in database
  // Returns the id of the recipe as well as the title of the recipe
  readRecipes = async () => {
    const snapshot = await this.db.collection("recipes").get();
    try {
      const data = snapshot.docs.map(doc => {
        return { id: doc.id, title: doc.data().recipe.title };
      });

      return data;
    } catch (e) {
      console.log(e);
    }
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
