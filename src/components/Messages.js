import React from 'react';

const Message = props => {
  return <p>{props.message.text}</p>;
};

const Messages = props => {
  return (
    <div className="messages">
      {props.messages.map(m => <Message message={m} />)}
    </div>
  );
};

export default Messages;
