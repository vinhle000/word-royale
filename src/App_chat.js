
import React, { Fragment } from "react";
import { hot } from 'react-hot-loader/root';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components'
import {io} from 'socket.io-client';
// import { SourceMapDevToolPlugin } from "webpack";

import MessageWindow from "./components/MessageWindow";

/*
PLAN:
Create chat window- to check messages --- Done

Create chat/room for users to join  --- May not be neccesary to do all, just for practice
- make several rooms
  - have users join
  - display room in drop down
  - have user join different rooms
  - user will see all messages for that room
  (This may not be neccesary, but will help implement the Game Room scenario, 
    for users to join a session)


Create a room where multiple users can join

[]1 or more users join a room/'session' 
    - one player can select START GAME
    - Server will send a word down
    - Test out if the user can send the word back
    - User that sends it back, will get a win message, while others lose
      * this will test the broadcasting / or send to specific users a message

Have room distribute words to each user, 


See if user can type enter the word provided by the Server

The user will send the Server with the correct word,

Server will Finish/Win to user that got the correct word

*/

// --- if useing styled components, cant use styled components with the same name as BootStrap component'
const ButtonStyled = styled(Button)`
  background: palevioletred;
  border-radius: 3px;
  border: none;
  color: white;
`

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      message:'',
      messages: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.socket = io('ws://localhost:8080');
  }
  
  // this.socket = io('ws://localhost:3000');
 
  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleSubmit(event) {
    console.log('A name was submitted: ' + this.state.message);
    event.preventDefault();
    
    this.socket.emit('message', this.state.message)
  }
  
  componentDidMount() {
   
    this.socket.on('message', text => {
      console.log('Got from server:', text);
      //append message listt)
      let messageList = this.state.messages;
      messageList.push(text)
      this.setState({messages: messageList})
    })
  }


  render() {
    // const { name } = this.props;
    return (
      <Fragment>
        <div>
          <input type="text" value={this.state.message} onChange={this.handleChange} />
            <ButtonStyled type="button" className="btn btn-primary" onClick={this.handleSubmit}>
              This is a bootstrap button
            </ButtonStyled>

        </div>
        <MessageWindow messages={this.state.messages}/>

  
      </Fragment>
    );
  }
}

export default hot(App);
