import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function OrderFilters(props) {
    const [filter = 'ALL', setFilter] = useState(); 

    const handleSelectionChange = (event) => {
        setFilter(event.target.name);
    }

    const handleConfirmClick = () => {
        console.log(filter);
        props.onFilterChange(filter);
        props.onClose();
    }

    return (
        <div className='update-box' style={{height: '400px'}}>
            <button className="close-button" onClick={props.onClose}>
                {<FontAwesomeIcon icon={faClose} size="lg"/>}
            </button>
            <div className="form-group">
                <label className="status-label">All</label>
                <input type="radio"  
                       name="ALL" 
                       value="All" 
                       checked={filter==="ALL"} 
                       onChange={(event) => handleSelectionChange(event)}/>
            </div>
            <hr />
            <div className="form-group">
                <label className="status-label">Closed</label>
                <input type="radio" 
                       className="form-group" 
                       name="CLOSED" 
                       value="Closed" 
                       checked={filter==="CLOSED"} 
                       onChange={(event) => handleSelectionChange(event)} />
            </div>
            <hr />
            <div>
                <label className="status-label">Cancelled</label>
                <input type="radio" 
                       className="form-group" 
                       name="CANCELLED" 
                       value="Cancelled" 
                       checked={filter==="CANCELLED"} 
                       onChange={(event) => handleSelectionChange(event)}/>
            </div>
            <hr />
            <div>
                <label className="status-label">Open</label>
                <input type="radio" 
                       className="form-group" 
                       name="OPEN" 
                       value="Open" 
                       checked={filter==="OPEN"} 
                       onChange={(event) => handleSelectionChange(event)}/>
            </div>
            <button className="update-confirm" onClick={handleConfirmClick} style={{height: '40px'}}>Confirm</button>
        </div>
    );
}