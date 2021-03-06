import app from "firebase/app";
// import "firebase/auth";

import "firebase/firestore";
import "firebase/storage";

// TODO: Replace with your project's customized code snippet
const config = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  projectId: "<PROJECT_ID>",
  storageBucket: "<BUCKET>.appspot.com",
  messagingSenderId: "<SENDER_ID>",
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    // this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  /**
   * Takes in a recipe and writes it to firebase for persistence]
   * @param  {[ JSON ]} recipe [A JSON recipe object which contains ingredients,
   *                            instructions, media, title, comments, and familyID]
   * @return {[integer]}        [-1 for failure and 0 for success]
   */
  writeRecipe = recipe => {
    try {
      this.db
        .collection("recipes")
        .add({ recipe })
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
  /**
   * retrieves all of the recipes on firebase and returns a promise of arrays
   * @return {Promise} [description]
   */
  readRecipes = async () => {
    try {
      const snapshot = await this.db.collection("recipes").get();

      // stores array with structure {id, recipe}
      const data = snapshot.docs.map(doc => {
        return { id: doc.id, data: doc.data() };
      });

      return data;
    } catch (e) {
      console.log(e);
      return -1;
    }
  };

  /**
   * [reads a recipe from firebase]
   * @param  {[string]}  id [takes the id of the recipe we're trying to read]
   * @return {Promise}    [returns the recipe]
   */
  readRecipe = async id => {
    var recipeRef = this.db.collection("recipes").doc(`${id}`);
    try {
      const recipe = await recipeRef.get();
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

  /**
   * Deletes a recipe from firebase
   * @param  {[string]}  id [the id of the recipe]
   * @return {Promise}    [returns an integer 0 for success and -1 for failure]
   */
  deleteRecipe = async id => {
    var recipeRef = this.db.collection("recipes").doc(`${id}`);
    try {
      await recipeRef.delete();
      console.log("Document successfully deleted!");
      return 0;
    } catch (e) {
      console.error("Error removing document: ", e);
      return -1;
    }
  };

  /**
   * Adds a comment to a recipe's comments on firebase
   * @param  {[string]}  id [the id of the recipe]
   * @param  {[string]}  author [comment author]
   * @param  {[string]}  text [comment text]
   * @param  {[ JSON ]}  comments [a JSON object which contains the recipe's current comments]
   * @return {Promise}    [returns an integer 0 for success and -1 for failure]
   */
  addComment = async (id, author, text, comments) => {
    const recipeRef = this.db.collection("recipes").doc(`${id}`);
    const dateObj = new Date();
    const date = `${dateObj.getUTCMonth() +
      1}/${dateObj.getUTCDate()}/${dateObj.getUTCFullYear()}`;
    try {
      const newComment = { author, date, text };

      if (text !== "" || author !== "") {
        comments.push(newComment);
        await recipeRef.update({ "recipe.comments": comments });
      }
      return 0;
    } catch (e) {
      console.error("Error adding comment: ", e);
      return -1;
    }
  };

  /**
   * @param {String} familyID (familyID )
   *
   * @memberof Firebase
   */
  getFamily = async familyID => {
    try {
      let temp = await this.db
        .collection("family")
        .doc(familyID)
        .get();
      if (typeof temp != "undefined") {
        return temp.data().members;
      } else {
        console.log("nothing");
        return -1;
      }
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
      var doc = await this.db.collection("family").add({
        members: array_emails
      });

      if (doc != undefined) {
        return doc.id;
      } else {
        return -1;
      }
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
      var target_id;
      console.log(email_string);
      const snapshot = await this.db.collection("family").get();

      snapshot.docs.map(family => {
        // this gives you the familyID we're trying to return
        const family_emails = family.data()["members"];

        family_emails.forEach(email => {
          if (email_string == email) {
            target_id = family.id;
          }
        });
      });

      if (target_id) {
        return target_id;
      } else {
        return -1;
      }
    } catch (e) {
      console.log("Error finding family", e);
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
      let data = {
        members: array_emails
      };
      await this.db
        .collection("family")
        .doc(familyID)
        .set(data);
      return 0;
    } catch (e) {
      console.log(e);
      return -1;
    }
  };

  test = () => {
    console.log("this is coming from firebase.js");
  };

  getDBRef = id => {
    return this.db.collection("recipes").doc(id);
  };
}

export default Firebase;
