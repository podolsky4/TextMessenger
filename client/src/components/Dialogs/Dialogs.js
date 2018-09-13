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
import Button from '@material-ui/core/Button/Button'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  footer: {
    display: 'flex'
  },
  avatar: {
    backgroundColor: cyan[500]
  },
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '32px',
    background: '#009688',
    minHeight: '96vh'
  },
  dialogs: {
    flexShrink: 1,
    flexBasis: 1,
    flexGrow: 1,
    margin: '0 auto',
    maxWidth: 320,
    padding: '0 1%'
  },
  paper: {
    width: '100%',
    margin: '0 auto 0 0'
  },
  button: {
    padding: theme.spacing.unit / 2,
    margin: theme.spacing.unit,
    marginLeft: 0,
    lineHeight: 1,
    background: theme.palette.secondary.main,
    fontSize: 12
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  chat: {
    maxWidth: 620
  }
})

class Dialogs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      flag: false,
      dialog: null,
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

  handleMessages = dialog => {
    const {loadMessages} = this.props
    this.setState({dialog: dialog})
    loadMessages(dialog.id)
  };

  addUserToDialog = (e, dialogId) => {
    const {cleanUserSearch} = this.props
    e.stopPropagation()
    cleanUserSearch()
    this.setState({
      flag: false,
      newDialog: true,
      exist: true,
      dialogId: dialogId
    })
  };

  render () {
    const {user, dialogs, loadDialog, classes, match} = this.props
    const {newDialog, exist, dialog, dialogId} = this.state
    if (!user.id) {
      return <Redirect to={`/`}/>
    }
    if (dialogs.length === 0) {
      loadDialog(user.id)
    }

    if (dialog && +match.params.dialogId !== dialog.id) {
      return <Redirect to={`/dialogs/${dialog.id}`}/>
    }

    return (
      <div className={classes.wrap}>
        <div className={classes.dialogs}>
          {dialogs.map((dialog, index) =>
            <Paper key = {index} className={classes.paper} elevation={0}>
              <Dialog
                key = {dialog.id}
                dialog = {dialog}
                handleMessages = {this.handleMessages.bind(this)}
                user={user}
                addUserToDialog = {(e) => this.addUserToDialog.bind(this, e, dialog.id)()}
              />
            </Paper>
          )}
          <Button onClick={e => this.handleCreateDialog(e)}
                  variant="contained" type="submit" color="primary" className={classes.button}>
            new Dialog
          </Button>
        </div>
        {dialog && <Chat className={classes.chat} user={user.id} currentDialog={dialog}/>}
        {newDialog &&
        <SearchUser
          exist={exist}
          dialog={dialogId}
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