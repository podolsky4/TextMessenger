import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'
import {loadUserNotification} from '../actions/userActions'
import {
    Card,
    CardContent,
    Grid,
    Typography
} from '@material-ui/core/umd/material-ui.production.min'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  card: {
    // width: '80%',
    minWidth: '40%',
    cursor: 'pointer',
    margin: theme.spacing.unit * 2
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  }
}
)

class Notifications extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toUser: false,
      userId: '',
      toDialog: false,
      dialogId: '',
      toPost: false,
      postId: ''
    }
  }

  componentWillMount () {
    const {loadNotification} = this.props
    loadNotification()
  }
  redirecting = e => {
    this.checkNotification(e)
    if (e.type === 'NEW_FOLLOWER') {
      this.setState({toUser: true, userId: e.fromUser.id})
    } else if (e.type === 'NEW_DIALOG' || e.type === 'NEW_MESSAGE' || e.type === 'ADD_TO_DIALOG') {
      this.setState({toDialog: true, dialogId: e.dialog.id})
    } else if (e.type === 'NEW_LIKE' || e.type === 'NEW_COMMENT' || e.type === 'NEW_RETWEET') {
      this.setState({toPost: true, postId: e.post.id})
    }
  }

  checkNotification = e => {
    const {loadNotification} = this.props
    const id = e.id
    fetch('/api/notification/'+id,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
      }
    ).then(loadNotification())

  }

  notificationCard = (item, text) => {
    const {classes} = this.props
    return <Grid key={item.id} item>
       <Card
         className={classes.card}
         onClick = {() => {this.redirecting(item)}}
       >
            <CardContent>
                <Typography className={classes.title} color="textSecondary">
                    {item.type}
                </Typography>
                <Typography variant="headline" component="h2">
                    {item.fromUser.login}
                    <span className={classes.bullet}>•</span>
                    {text}
                </Typography>
            </CardContent>
         </Card>
      </Grid>
  }

  read = item => {
    // TODO replace switch
    switch (item.type) {
      case 'NEW_POST':
        let text = 'write a new post'
        return this.notificationCard(item, text)
      case 'NEW_RETWEET':
        text = 'you post have been retweet'
        return this.notificationCard(item, text)
      case 'NEW_COMMENT':
        text = 'in you post have a new comment'
        return this.notificationCard(item, text)
      case 'NEW_LIKE':
        text = 'you post is liked'
        return this.notificationCard(item, text)
      case 'NEW_FOLLOWER':
        text = 'following you'
        return this.notificationCard(item, text)
      case 'NEW_DIALOG':
        text = 'create with you chat'
        return this.notificationCard(item, text)
      case 'ADD_TO_DIALOG':
        text = 'join you to chat'
        return this.notificationCard(item, text)
      case 'NEW_MESSAGE':
        text = 'wrote you new message'
        return this.notificationCard(item, text)
      default:
        return console.log("new case "+item.type)
    }

  }

  render () {
    const {user, notification, classes} = this.props

    if (!user) {
      return <Redirect to={`/`}/>
    }

    if (this.state.toUser) {
      return <Redirect to={`/profile/${this.state.userId}`}/>
    }
    if (this.state.toDialog) {
      return <Redirect to={`/dialogs/${this.state.dialogId}`}/>
    }
    if (this.state.toPost) {
      return <Redirect to={`/post/${this.state.postId}`}/>
    }
    return (
        <Grid className={classes.root}>
                <Grid zeroMinWidth
                      direction="column"
                      justify="center"
                      alignItems="stretch">
                    <Typography component={'h6'}>Your Notifications</Typography>
                    {notification.length !== 0 &&
                    notification.map(u => this.read(u))
                    }
                </Grid>
          {notification.length === 0 &&
          <Grid item xs={12}>
            <Typography component={'h6'}>Nothing to show</Typography>
          </Grid>
          }

        </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    notification: state.notification
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadNotification: () => dispatch(loadUserNotification())
  }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Notifications))