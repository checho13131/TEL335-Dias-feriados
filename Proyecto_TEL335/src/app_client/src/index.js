import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ExercisesContextProvider } from './context/exercisesContext';
import { AuthContextProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ExercisesContextProvider>
        <App />
      </ExercisesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();
