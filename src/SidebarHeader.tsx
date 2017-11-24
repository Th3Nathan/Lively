import * as React from 'react';
import { SidebarHeaderProps } from './interfaces';
import SidebarHeaderTitle from './SidebarHeaderTitle';
import SidebarHeaderNotifications from './SidebarHeaderNotifications';
import UserItem from './UserItem';
import Hoverable from './Hoverable';

interface PS {
    hovering: Boolean;
}

export class SidebarHeader extends React.Component<SidebarHeaderProps, {}> {
    constructor(props: SidebarHeaderProps) {
        super(props);
    }


    public render() {
        return (
            <Hoverable render={(state : PS) => {
                    let hovering = state.hovering;
                    return (
                        <div className="SidebarHeader">
                            <SidebarHeaderTitle hovering={hovering}/>
                            <SidebarHeaderNotifications />
                            <UserItem hovering={hovering} status={'active'}/>
                        </div>
                    )
                }}></Hoverable>
        )
    }
}

export default SidebarHeader;