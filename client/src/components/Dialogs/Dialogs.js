import React, {Component} from 'react'
import {connect} from 'react-redux'
import {cleanUserSearch, createDialog, loadDialog, loadMessages} from '../../actions/dialogActions'
import Dialog from '../Dialog'
import './Dialogs.css'
import Chat from './Chat'
import SearchUser from '../SearchUser'
import {Redirect} from 'react-router-dom'
import cyan from '@material-ui/core/colors/cyan'

import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper/Paper'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  grid: {
    flexGrow: '0',
    width: '100%',
    padding: theme.spacing.unit * 1
  },
  icon: {
    paddingRight: theme.spacing.unit,
    marginTop: -4
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  footer: {
    display: 'flex'
  },
  reTweet: {
    padding: '0.5em',
    display: 'flex',
    background: '#EF6C00',
    color: 'white',
    textShadow: '0px 1px #3d4e56'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: cyan[500]
  }
})

class Dialogs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      flag: false,
      dialog: '',
      newDialog: false,
      userList: false,
      exist: false
    }
  }

  componentWillMount () {
    const {user, dialogs, loadDialog} = this.props
    if (dialogs.length === 0) {
      loadDialog(user.id)
    }
  }

  handleCreateDialog = e => {
    e.preventDefault()
    if (this.state.flag) {
      this.setState({newDialog: true, flag: false})
    } else if (this.state.userList) {
      this.setState({newDialog: true, userList: false})
    } else {
      this.setState({newDialog: true})
    }
  };

  handleMessages = e => {
    const {loadMessages, cleanUserSearch} = this.props
    loadMessages(e.id)
    if (this.state.newDialog) {
      this.setState({
        flag: true,
        dialog: e,
        newDialog: false
      })
    } else if (this.state.userList) {
      this.setState({
        flag: true,
        dialog: e,
        userList: false
      })
    } else {
      this.setState({
        flag: true,
        dialog: e
      })
    }
    cleanUserSearch()
  };

  addUserToDialog = e => {
    const {cleanUserSearch} = this.props
    cleanUserSearch()
    this.setState({
      flag: false,
      newDialog: true,
      exist: true,
      dialog: e.target.value
    })
  };

  render () {
    const {user, dialogs, loadDialog, classes} = this.props
    const {flag, newDialog} = this.state
    if (user.length === 0) {
      return <Redirect to={`/`}/>
    }
    if (dialogs.length === 0) {
      loadDialog(user.id)
    }
    return (
      <div className="wrap">
        <div className="dialogs">
          {dialogs.map((dialog, index) =>
            <Paper key = {index} className={classes.paper} elevation={0}>
              <Dialog
                key = {dialog.id}
                dialog = {dialog}
                handleMessages = {this.handleMessages.bind(this)}
                user={user}
                addUserToDialog = {this.addUserToDialog.bind(this)}
              />
            </Paper>
          )}
          <button onClick={e => this.handleCreateDialog(e)}>
            Create new Dialog
          </button>
        </div>
        {flag && <Chat className="chat" user={user.id} currentDialog={this.state.dialog}/>}
        {newDialog &&
        <SearchUser
          exist={this.state.exist}
          dialog={this.state.dialog}
        />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    dialogs: state.dialogs,
    messages: state.messages,
    searchUser: state.searchUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadDialog: (id) => dispatch(loadDialog(id)),
    createDialog: (id, dialog) => dispatch(createDialog(id, dialog)),
    loadMessages: (id) => dispatch(loadMessages((id))),
    cleanUserSearch: () => dispatch(cleanUserSearch())
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Dialogs))