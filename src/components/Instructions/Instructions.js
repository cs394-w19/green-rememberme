import React from "react";
import { List } from "semantic-ui-react";
import "./Instructions.css";

const Instructions = ({ instructionsList }) => {
  return (
    <div className="Instructions">
      <h3>Instructions</h3>
      <List inverted celled ordered>
        {instructionsList.map(ingredient => (
          <List.Item>{ingredient}</List.Item>
        ))}
      </List>
    </div>
  );
};
export default Instructions;
