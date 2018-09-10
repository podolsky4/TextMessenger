import React from 'react'
import { webSocketDialog } from '../actions/ws'
import connect from 'react-redux/es/connect/connect'
import { addDialogFromWs, addMessageFromWs, addNotificationFromWs } from '../actions/wsActions'



class WebSocketHandler extends React.Component {
  componentDidMount () {
    const {addMessage, addNotification, addDialog} = this.props
    webSocketDialog((message => {
      const {dialogId} = this.props.match.params
      switch (message.type) {
        case 'NEW_MESSAGE':
          console.log('dialogId', dialogId)
          if (dialogId) {
            addMessage(message.messageToFront)
          }else {
            addNotification(message)
          }
        case 'NEW_DIALOG' :
          addDialog(message.dialogToFront)
      }
    }).bind(this))
  }

  render(){
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
    addDialog: message => dispatch(addDialogFromWs(message))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WebSocketHandler)