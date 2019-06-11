import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux'
import _ from 'lodash'
import { Grid, Container, Form, Dropdown, Button } from 'semantic-ui-react';
import './css/DateRandomizer.css'
import { getRandomDate } from '../services/backend'
import DateCard from './DateCard';

class DateRandomizer extends React.Component {

    state={
        partners: [],
        interests: [],
        startDate: new Date()
    }

    
    handlePartnerSelect = (e, value) => {
        this.setState({partners:[value]})
    }
   
    handleInterestSelect = (e, value) => {
        const newValue = value.join(",").toLowerCase().replace(/\s/g, '')
        this.setState({interests: newValue})
    }

    handleChange=(date)=>{
        this.setState({startDate: date})
    }

    handleSubmit = (e) => {
        // e.preventDefault()
        this.props.storePartners(this.state.partners)
        this.props.storeDateTime(this.state.startDate)
        const interests = this.state.interests
        getRandomDate(interests).then(this.props.storeBusinesses)
    }

    render(){
        return(
            <Grid>
                <Grid.Column width={3}/>
                <Grid.Column width={10}>
                    <Container id="dateContainer">
                        <h2>Welcome to the Date Randomizer</h2>
                        <Form id="dateForm" onSubmit={(e)=>this.handleSubmit(e)}>
                            <Form.Group id="group">
                            <Form.Field>
                            <label>With whom?</label>
                            <Dropdown
                                onChange={(e, { value })=>this.handlePartnerSelect(e, value)}
                                id="multiSelect"
                                placeholder='Partners'
                                fluid
                                multiple
                                search
                                selection
                                options={_.map(this.props.user.partners, function(value){
                                return {key: value.id, text: value.name, value: value.id}
                            })}
                            />
                            </Form.Field>
                            <Form.Field>
                            <label>When?</label>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                showTimeSelect
                                dateFormat="Pp"
                                />
                            </Form.Field>
                            <Form.Field>
                            <label>What?</label>
                            <Dropdown
                                onChange={(e, { value })=>this.handleInterestSelect(e, value)}
                                id="multiSelect"
                                placeholder='Interests'
                                fluid
                                multiple
                                search
                                selection
                                options={_.map(this.props.user.interests, function(value){
                                return {key: value.id, text: value.interest, value: value.interest}
                            })}
                            />
                            </Form.Field>
                            </Form.Group>
                            <Button type="submit">Get Date</Button>
                        </Form>
                        <Grid.Row id="dateCardContainer">
                        <Grid.Column id="dateColumn" width={8}>
                        {this.props.dates.length > 2 ?
                            <DateCard />
                        :
                        null
                        }
                        </Grid.Column>
                        <Grid.Column id="dateColumn" width={8}>
                        {this.props.dates.length > 2 ?
                            <DateCard />
                        :
                        null
                        }
                        </Grid.Column>
                        </Grid.Row>
                    </Container>
                    <Grid.Column width={3}/>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return{
    user: state.user.currentUser,
    dates: state.date.list
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        storeBusinesses: (data) => dispatch({type: "FETCH_BUSINESS", data: data}),
        storePartners: (data) => dispatch({type:"ADD_PARTNER", data: data}),
        storeDateTime: (data) => dispatch({type:"ADD_DATE_TIME", data: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateRandomizer)