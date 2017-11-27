import { NotificationsModalActions } from '../actions/index';
import { OPEN_NOTIFICATIONS_MODAL, CLOSE_NOTIFICATIONS_MODAL } from '../constants/index';
import { merge } from 'lodash';

interface ModalsState {
    NotificationsModal: {
        open: Boolean;
    };
}

const defaultState = {
    NotificationsModal: {
        open: false
    }
};

const modalsReducer = (state: ModalsState = defaultState, action: NotificationsModalActions): ModalsState => {
    let newState = merge({}, state);
    switch (action.type) {
        case OPEN_NOTIFICATIONS_MODAL:
            return { ...newState, NotificationsModal: {open: true} };
        case CLOSE_NOTIFICATIONS_MODAL:
            return { ...newState, NotificationsModal: {open: false} };
        default:
            return newState;
    }
};

export default modalsReducer;