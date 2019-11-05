import React from 'react'
import { Link } from 'react-router-dom'

const EditBtn = (props) => {

    return(
        <Link id="editBtn" to="/date_randomizer" 
            className="ui button"
            onClick={()=>{
            props.action(props.item)}}>Edit</Link>
    )
}

export default EditBtn