import * as React from 'react';
import { SidebarHeaderProps } from './interfaces';
import SidebarHeaderTitle from './SidebarHeaderTitle';
import SidebarHeaderNotifications from './SidebarHeaderNotifications';
import UserItem from './UserItem';
import Hoverable from './Hoverable';
import { HoverState } from './interfaces';

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
                        return (
                            <div className="SidebarHeader">
                                <SidebarHeaderTitle hovering={hovering}/>
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