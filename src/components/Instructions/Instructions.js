import React from "react";
import { List } from "semantic-ui-react";
import "./Instructions.css";

const Instructions = ({ instructionsList }) => {
  return (
    <div className="Instructions maxWidth">
      <h3>Instructions</h3>
      <List inverted celled ordered>
        {instructionsList.map(instruction => (
          <List.Item className='instructionLine'>{instruction}</List.Item>
        ))}
      </List>
    </div>
  );
};
export default Instructions;
