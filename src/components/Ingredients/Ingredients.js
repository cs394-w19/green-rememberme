import React from "react";
import { List } from "semantic-ui-react";
import "./Ingredients.css";

const Ingredients = ({ ingredientList, firebase }) => {
  console.log("hello world");

  // Running test route
  // firebase.test();

  return (
    <div className="Ingredients maxWidth">
      <List celled>
        {ingredientList.map((ingredient, i) => (
          <List.Item key={i}>
            <List.Content floated="right" className="quantity">
              {ingredient.quantity}
            </List.Content>
            <List.Content>{ingredient.name}</List.Content>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default Ingredients;
