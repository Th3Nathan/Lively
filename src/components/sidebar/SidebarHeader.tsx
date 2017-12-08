import * as React from 'react';
import Hoverable from '../wrappers/Hoverable';
import SidebarHeaderTitle from './SidebarHeaderTitle';
import SidebarHeaderNotifications from './SidebarHeaderNotifications';
import UserItem from './UserItem';
import './SidebarHeader.css';

interface SidebarHeaderProps {
    status: string;
    active: string; 
    openNotificationsModal?: () => void;
}

export class SidebarHeader extends React.Component<SidebarHeaderProps, {}> {
    getStyle = (hovering: Boolean) => (
        hovering ? {'background': '#3E313C'} : {'background': '#4d394b'}
    )

    public render() {
        return (
            <Hoverable>
                {({hovering}: {hovering: boolean}) => {
                    let hoverStyle = this.getStyle(hovering);
                    return (
                        <div className="SidebarHeader" style={hoverStyle}>
                            <div className="flex-between">
                                <SidebarHeaderTitle highlighted={hovering}/>
                                <SidebarHeaderNotifications status="snoozing"  />
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