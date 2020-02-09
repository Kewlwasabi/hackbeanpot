import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

class DensityComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    getColor() {
        if(this.props.occupancy < 0.5) {
            return "success";
        }
        if(this.props.occupancy < 0.8) {
            return "warning";
        }
        else {
            return "danger";
        }
    }

    render() {
        return (
            <div>
                <h2>{this.props.roomName}</h2>
                <Button color={this.getColor()}>{this.props.cur} / {this.props.max}</Button>
            </div>
        );
    }
}

export default DensityComponent;