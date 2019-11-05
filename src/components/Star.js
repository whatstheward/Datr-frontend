import React from 'react';
import { Icon } from 'semantic-ui-react';
import {updateRating} from '../services/backend'

const Star = (props) => {   

    return(
        <Icon className="rating" 
        name={props.outlined ? "star outline" : "star"} 
        size="big" 
        color={props.outlined ? null : "yellow"}
        onClick={null} />
    )
}

export default Star