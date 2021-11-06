import React from 'react'
import "../../styles/Shared.css"

const MoreUsers = (props) => {
    
    return (
        <div className="more-users" src={props.imgUrl} alt="Avatar">
            <p className="more-users-counter">+ 42</p>
        </div>
    )


}


export default MoreUsers