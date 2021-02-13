import { createStore } from 'redux';
import { SHOW_MODAL_STOCK } from './actions';

const initialStore = {
  showModalStock: false,
};

// Recibe el estado y la acción
// Devuelve el nuevo estado
const rootReducer = (state = initialStore, action) => {
  console.log(action);
  if (action.type === SHOW_MODAL_STOCK) {
    return {
      ...state,
      showModalStock: action.data,
    };
  }
  return state;
};

export default createStore(rootReducer);
