import React from 'react'
import {connect} from 'react-redux'
import { getCurrentUserDates } from '../services/backend';
import DateView from './DateView'
import './css/DateCalendar.css'

class DateCalendar extends React.Component{

    componentDidMount(){
        getCurrentUserDates().then(data => {if(data.user_dates > 0){
            this.props.userDates(data)
        }})
    }

    renderDates = () => {
        this.props.userDates.map(date => <DateView date={date} />)
    }

    render(){
        return(
            <div id="carouselFrame">
                <div id="calendar">
                    {this.props.userDates.length > 0 ? this.props.userDates.map(date=> <DateView date={date}/>) 
                    : 
                    null}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        storeUserDates: (data) => dispatch({type:"FETCH_USER_DATES", data: data})
    }
}

const mapStateToProps = state => {
    return{
        userDates: state.userDates.currentDates
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateCalendar)