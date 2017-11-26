import * as React from 'react';
import SidebarHeaderTitle from './SidebarHeaderTitle';
import SidebarHeaderNotifications from './SidebarHeaderNotifications';
import UserItem from './UserItem';
import Hoverable from './Hoverable';
import { HoverState } from './interfaces';
import './SidebarHeader.css';

interface SidebarHeaderProps {
    status: String;
    active: String; 
    openNotificationsModal?: () => void;
}

export class SidebarHeader extends React.Component<SidebarHeaderProps, {}> {
    constructor(props: SidebarHeaderProps) {
        super(props);
    }

    getStyle = (hovering: Boolean) => {
        if (hovering) {
            return {'background': '#3E313C'};
        } else {
            return {'background': '#4d394b'};
        }
    }

    public render() {
        return (
            <Hoverable>
                {({hovering}: HoverState) => {
                    let hoverStyle = this.getStyle(hovering);
                    return (
                        <div className="SidebarHeader" style={hoverStyle}>
                            <div className="flex-between">
                                <SidebarHeaderTitle highlighted={hovering}/>
                                <SidebarHeaderNotifications  />
                            </div>
                            <UserItem 
                                username={'th3nathan'} 
                                highlighted={hovering} 
                                status={'active'}
                            />
                        </div>
                    );
                }}
            </Hoverable>

        );
    }
}

export default SidebarHeader;