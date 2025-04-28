import React from 'react';
import { createRoot } from 'react-dom/client'; // Импортируем новый API
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './index.css';

// Создаём корневой элемент
const container = document.getElementById('root');
const root = createRoot(container);

// Рендерим приложение
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);