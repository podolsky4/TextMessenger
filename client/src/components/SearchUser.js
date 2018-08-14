import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from './Loader/Loader'
import {findUsers} from '../actions/userActions'
import {createDialog} from "../actions/dialogActions";

class SearchUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      flag: false
    }
  }
  myFunction (e) {
    if (e.key === 'Enter') {
      this.onSubmit(e)
    } else {
      this.setState({
        text: e.target.value
      })
    }
  }

  createChatWithUser (e) {
    const {user, createDialog} = this.props
    console.log('e.target.value', e.target.value)
    console.log('user', user)
    createDialog(user, e.target.value)
  }
  onSubmit = e => {
    const {findAllUsers} = this.props
    e.preventDefault()
    findAllUsers(this.state.text)
  }
  render () {
    const {fetching, searchUser} = this.props
    return (
      <div className='search_user'>
        <form className='search_form' onSubmit={e => this.onSubmit(e)}>
          <input
            className='search_input'
            type="text"
            onChange={event => this.myFunction(event)}
          />
          <button>Find</button>
        </form>
        {fetching && <Loader/>}
        {!fetching && searchUser.map(user => <div key={user.id}>
          <a>
            {user.email}
          </a>
          <button value={user.id} onClick={e => this.createChatWithUser(e)}>Add</button>
        </div>)}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    fetching: state.loader.fetching,
    searchUser: state.searchUser,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    findAllUsers: (str) => dispatch(findUsers(str)),
    createDialog: (user,secondUser)=> dispatch(createDialog(user, secondUser))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchUser)
