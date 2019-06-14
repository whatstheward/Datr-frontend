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
        this.props.addDateEvent(this.state.currentDate)
    }

    randomNumber = () =>{
        var min=0; 
        var max=this.props.randomDates.length;  
        return Math.floor(Math.random() * (+max - +min)) + +min;
        }
    randomDate=()=>{
    const index = this.randomNumber()
    const businessID = this.props.randomDates[index].id
    if(this.props.datePlan.length > 0 && this.props.datePlan.filter(a => a.id === businessID).length > 0){
        this.randomDate()
    }else{
    getBusinessDetails(businessID).then(data => this.setState({currentDate: data})) 
        }
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
            <Card.Header id="dateCardHeader">{this.state.currentDate.name}
            <Card.Meta id="categories">{this.state.currentDate.categories ? 
            this.state.currentDate.categories.map(category => <span>{category.title}</span>)
            :
            null}</Card.Meta>
            </Card.Header>
                <div id="imageFrame">
                    <img id="image" src={this.state.currentDate.image_url} alt={this.state.currentDate.name}/>
                </div>
            <Card.Content id="cardInfo">
                <h4 id="link"><a href={this.state.currentDate.url} target="blank">Yelp Page</a>
                <br/>
                Rating: {this.state.currentDate.rating}
                </h4>
                {
                    this.state.currentDate.location.display_address ?
                    <h5>
                    {this.state.currentDate.location.display_address[0]}<br/>
                    {this.state.currentDate.location.display_address[1]}</h5>
                    :
                    null
                }
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
        randomDates: state.date.list,
        datePlan: state.buildDate.activities
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addDate: (data) => dispatch({type:"ADD_DATE", data: data}),
        addDateEvent: (data) => dispatch({type:"ADD_DATE_EVENT", data: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RandomDateCard)