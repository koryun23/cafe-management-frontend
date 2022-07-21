import React from 'react';

class CloseButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className="btn btn-danger" onClick={this.props.onClick}>
                {this.props.buttonText}
            </button>
        );
    }
}

export default CloseButton;