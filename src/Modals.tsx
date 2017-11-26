import * as React from 'react';
import NotificationsModal from './NotificationsModal';

export interface Props {
    modals: {
        NotificationsModal: {
             open: Boolean
        }
    }
}

class Modals extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <NotificationsModal />
            </div>
        )
    }
}

export default Modals;
