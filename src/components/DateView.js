import React from 'react'
import { connect} from 'react-redux'
import { Card, Image, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { deleteUserDate } from '../services/backend';
import EditBtn from './EditButton'
import RatingBar from './RatingBar';


const DateView = (props) => {

    const datePast = () => new Date(props.date.time) <  new Date()

    return(
        <Card id="dateViewCard">
        <Card.Content>
            <Card.Header>
            Date on
            <br/>
            {props.date.time.substring(props.date.time.indexOf(',')+1)}
            </Card.Header>
            <h4>
                With: {props.date.partners.map((partner, i)=> {return(<li key={i}>{
                    partner.name}
                    </li>)})}
            </h4>
                {props.date.events.map((event, i) => {
                    return(
                        <Segment key={i} id="dateEvent">
                        <h4>{event.name}</h4>
                        <Image src={event.image_url} alt={event.name} />
                        </Segment>
                )})}
        </Card.Content>
            <RatingBar rating={props.date.rating} datePast={datePast()} date={props.date}/>
        { props.currentUser.id === props.user.id ?
        <Card.Content extra>
            { datePast() ? 
            null 
            :
            <EditBtn action={props.editDate} item={props.date} />}
        <Button id="deleteBtn" onClick={()=>{ 
            props.deleteUserDate(props.date.id)
            deleteUserDate(props.date.id)}}>Delete</Button>
        </Card.Content>
        :
        null
        }
        </Card>
    )
}

const mapStateToProps = state => {
    return{
        currentUser: state.user.currentUser,
        user: state.user.viewUser
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        deleteUserDate: data => dispatch({type:"DELETE_USER_DATE", data: data}),
        editDate: data => dispatch({type:"EDIT_DATE", data: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateView)