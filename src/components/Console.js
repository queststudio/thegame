import React from 'react';

const Message = props => {
  return <p>{props.message.text}</p>;
};

const Manos = props => <p>Манометры: {props.manos.join(', ')}</p>;
const Ventiles = props => <p>Вентили: {props.ventiles.join(', ')}</p>;

const FinishedRound = props => {
  const { manos, ventiles } = props.round;
  return (
    <div className="round finished">
      <Manos manos={manos} />
      <Ventiles ventiles={ventiles} />
    </div>
  );
};
const UnfinishedRound = props => {
  const { manos } = props.round;
  return (
    <div className="round unfinished">
      <Manos manos={manos} />
    </div>
  );
};

const Round = props => {
  const round = props.round;
  return round.finished ? (
    <FinishedRound round={round} />
  ) : (
    <UnfinishedRound round={round} />
  );
};

const Console = props => {
  const { messages, rounds } = props;
  const messageControls = messages.map(m => ({
    timestamp: m.timestamp,
    control: <Message message={m} />,
  }));
  const roundControls = rounds.map(m => ({
    timestamp: m.timestamp,
    control: <Round round={m} />,
  }));

  const orderedControls = messageControls
    .concat(roundControls)
    .sort((a, b) => a.timestamp - b.timestamp)
    .map(c => c.control);
  return <div className="messages">{orderedControls}</div>;
};

export default Console;
