import React from 'react'
import { webSocketDialog } from '../actions/ws'
import connect from 'react-redux/es/connect/connect'
import { addDialogFromWs, addMessageFromWs, addNotificationFromWs } from '../actions/wsActions'
import { loadUserNotification } from '../actions/userActions'

class WebSocketHandler extends React.Component {
  componentDidMount () {
    const {addMessage, addNotification, addDialog, reloadNotification} = this.props
    webSocketDialog(message => {
      const {dialogId} = this.props.match.params
      switch (message.type) {
        case 'NEW_MESSAGE':
          console.log('dialogId', dialogId)
          if (dialogId) {
            addMessage(message.messageToFront)
          } else {
            addNotification(message)
          }
          break
        case 'NEW_DIALOG' :
          if (this.props.location.pathname.startsWith('/dialogs')) {
            addDialog(message.dialogToFront)
          } else {
            addNotification(message)
          }
          break
        case 'NEW_COMMENT' :
          addNotification(message)
          break
        case 'NEW_POST' :
          reloadNotification()
          break
        case 'NEW_RETWEET' :
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
    addNotification: messages => dispatch(addNotificationFromWs(messages)),
    addDialog: message => dispatch(addDialogFromWs(message)),
    reloadNotification: () => dispatch(loadUserNotification())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WebSocketHandler)