import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';

// const consoleError = console.error.bind(console);

// console.error = (errObj, ...args) => {
//   console.log(errObj, args, process.env.NODE_ENV);
//   if (
//     process.env.NODE_ENV === 'development' &&
//     typeof errObj === 'string' &&
//     args.includes('findDOMNode')
//   ) {
//     return;
//   }
//   consoleError(errObj, ...args);
// };
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
