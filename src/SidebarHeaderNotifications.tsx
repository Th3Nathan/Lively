
import * as React from 'react';
import './SidebarHeaderNotifications.css';
import Hoverable from './Hoverable';
import { HoverState } from './interfaces';

export interface SidebarHeaderNotificationsProps {
    status: String;
}

class SidebarHeaderNotifications extends React.Component<SidebarHeaderNotificationsProps, {}> {
    constructor(props: SidebarHeaderNotificationsProps) {
        super(props);
    }
    render() {
        let fontAwesome = this.props.status === 'snoozing' ? 'clock-o' : 'bell-o';
        return (
            <Hoverable render={
            (state: HoverState) => {    
                let style = state.hovering ? {'color': 'white'} : {'color': '#a09a9f'};
                style['padding'] = '5px';
                return (
                    <i 
                        style={style} 
                        className={`fa fa-${fontAwesome} SidebarHeaderNotifications-bell`}
                        aria-hidden="true"
                    />
                )
                }
            }
            />
        );
    }
}

export default SidebarHeaderNotifications;