
import React from "react";
import { hot } from 'react-hot-loader/root';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {io} from 'socket.io-client';
// import { SourceMapDevToolPlugin } from "webpack";

/*
PLAN:
Create chat window- to check messages

Create chat/room for users to join 

Create a room where multiple users can join

Have room distribute words to each user, 


See if user can type enter the word provided by the Server

The user will send the Server with the correct word,

Server will Finish/Win to user that got the correct word

*/



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
    })
  }


  render() {
    // const { name } = this.props;
    return (
      <div>
         <input type="text" value={this.state.message} onChange={this.handleChange} />
          <Button type="button" className="btn btn-primary" onClick={this.handleSubmit}>
            This is a bootstrap button
          </Button>
      </div>
    );
  }
}

export default hot(App);
