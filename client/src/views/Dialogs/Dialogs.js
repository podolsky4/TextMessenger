import React, {Component} from 'react'
import {connect} from 'react-redux'
import {cleanUserSearch, createDialog, loadDialog, loadMessages} from '../../actions/dialogActions'
import Dialog from './Dialog'
import './Dialogs.css'
import Chat from './Chat'
import SearchUser from './SearchUser'
import {Redirect} from 'react-router-dom'

import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper/Paper'
import Button from '@material-ui/core/Button/Button'
import PlusIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import * as primary from '@material-ui/core/styles/createPalette'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  footer: {
    display: 'flex'
  },
  avatar: {
    backgroundColor: theme.palette.background.main
  },
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '32px',
    background: '#009688',
    minHeight: '96vh',
      '@media (max-width: 715px)': {
          flexDirection: 'column',
      }
  },
  dialogs: {
    marginTop: 80,
    flexShrink: 1,
    flexBasis: 1,
    flexGrow: 1,
    maxWidth: 480,
    minWidth: 240,
    margin: '0 auto 0 auto',
      '@media (max-width: 1300px)': {
          flexDirection: 'column',
          maxWidth: 300,
          minWidth: 280,
      },
  },
  paper: {
    width: '100%',
    margin: '1px 0'
  },
  button: {
    padding: 8,
    margin: theme.spacing.unit,
    marginLeft: 0,
    lineHeight: 1,
    background: theme.palette.secondary.main,
    fontSize: 12,
    alignItems:'center',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  chat: {
    maxWidth: 620
  },
  searchUser: {
    flexShrink: 1,
    flexBasis: 1,
    flexGrow: 1,
    margin: '0 auto',
    maxWidth: 520,
    padding: '0 1%',
    background: theme.palette.background.main
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
    if (dialogs === null) {
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
    this.setState({dialog: dialog, newDialog:false})
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
closeable (e){
    const {cleanUserSearch} = this.props
    cleanUserSearch()
    this.setState({newDialog: false})
}
  render () {
    const {user, dialogs, loadDialog, classes, match} = this.props
    const {newDialog, exist, dialog, dialogId} = this.state
    if (!user.id) {
      return <Redirect to={`/`}/>
    }
    if (dialogs === null) {
      loadDialog(user.id)
    }

    if (dialog && +match.params.dialogId !== dialog.id) {
      return <Redirect to={`/dialogs/${dialog.id}`}/>
    }

    return (
      <div className={classes.wrap}>
        <div className={classes.dialogs}>
          {dialogs != null && dialogs.map((dialog, index) =>
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
          {newDialog &&
          <Paper color={primary.dark}>
            <SearchUser exist={exist}
                        dialog={dialogId}
                        className={classes.searchUser}
            />
          </Paper>
          }
          <Button onClick={e => this.handleCreateDialog(e)}
                  variant="contained" type="submit" color="primary" className={classes.button}>
              <PlusIcon style={{marginRight: 4}}/>
            new Dialog
          </Button>
          {newDialog &&
          <Button onClick={(e) => this.closeable(e)}
                  variant="outlined" type="close" color="primary" style={{marginLeft: '6px'}}>
            close
          </Button>
          }
        </div>
        {dialog && <Chat className={classes.chat} user={user.id} currentDialog={dialog}/>}
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