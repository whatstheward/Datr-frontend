import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux'
import _ from 'lodash'
import { Grid, Container, Form, Dropdown, Button } from 'semantic-ui-react';
import './css/DateRandomizer.css'
import { getRandomDate, getInterests } from '../services/backend'
import RandomDateCard from './RandomDateCard';
import DateCheckOut from './DateCheckOut';

class DateRandomizer extends React.Component {

    state={
        partners: [],
        interests:[],
        startDate: "",
        activities: []
    }

    componentDidMount(){
        getInterests().then(this.props.storeInterests)
    }
    
    handlePartnerSelect = (e, value) => {
        this.setState({partners: value})
        this.props.storePartners(value)
    }

    handleInterestSelect = (e, value) => {
        let newValue
        if(e.target.className === "delete icon"){
            newValue = value
        }else{
            newValue = this.state.interests.concat(value[value.length-1])}
        this.setState({interests: newValue})
    }

    handleChange=(date)=>{
        this.setState({startDate: date})
        this.props.storeDateTime(date)
    }

    handleSubmit = (e) => {
        this.state.interests.forEach(interest =>{
            getRandomDate(interest).then(this.props.storeBusinesses)})
            this.setState({interests: []})
    }

    render(){
        return(
            <Grid>
                <Grid.Column width={4}/>
                <Grid.Column width={8}>
                    <Container id="dateContainer">
                        <h2>Welcome to the Date Randomizer</h2>
                        <Form id="dateForm" onSubmit={(e)=>this.handleSubmit(e)}>
                            <Form.Group id="group">
                            <Form.Field>
                            <label>With whom?</label>
                            <Dropdown
                                onChange={(e, { value })=>this.handlePartnerSelect(e, value)}
                               id="multiSelect"
                                placeholder='Interests'
                                fluid
                                multiple
                                search
                                selection
                                options={_.map(this.props.user.partners, function(value){
                                return {key: value, text: value.name, value: value}}
                            )}
                            />
                            </Form.Field>
                            <Form.Field>
                            <label>When?</label>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                            <label>What?</label>
                            <Dropdown
                                onChange={(e, { value })=>this.handleInterestSelect(e, value)}
                                id="multiSelect"
                                placeholder='Interests'
                                value={this.state.interests}
                                fluid
                                multiple
                                search
                                selection
                                options={_.map(this.props.interests, function(value){
                                return {key: value.id, text: value.name, value: value.name}
                            })}
                            />
                            </Form.Field>
                            </Form.Group>
                            <Button type="submit">Get Date</Button>
                        </Form>
                        <Grid.Row id="dateCardContainer">
                        <Grid.Column id="dateColumn" width={8}>
                        {this.props.dates.length > 2 ?
                            <RandomDateCard />
                        :
                        null
                        }
                        </Grid.Column>
                        <Grid.Column id="dateColumn" width={8}>
                        {this.props.dates.length > 2 ?
                            <RandomDateCard />
                        :
                        null
                        }
                        </Grid.Column>
                        </Grid.Row>
                    </Container>
                </Grid.Column>
                <Grid.Column width={4}>
                    <DateCheckOut />
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return{
    user: state.user.currentUser,
    dates: state.date.list,
    currentDate: state.buildDate,
    interests: state.interest.list
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        storeBusinesses: (data) => dispatch({type: "FETCH_BUSINESS", data: data}),
        storePartners: (data) => dispatch({type:"ADD_PARTNER", data: data}),
        storeDateTime: (data) => dispatch({type:"ADD_DATE_TIME", data: data}),
        storeInterests: (data) => dispatch({type:"FETCH_INTERESTS", data: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateRandomizer)