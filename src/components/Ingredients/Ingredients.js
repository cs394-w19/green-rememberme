import React from "react";
import { List } from "semantic-ui-react";
import "./Ingredients.css";

const Ingredients = ({ ingredientList }) => {
  return (
    <div className="Ingredients maxWidth">
      <h3>Ingredients</h3>
      <List celled>
        {ingredientList.map(ingredient => (
          <List.Item>
            <List.Content floated="right" className='quantity'>{ingredient.quantity}</List.Content>
            <List.Content>{ingredient.name}</List.Content>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default Ingredients;
