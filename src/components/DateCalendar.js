import React from 'react'
import {connect} from 'react-redux'
import { getCurrentUserDates } from '../services/backend';
import DateView from './DateView'
import './css/DateCalendar.css'

const DateCalendar = props =>{ 
        return(
            <div id="carouselFrame">
                <div id="calendar">
                    {props.userDates.length > 0 ? props.userDates.map(date=> <DateView date={date}/>) 
                    : 
                    null}
                </div>
            </div>
        )
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