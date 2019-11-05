import React from 'react';
import { Icon } from 'semantic-ui-react';
import Star from './Star'

const RatingBar = props => {

    return(
        <div>
        {new Array(5).fill().map((x,i)=> <Star outlined={(i+1>props.rating)} index={i+1} date={props.date}/>)}
        </div>
    )
}

export default RatingBar