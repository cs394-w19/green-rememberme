import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import './Comment.css'

const CommentExampleComment = () => (
  <Comment.Group style = {{margin: "10px 20px 10px 20px"}}>
    <div style={{height: "10px"}}></div>

    <Header as='h3' dividing>
      <div className="commentHeader">Comments</div>
    </Header>

    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Matt</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>Great recipe!</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Grandma</Comment.Author>
        <Comment.Metadata>
          <div>Yesterday at 12:30AM</div>
        </Comment.Metadata>
        <Comment.Text>
          <p>Try substituting lemon zest and adding a full cup of white wine!</p>
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
      <Comment.Group>
        <Comment>
          <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
          <Comment.Content>
            <Comment.Author as='a'>Elise</Comment.Author>
            <Comment.Metadata>
              <div>Just now</div>
            </Comment.Metadata>
            <Comment.Text>Wow, I tried this and it tastes amazing!</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Comment>

    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Uncle Tommy</Comment.Author>
        <Comment.Metadata>
          <div>5 days ago</div>
        </Comment.Metadata>
        <Comment.Text>This has been a Sunday night favorite. Thanks for sharing.</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Form reply>
      <Form.TextArea />
      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>
)

export default CommentExampleComment
