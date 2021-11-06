import React from 'react'
import "../../styles/Shared.css"

const UserImage = (props) => {
    
    return (
        <img className="user-image" src={props.imgUrl} alt="Avatar"/>
    )


}


export default UserImage