import React from 'react';
import { EXCEPTIONS } from '../constants/index';

const Message = props => {
  return <div className="message">{props.message.text}</div>;
};

const Manos = props => (
  <div className="input">Манометры: {props.manos.join(', ')}</div>
);
const Ventiles = props => (
  <div className="output">Вентили: {props.ventiles.join(', ')}</div>
);

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

const Mistake = props => {
  const { type } = props.mistake;
  const messages = {
    [EXCEPTIONS.CIRCULAR_REFERENCE]: 'Обнаружена циклическая зависимость',
    [EXCEPTIONS.HANGING_LINK]: 'Обнаружена не замкнутая связь.',
    [EXCEPTIONS.TWO_INPUTS_CONNECTED]: 'Обнаружены два блока соединенные входами.',
    [EXCEPTIONS.TOO_MANY_SOURCES]:
      'На вход блока приходит слишком много связей.',
    [EXCEPTIONS.ONE_OF_THE_EXITS_IS_ABSENT]:
      'Не найден один из вентилей.',
    [EXCEPTIONS.VALUE_NOT_SPECIFIED]: 'Исходное значение одного из блоков не задано.'
  };

  const text = type ? messages[type] : 'Неизвестная ошибка.';

  return <div className="mistake">{text}</div>;
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
  const { messages, rounds, mistakes } = props;
  const messageControls = messages.map(m => ({
    timestamp: m.timestamp,
    control: <Message message={m} />,
  }));
  const roundControls = rounds.map(m => ({
    timestamp: m.timestamp,
    control: <Round round={m} />,
  }));
  const mistakesControl = mistakes.map(m => ({
    timestamp: m.timestamp,
    control: <Mistake mistake={m} />,
  }));

  const orderedControls = messageControls
    .concat(roundControls)
    .concat(mistakesControl)
    .sort((a, b) => a.timestamp - b.timestamp)
    .map(c => c.control);
  return <div className="messages">{orderedControls}</div>;
};

export default Console;
