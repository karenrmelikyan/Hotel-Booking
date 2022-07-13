import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AdminContextProvider from "./context/AdminContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AdminContextProvider>
          <div style={{padding: '0.1% 1%'}}>
              <App />
          </div>
      </AdminContextProvider>
  </React.StrictMode>
);
