import React from 'react';
import './App.css';
import ChatZone from './ChatZone';
import ContactWindow from './ContactWindow';
import InputZone from './InputZone';

const CommunicationZone = () => {
  const [state, setState] = React.useState({
    value: '',
    disposable: '',
    history: ['How can I help?'],
  });
  const stateRef = React.useRef(state);

  function handleChange(event) {
    setState({
      ...state,
      value: event.target.value,
    });
  }

  function handleSubmit(event) {
    if (event.key === 'Enter') {
      const newState = {
        ...state,
        value: '',
        disposable: event.target.value,
        history: [...state.history, event.target.value],
      };
      setState(newState);
      stateRef.current = newState;

      setTimeout(dialogueEngine, 3000);
    }
    cleanHistory();
  }

  async function dialogueEngine() {
    const API_URL = 'http://localhost:8000/chat';
    const mapItems = (res) =>
      res.map((item) => ({
        title: item.title,
        link: item.link,
        tags: item.tags,
      }));
    const res = await fetch(API_URL + '?q=' + stateRef.current.disposable);

    const { items } = await res.json();

    const first3Responses = mapItems(items.slice(0, 3));
    const response = first3Responses
      .map((item) => {
        const { title, link, tags } = item;
        return `${title}\nLink: ${link}\nTags: ${tags.join(', ')}`;
      })
      .join('----------------------------------\n');

    setState({
      ...stateRef.current,
      history: [...stateRef.current.history, response],
    });
  }

  function cleanHistory() {
    const tempHistory = state.history;
    let newHistory = [];
    if (state.history.length > 12) {
      tempHistory.shift();
      tempHistory.shift();
      newHistory = tempHistory;
      setState({
        ...state,
        history: newHistory,
      });
    }
  }

  return (
    <div className="chatHost innerShadow">
      <ContactWindow />
      <ChatZone chatItem={state.history} />
      <InputZone
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={state.value}
      />
    </div>
  );
};

export default CommunicationZone;
