import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Game from './componenets/Game/Game'
import Calculator from './componenets/Calculator/Calculator'
import Museum from './componenets/museum/Museum';

ReactDOM.render(
  <React.StrictMode>
    <Game />
    {/* <Calculator /> */}
    {/* <Museum /> */}
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
