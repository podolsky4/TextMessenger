import React from 'react'
import { webSocketDialog } from '../actions/ws'
import connect from 'react-redux/es/connect/connect'
import { addDialogFromWs, addMessageFromWs } from '../actions/wsActions'
import { loadUserNotification } from '../actions/userActions'

class WebSocketHandler extends React.Component {
  componentDidMount () {
    const {addMessage, addDialog, reloadNotification} = this.props
    webSocketDialog(message => {
      const {dialogId} = this.props.match.params
      switch (message.type) {
        case 'NEW_MESSAGE':
          console.log('dialogId', dialogId)
          if (dialogId) {
            addMessage(message.messageToFront)
          } else {
            reloadNotification()
          }
          break
        case 'NEW_DIALOG' :
          if (this.props.location.pathname.startsWith('/dialogs')) {
            addDialog(message.dialogToFront)
          } else {
            reloadNotification()
          }
          break
        case 'ADD_TO_DIALOG' :
          if (this.props.location.pathname.startsWith('/dialogs')) {
            addDialog(message.dialogToFront)
          } else {
            reloadNotification()
          }
          break
        case 'NEW_COMMENT' :
          reloadNotification()
          break
        case 'NEW_LIKE' :
          reloadNotification()
          break
        case 'NEW_POST' :
          reloadNotification()
          break
        case 'NEW_RETWEET' :
          reloadNotification()
          break
        case 'NEW_FOLLOWER' :
          reloadNotification()
          break
        default:
      }
    })
  }

  render () {
    return null
  }
}
const mapStateToProps = state => {
  return {
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addMessage: messages => dispatch(addMessageFromWs(messages)),
    addDialog: message => dispatch(addDialogFromWs(message)),
    reloadNotification: () => dispatch(loadUserNotification())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WebSocketHandler)