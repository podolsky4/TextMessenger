import React, {Component} from 'react'
import Message from './Message'

import {withStyles} from '@material-ui/core/styles/index'
import PropTypes from 'prop-types'
// import classNames from 'classnames'

const styles = theme => ({
  massageList: {
    display: 'flex',
    flexDirection: 'column',
    // background: '#F5F5F5',
    padding: '4px',
    paddingBottom: '.5em',
    paddingTop: '32px',
    background: 'rgba(0, 0, 0, 0.29)',
    borderRadius: 2,
    maxHeight: '85vh',
    overflow: 'scroll'
  }
})

class MessagesList extends Component {
  componentDidMount () {
    const msgWrap = document.getElementById('msgWrap')
    msgWrap.scrollIntoView(false)  // TODO: make it scroll to the last one
  }
  render () {
    const {messages, user, classes} = this.props
    const massageList = (
      <div id={'msgWrap'} className={classes.massageList}>
        {messages.map((message) => {
          return <Message key={message.id} message={message} user={user}/>
        })}
      </div>
    )
    return (massageList)
  }
}

MessagesList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MessagesList)