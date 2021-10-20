import React, { Component } from 'react';
import './styles.css';
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <header className="todo-app__header">
          <h1 className="todo-app__title">todos</h1>
        </header>
        <section class="todo-app__main">
          <input className="todo-app__input" id="todo-input" placeholder = "what needs to be done?"></input>
        </section>
      </React.Fragment>
    );
  }
}

export default App;
