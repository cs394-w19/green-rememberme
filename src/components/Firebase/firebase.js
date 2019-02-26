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
    this.db = app.database();
  }

  writeFirebase = (recipeId, name, recipe = null) => {
    this.db.ref("recipes/" + recipeId).set(
      {
        username: name,
        recipe: {}
      },
      function(error) {
        if (error) {
          // The write failed...
        } else {
          console.log("successfully saved data");
          // Data saved successfully!
        }
      }
    );
  };
}

export default Firebase;
