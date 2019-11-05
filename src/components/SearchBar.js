import React from 'react'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Search, Grid, Header, Segment } from 'semantic-ui-react';
import { searchUsers, getUserProfile } from '../services/backend';


class SearchBar extends React.Component {

    state = { 
            isLoading: false, 
            results: [], 
            value: '',
            redirect: false,
            selected: ""
        }
    handleResultSelect = (e, { result }) => {getUserProfile(result.id).then(data => {
                                            this.setState({redirect: true})
                                            this.props.storeViewUser(data)
                                            this.props.history.push(`/profile/${this.props.searchresult.id}`)})
                                            }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value: value })
        searchUsers(value).then(data => this.setState({isLoading:false, results: data.users}))
        
    }

    render(){
        return(
        <Grid id="search">
        <Grid.Column width={6}>
            <Search 
            loading={this.state.isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 100, {
            loading: true,
            })}
            results={this.state.results}
            value={this.state.value}
            {...this.props}/>
                </Grid.Column>
                { this.state.results > 0 ?
                <Grid.Column width={10}>
                <Segment>
                    <Header>State</Header>
                    <pre style={{ overflowX: 'auto' }}>
                    {JSON.stringify(this.state, null, 2)}
                    </pre>
                    <Header>Options</Header>
                    <pre style={{ overflowX: 'auto' }}>
                    {JSON.stringify(this.state.results, null, 2)}
                    </pre>
                </Segment>
                </Grid.Column>
                :
                null
                }
            </Grid>
        )
        }
    }


const mapStateToProps = state => {
    return{
        searchresult: state.user.viewUser
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        storeViewUser: data => dispatch({type:"FETCH_USER_PROFILE", data: data})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBar))