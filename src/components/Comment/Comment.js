import React from "react";
import { Comment } from "semantic-ui-react";
import "./Comment.css";

const UserComment = ({ message }) => {
  return (
    <Comment>
      <Comment.Avatar src={require("../../static/logo.png")} />
      <Comment.Content>
        <Comment.Author as="a">{message.author}</Comment.Author>
        <Comment.Metadata>
          <div>{message.date}</div>
        </Comment.Metadata>
        <Comment.Text>{message.text}</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
};

export default UserComment;
