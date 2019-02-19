import React from "react";
import { List } from "semantic-ui-react";
import "./Ingredients.css";

const Ingredients = ({ ingredientList }) => {
  return (
    <div className="Ingredients">
      <h3>Ingredients</h3>
      <List celled>
        {ingredientList.map(ingredient => (
          <List.Item>{ingredient}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default Ingredients;
