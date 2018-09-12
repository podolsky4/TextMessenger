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
    borderRadius: 2
  }
})

class MessagesList extends Component {
  render () {
    const {messages, user, classes} = this.props
    return (
      <div className={classes.massageList}>
        {messages.map(function (message) {
          return <Message key={message.id} message={message} user={user}/>
        })}
      </div>
    )
  }
}

MessagesList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MessagesList)