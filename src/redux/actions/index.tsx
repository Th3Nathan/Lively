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
    };
}

export function closeNotificationsModal(): CloseNotificationsModal {
    return {
        type: constants.CLOSE_NOTIFICATIONS_MODAL
    };
}

export interface SetSnoozeUntil {
    type: constants.SET_SNOOZE_UNTIL;
    time: number;
}

// either trigged by user or indirectly when snooze time runs out
export interface EndSnooze {
    type: constants.END_SNOOZE;
}

export function setSnoozeUntil(time: number): SetSnoozeUntil {
    return {
        type: constants.SET_SNOOZE_UNTIL,
        time
    };
}

export function endSnooze(): EndSnooze {
    return {
        type: constants.END_SNOOZE
    };
}
