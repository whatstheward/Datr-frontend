import React from 'react'
import {connect} from 'react-redux'
import DateView from './DateView'
import './css/DateCalendar.css'
import { getCurrentUserDates } from '../services/backend';

class DateCalendar extends React.Component{ 

    componentDidMount(){
            
        getCurrentUserDates(this.props.user.id).then(data => this.props.storeUserDates(data.user_dates))
    }

    componentDidUpdate(prevProps){
        if(prevProps.user.id !== this.props.user.id && this.props.token){    
        getCurrentUserDates(this.props.user.id).then(data => this.props.storeUserDates(data.user_dates))
        }
        // if(prevProps.userDates !== this.props.userDates){
        // getCurrentUserDates(this.props.user.id).then(data => this.props.storeUserDates(data.user_dates))            
    
    }
    
    

        render(){
            if(this.props.token){
            return(
            <div id="carouselFrame">
                <div id="calendar">
                    {this.props.userDates.length > 0 ? this.props.userDates.map(date=> <DateView date={date}/>) 
                    : 
                    null}
                </div>
            </div>
        )
        }else{
            return(
                <div></div>
            )
        }
    }
}
const mapDispatchToProps = dispatch => {
    return{
        storeUserDates: (data) => dispatch({type:"FETCH_USER_DATES", data: data})
    }
}

const mapStateToProps = state => {
    return{
        userDates: state.userDates.currentDates,
        user: state.user.viewUser,
        token: state.session.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateCalendar)