import { NotificationsModalActions } from '../actions';
import { StoreState } from '../types/index';
import { OPEN_NOTIFICATIONS_MODAL, CLOSE_NOTIFICATIONS_MODAL } from '../constants/index';

export function notificationsModal(state: StoreState, action: NotificationsModalActions): StoreState {
  switch (action.type) {
    case OPEN_NOTIFICATIONS_MODAL:
        return { ...state, modals: {NotificationsModal: {open: true}}  };
    case CLOSE_NOTIFICATIONS_MODAL:
        return { ...state, modals: {NotificationsModal: {open: false}}  };
  }
  return state;
}