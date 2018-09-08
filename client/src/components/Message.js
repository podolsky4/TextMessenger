import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

// class Message extends Component {
//   render () {
//     const {message, user} = this.props
//
//     return (
//       <div className={message.user.id === user ? 'current' : 'other'}>
//         <h4>{message.content}</h4>
//         <a>{message.createdDate}</a>
//       </div>
//     )
//   }
// }
// export default Message

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  message: {
    padding: '.5em',
    margin: '.15em',
    width: 'fit-content'
  },
  messageHeader: {
    display: 'flex',
    flexDirection: 'row'
    // justifyContent: 'flex-start'
  },
  row: {
    display: 'flex',
    width: 100,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  avatar: {
    margin: 6,
    height: 24,
    width: 24
  },
  current: {
    textAlign: 'right',
    alignSelf: 'flex-end',
    '&$message': {
      borderRadius: '12px+4px+4px+12px'
    }
  },
  other: {
    '&$message': {
      borderRadius: '4px+12px+12px+4px'
    }
  },
  text: {
    maxWidth: '300px',
    wordWrap: 'break-word'
  }
})

function Message (props) {
  const {message, classes, user} = props
  console.log('user in message :', user)
  console.log('message in message :', message)

  // to check dynamically if the message is from current user:
  // --------- 1. create a new obj with 1.classes from props
  // --------- 2."message" class for all messages
  // --------- 3."current/other" with check from props
  const rootClasses = classNames(
    // ...classes,
    classes.message,
    (message.user.id === user) ? classes.current : classes.other
  )
  const right = (message.user.id === user)
  return (
    <Paper className={rootClasses} elevation={0}>
      {right &&
      <div className={classes.messageHeader}>
        <div className={classes.row}>
          <Avatar alt={message.user.login} src={message.user.profilePhoto} className={classes.avatar}/>
          <Typography variant='caption' children={message.user.login}/>
        </div>
      </div>
      }{!right &&
    <div className={classes.messageHeader}>
      <div className={classes.row}>
        <Typography variant="caption" children={message.user.login}/>
        <Avatar alt={message.user.login} src={message.user.profilePhoto} className={classes.avatar}/>
      </div>
    </div>
    }
      <Typography className={classes.text} component="p" children={message.content}/>
    </Paper>

  )
}

Message.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Message)
