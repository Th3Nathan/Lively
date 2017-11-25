import * as React from 'react';
import { SidebarHeaderProps } from './interfaces';
import SidebarHeaderTitle from './SidebarHeaderTitle';
import SidebarHeaderNotifications from './SidebarHeaderNotifications';
import UserItem from './UserItem';
import Hoverable from './Hoverable';
import { HoverState } from './interfaces';
import './SidebarHeader.css';

export class SidebarHeader extends React.Component<SidebarHeaderProps, {}> {
    constructor(props: SidebarHeaderProps) {
        super(props);
    }

    public render() {
        return (
            <Hoverable 
                render={
                    (state: HoverState) => {
                        let hovering = state.hovering;
                        let hoverStyle;
                        if (hovering) {
                            hoverStyle = {'background': '#3E313C'}
                        } else {
                            hoverStyle = {'background': '#4d394b'}
                        }
                        return (
                            <div className="SidebarHeader" style={hoverStyle}>
                                <SidebarHeaderTitle highlighted={hovering}/>
                                <SidebarHeaderNotifications />
                                <UserItem hovering={hovering} status={'active'}/>
                            </div>
                        );
                    }
                }
            />

        );
    }
}

export default SidebarHeader;