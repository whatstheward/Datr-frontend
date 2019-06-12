import React from 'react'
import { connect} from 'react-redux'
import { Card, Image, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { deleteUserDate } from '../services/backend';


const DateView = (props) => {

    return(
        <Card id="dateViewCard">
        <Card.Content>
            <Card.Header>Date on {props.date.time.substring(0, props.date.time.indexOf(','))}
            <br/>
            @{props.date.time.substring(props.date.time.indexOf(',')+1)}
            </Card.Header>
            <h4>
                With: {props.date.partners.map(partner=> <li>{partner.name}</li>)}
            </h4>
                {props.date.events.map(event => {
                    return(
                        <Segment raised>
                        <h4>{event.name}</h4>
                        <Image src={event.image_url} alt={event.name} />
                        </Segment>
                )})}
        </Card.Content>
        <Card.Content extra>
        <Link to="/date_randomizer" 
            className="ui button"
            onClick={()=>{
            props.editDate(props.date)}}>Edit</Link>
        <Button onClick={()=>{ 
            props.deleteUserDate(props.date.id)
            deleteUserDate(props.date.id)}}>Delete</Button>
        </Card.Content>
        </Card>
    )
}

const mapDispatchToProps = dispatch =>{
    return{
        deleteUserDate: data => dispatch({type:"DELETE_USER_DATE", data: data}),
        editDate: data => dispatch({type:"EDIT_DATE", data: data})
    }
}

export default connect(null, mapDispatchToProps)(DateView)