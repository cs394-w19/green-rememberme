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
    try {
      this.db
        .collection("recipes")
        .add({
          owner,
          recipe
        })
        .then(ref => {
          console.log("Added document with ID: ", ref.id);
          return 0;
        });
    } catch (e) {
      return -1;
    }
  };

  // Read all recipes stored in database
  // Returns the id of the recipe as well as the title of the recipe
  readRecipes = async () => {
    const snapshot = await this.db.collection("recipes").get();
    try {
      const data = snapshot.docs.map(doc => {
        return { id: doc.id, recipe: doc.data() };
      });

      return data;
    } catch (e) {
      console.log(e);
      return -1;
    }
  };

  // Reads the recipe from firestore
  readRecipe = async id => {
    var recipeRef = this.db.collection("recipes").doc(`${id}`);
    const recipe = await recipeRef.get();
    try {
      if (!recipe.exists) {
        console.log("No such document!");
        return -1;
      } else {
        return recipe.data();
      }
    } catch (e) {
      console.log("Error getting document", e);
      return -1;
    }
  };

  deleteRecipe = id => {
    console.log("hello world");
  };

  addComment = (id, author, text) => {
    console.log("hello world");
  };

  /**
   * @param {String} familyID (familyID )
   *
   * @memberof Firebase
   */
  getFamily = async familyID => {
    try {
      this.db
        .collection("family")
        .doc(familyID)
        .get()
        .then(ref => {
          if(!ref.exists){
            console.log("No such family ID!");
          }else{
            console.log("Family members are: ", ref.data());
          }
          return 0;
        });
    } catch (e) {
      return -1;
    }  
  };

  /**
   * @param {Array} array_emails (emails array)
   * @returns {String} ref.id
   * @memberof Firebase
   */

  createFamily = async array_emails => {
    try {
      this.db
        .collection("family")
        .add({
          members: array_emails.forEach(function(item){
            return {item: true}
          })
        })
        .then(ref => {
          console.log("Added family with ID: ", ref.id);
          return 0;
        });
    } catch (e) {
      return -1;
    } 
  };

  /**
   * @param {String} email_string (the query email) 
   * @returns {String} ref.id
   *
   * @memberof Firebase
   */
  findFamily = async email_string => {
    try {
      this.db
        .collection('family')
        .where(`members.${email_string}`, '==', true)
        .get()
        .then(ref => {
          if(!ref.exists){
            console.log("Not belong to any family!");
          }else{
            console.log("Family ID is: ", ref.id);
          }
          return 0;
        });
    } catch (e) {
      return -1;
    } 
  };

  /**
   * @param {String} familyID (the family needs to be updated)
   * @param {String} array_emails (the emails need to add)
   *
   * @memberof Firebase
   */
  updateFamily = async (familyID, array_emails) => {
    try {
      this.db
        .collection('family')
        .doc(familyID)
        .update({
          members: array_emails.forEach(function(item){
            return {item: true}
          })
        });
    } catch (e) {
      return -1;
    }   };

  test = () => {
    console.log("this is coming from firebase.js");
  };
}

export default Firebase;
