import React from 'react'
import { webSocketDialog } from '../actions/ws'
import connect from 'react-redux/es/connect/connect'
import { addMessageFromWs, addNotificationFromWs } from '../actions/wsActions'


class WebSocketHandler extends React.Component {
  componentDidMount () {
    const {addMessage, addNotification} = this.props
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
    addNotification: messages => dispatch(addNotificationFromWs(messages))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WebSocketHandler)