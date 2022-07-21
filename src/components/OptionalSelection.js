import React from 'react';
import '../css/OptionalSelection.css';
class OptionalSelection extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form>
                {
                    this.props.options.map(option => (
                        <div>
                            <input value={option.value}
                                type="checkbox"
                                selected={option.isSelected}
                                key={option.index} 
                                onChange={option.onChange}
                                className="form-check-input custom-checkbox"/>
                            <label>{option.text}</label>
                        </div>
                    ))
                }
            </form>
        );
    }
}

export default OptionalSelection;