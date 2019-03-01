import React from "react";
import { List } from "semantic-ui-react";
import "./Instructions.css";

const Instructions = ({ instructionsList }) => {
  return (
    <div className="Instructions maxWidth">
      <List inverted celled ordered>
        {instructionsList.map((instruction, i) => (
          <List.Item key={i} className="instructionLine">
            {instruction}
          </List.Item>
        ))}
      </List>
    </div>
  );
};
export default Instructions;
