
import * as React from 'react';
import './SidebarHeaderNotifications.css';
import Hoverable from './Hoverable';
import { HoverState } from './interfaces';

class SidebarHeaderNotifications extends React.Component {
    render() {
        return (
            <Hoverable render={
            (state: HoverState) => {    
                let style = state.hovering ? {'color': 'white'} : {'color': '#B7AEB5'};
                style['padding'] = '5px';
                return (
                    <i 
                        style={style} 
                        className="fa fa-bell-o SidebarHeaderNotifications-bell" 
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