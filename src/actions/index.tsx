import * as constants from '../constants';

export interface OpenNotificationsModal {
    type: constants.OPEN_NOTIFICATIONS_MODAL;
}

export interface CloseNotificationsModal {
    type: constants.CLOSE_NOTIFICATIONS_MODAL;
}

export type NotificationsModalActions = OpenNotificationsModal | CloseNotificationsModal;

export function openNotificationsModal(): OpenNotificationsModal {
    return {
        type: constants.OPEN_NOTIFICATIONS_MODAL
    }
}

export function closeNotificationsModal(): CloseNotificationsModal {
    return {
        type: constants.CLOSE_NOTIFICATIONS_MODAL
    }
}