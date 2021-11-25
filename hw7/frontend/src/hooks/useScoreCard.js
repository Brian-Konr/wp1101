import { createContext, useContext, useState } from 'react';

const ADD_MESSAGE_COLOR = '#3d84b8';
const REGULAR_MESSAGE_COLOR = '#2b2e4a';
const ERROR_MESSAGE_COLOR = '#fb3640';

const ScoreCardContext = createContext({
  messages: [],

  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},
  addClearMessage: () => {},
});

const makeMessage = (message, color) => {
  return { message, color };
};

const ScoreCardProvider = (props) => {
  const [messages, setMessages] = useState([]);

  const addCardMessage = (message) => {
    setMessages([...messages, makeMessage(message, ADD_MESSAGE_COLOR)]);
  };

  const addRegularMessage = (...ms) => {
    let temp = ms[0];
    temp = temp.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR))
    let tempArr = Array.from(messages);
    tempArr = tempArr.concat(temp);
    setMessages(tempArr);
  };

  const addErrorMessage = (message) => {
    setMessages([...messages, makeMessage(message, ERROR_MESSAGE_COLOR)]);
  };

  const addClearMessage = (...ms) => {
    setMessages([...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR))]);
  }

  return (
    <ScoreCardContext.Provider
      value={{
        messages,
        addCardMessage,
        addRegularMessage,
        addErrorMessage,
        addClearMessage,
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
