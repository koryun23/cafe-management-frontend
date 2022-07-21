import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <div className="form-group custom-form">
                <label>{this.props.label}</label>
                <input type={this.props.type}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    onChange={this.handleChange}
                    className="form-control" 
                    value={this.props.value} />
            </div>
        );
    }
}

export default Input;