import React from 'react';



const MessageWindow = ({messages}) => {

  return (
    <div> 
      {messages.map( (m, id) => {
        return <div key={id}>{m}</div>
      })}
    </div>



  );




}


export default MessageWindow;