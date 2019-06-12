import React from 'react';
import './css/DateCard.css'
import { connect } from 'react-redux'
import { Card, Button } from 'semantic-ui-react';
import { getBusinessDetails } from '../services/backend';

class RandomDateCard extends React.Component{

    state={
        currentDate: "",
    }

    componentDidMount(){
        this.randomDate()
    }

    componentDidUpdate(prevProps){
        if(prevProps.randomDates !== this.props.randomDates){
            this.randomDate()
        }
    }

    saveTheDate = () => {
        this.props.addDateEvent(this.state.currentDate[0])
    }

    randomNumber = () =>{
        var min=0; 
        var max=this.props.randomDates.length;  
        return Math.floor(Math.random() * (+max - +min)) + +min;
        }
    randomDate=()=>{
    const index = this.randomNumber()
    const businessID = this.props.randomDates[index].id
    getBusinessDetails(businessID).then(data => this.setState({currentDate: [...this.state.currentDate, data]})) 
    }

    dateLoaded=()=>{
        if(this.state.currentDate){
            return true
        }else{
            return false
        }
    }

    render(){
    return(
        <Card fluid id="dateCard" >
        { this.dateLoaded() ?
            <React.Fragment>
            <Card.Header id="dateCardHeader">{this.state.currentDate[0].name}
            <Card.Meta id="categories">{this.state.currentDate[0].categories.map(category => <span>{category.title}</span>)}</Card.Meta>
            </Card.Header>
                <div id="imageFrame">
                    <img id="image" src={this.state.currentDate[0].image_url} alt={this.state.currentDate[0].name}/>
                </div>
            <Card.Content id="cardInfo">
                <h4 id="link"><a href={this.state.currentDate[0].url} target="blank">Yelp Page</a>
                <br/>
                Rating: {this.state.currentDate[0].rating}
                </h4>
                <h5>{this.state.currentDate[0].location.display_address[0]}<br/>
                    {this.state.currentDate[0].location.display_address[1]}</h5>
            </Card.Content>
            <Button id="cardButton" className="ui button red" onClick={()=>this.randomDate()}>Reroll</Button>
            <Button id="cardButton" className="ui button red" onClick={()=>this.saveTheDate()}>Add To Date</Button>
            </React.Fragment>
            :
            null
            }
        </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        randomDates: state.date.list
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addDate: (data) => dispatch({type:"ADD_DATE", data: data}),
        addDateEvent: (data) => dispatch({type:"ADD_DATE_EVENT", data: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RandomDateCard)