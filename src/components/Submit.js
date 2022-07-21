import React from 'react';

class Submit extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(event);
    }

    render() {
        return (
            <input type="submit"
            value={this.props.value}
            onClick={this.handleSubmit} 
            className="btn btn-primary custom-submit-button"/>
        );
    }
}

export default Submit;