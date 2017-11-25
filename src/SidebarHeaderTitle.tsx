
import * as React from 'react';
import './SidebarHeaderTitle.css';
export interface Props {
    highlighted: Boolean;
}

class SidebarHeaderTitle extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        let style = this.props.highlighted ? {'color': 'white'} : {'color': '#B7AEB5'};
        return (
            <div className="SidebarHeaderTitle">
                <div className="SidebarHeaderTitle-title overflow-ellipsis">
                    Lively
                </div>
                <div style={style} className="SidebarHeaderTitle-v">
                    <i className="fa fa-angle-down" aria-hidden="true" />
                </div>
            </div>
        );
    }
}

export default SidebarHeaderTitle;