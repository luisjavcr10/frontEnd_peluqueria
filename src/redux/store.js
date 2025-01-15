// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; // Middleware para manejar lógica asíncrona
import rootReducer from './reducers/rootReducer'; // Importar rootReducer

// Configurar el store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;