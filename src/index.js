import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './AdminPage/AdminPage';
import App from './App/App';
import NewProviderForm from './NewProviderForm/NewProviderForm';

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="edit/:userId" element={<NewProviderForm />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
