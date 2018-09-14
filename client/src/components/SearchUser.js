import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from './Loader/Loader'
import {findUsers} from '../actions/userActions'
import {addUserToExistDialog, createDialog} from '../actions/dialogActions'
import {withStyles} from '@material-ui/core/styles/index'
import classnames from 'classnames'
import Button from '@material-ui/core/Button/Button'
import {Input} from '@material-ui/core/umd/material-ui.production.min'

const styles = theme => ({
  search_input: {
    width: '78.2%',
    '&:after': {
      borderBottom: '1px solid' + theme.palette.primary.main
    }
  },
  button: {
    color: theme.palette.primary.dark,
    marginTop: +7,
    width: 90,
    right: -1
  },
  buttonAdd: {
    color: theme.palette.primary.dark,

    width: 90,
    right: -2,
    marginTop: 0,
    paddingLeft: 7,
    paddingRight: 7
  },
  foundUser: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottom: '1px solid' + theme.palette.background.dark
  },
  search_form: {
    alignItems: 'baseline',
    justifyContent: 'space-between',
    display: 'flex',
    padding: '4px 4px 13px 4px',
    margin: 6
  }
})

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
    const {user, createDialog, exist, dialog, existDialod} = this.props
    if (exist) {
      existDialod(dialog, user.id, e.target.value)
    } else {
      createDialog(user, e.target.value)
    }
  }

  onSubmit = e => {
    const {findAllUsers} = this.props
    e.preventDefault()
    findAllUsers(this.state.text)
    this.setState({flag: true})
  }

  render () {
    const {fetching, searchUser, classes} = this.props

    return (
      <div className={classes.searchUser}>
        <form className={classnames(classes.search_form, 'search_form')} onSubmit={e => this.onSubmit(e)}>
          <Input
            className={classnames(classes.search_input, 'search_input')}
            type="text"
            onChange={event => this.myFunction(event)}
          />
          <Button variant="outlined"
                  color='primary'
                  type="submit" className={classes.button}>
            Find
          </Button>
        </form>
        {fetching && <Loader/>}
        {!fetching && searchUser.map(user =>
        <div key={user.id}
             className={classnames(classes.foundUser)}>
          <a>
            {user.email}
          </a>
          <Button variant="flat" className={classes.buttonAdd} value={user.id} onClick={e => this.createChatWithUser(e)}>Add</Button>
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
    createDialog: (user, secondUser) => dispatch(createDialog(user, secondUser)),
    existDialod: (dialog, user, newUser) => dispatch(addUserToExistDialog(dialog, user, newUser))
  }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SearchUser))
