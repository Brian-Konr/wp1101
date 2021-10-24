import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const DATA = [
  {id: "0", itemDetail: "first", checked: true},
  {id: "1", itemDetail: "second", checked: false},
  {id: "2", itemDetail: "third", checked: true},
  {id: "3", itemDetail: "fourth", checked: true},
];

ReactDOM.render(
  <React.StrictMode>
    <App task = {DATA}/>
  </React.StrictMode>,
  document.getElementById('react-todo')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
