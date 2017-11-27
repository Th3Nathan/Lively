import { combineReducers } from 'redux';
import modals from './modalsreducer';
import { StoreState } from '../types/index';

const rootReducer = combineReducers<StoreState>({
  modals
});

export default rootReducer;
