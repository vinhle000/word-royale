
import React from "react";
import { hot } from 'react-hot-loader/root';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {io} from 'socket.io-client';
// import { SourceMapDevToolPlugin } from "webpack";

// const socket = io('ws://localhost:3000');

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      message:'',
      messages: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.socket = io('ws://localhost:3000');
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
          <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>
            This is a bootstrap button
          </button>
      </div>
    );
  }
}

export default hot(App);
