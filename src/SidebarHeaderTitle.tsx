
import * as React from 'react';
import './SidebarHeaderTitle.css';
export interface Props {
    hovering: Boolean;
}

class SidebarHeaderTitle extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <div className="SidebarHeaderTitle">
                <div className="SidebarHeaderTitle-title overflow-ellipsis">
                    Lively
                </div>
                <span>
                    <i className="fa fa-angle-down" aria-hidden="true" />
                </span>
            </div>
        );
    }
}

export default SidebarHeaderTitle;