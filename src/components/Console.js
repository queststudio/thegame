import React from 'react';

const Message = props => {
  return <p>{props.message.text}</p>;
};

const Console = props => {
  const ordered = props.messages.sort((a, b) => a.timestamp - b.timestamp);
  return (
    <div className="messages">{ordered.map(m => <Message message={m} />)}</div>
  );
};

export default Console;
