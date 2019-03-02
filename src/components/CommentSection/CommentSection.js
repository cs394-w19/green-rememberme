import React from "react";
import "./CommentSection.css";
import UserComment from "../Comment/Comment";
import { Button, Comment, Form, Header } from "semantic-ui-react";

class CommentSection extends React.Component {
  state = { term: "" };

  onFormSubmit = async e => {
    e.preventDefault();
    this.props.firebase.addComment(
      this.props.recipeID,
      this.props.email,
      this.state.term,
      this.props.comments
    );
    this.setState({ term: "" });
  };

  render() {
    return (
      <div className="maxWidth">
        <Comment.Group style={{ margin: "10px 20px 10px 20px" }}>
          <div style={{ height: "10px" }} />
          <Header as="h3" dividing>
            <div className="commentHeader">Comments</div>
          </Header>
          {this.props.comments.map((comment, i) => (
            <UserComment message={comment} key={i} />
          ))}
          <Form reply onSubmit={this.onFormSubmit}>
            <Form.TextArea
              type="text"
              value={this.state.term}
              onChange={e => this.setState({ term: e.target.value })}
            />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Comment.Group>
      </div>
    );
  }
}

export default CommentSection;
