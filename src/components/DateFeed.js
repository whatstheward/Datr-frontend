import React from 'react'
import DateCard from './DateCard'
import { connect } from 'react-redux'
import { Feed } from 'semantic-ui-react';
import './css/DateFeed.css'

const DateFeed = (props) => {
    return(
            <Feed id="feedContainer">
                <DateCard />
                <DateCard />
                <DateCard />
                <DateCard />
            </Feed>
    )
}

export default connect()(DateFeed)