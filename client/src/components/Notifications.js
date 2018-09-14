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
    background: theme.palette.background.main,
    flexGrow: 1,
    margin: '32px auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    // width: '80%',
    minWidth: 275,
    cursor: 'pointer'
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
    if (e.type === 'NEW_FOLLOWER') {
      this.setState({toUser: true, userId: e.fromUser.id})
    } else if (e.type === 'NEW_DIALOG' || e.type === 'NEW_MESSAGE' || e.type === 'ADD_TO_DIALOG') {
      this.setState({toDialog: true, dialogId: e.dialog.id})
    } else if (e.type === 'NEW_LIKE' || e.type === 'NEW_COMMENT' || e.type === 'NEW_RETWEET') {
      this.setState({toPost: true, postId: e.post.id})
    }
  }

  notificationCard = (item, text) => {
    const {classes} = this.props
    return <Grid fullWidht item>
       <Card
         fullWidth
         className={classes.card}
         onClick = {e => this.redirecting(item)}
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

  notificationCard = (item, text) => {
    const {classes} = this.props
    return <Grid fullWidht item>
       <Card fullWidth className={classes.card}>
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
    if (item.type === 'NEW_POST') {
      const text = 'write a new post'
      return this.notificationCard(item, text)
    } else if (item.type === 'NEW_RETWEET') {
      const text = 'you post have been retweet'
      return this.notificationCard(item, text)
    } else if (item.type === 'NEW_COMMENT') {
      const text = 'in you post have a new comment'
      return this.notificationCard(item, text)
    } else if (item.type === 'NEW_LIKE') {
      const text = 'you post is liked'
      return this.notificationCard(item, text)
    } else if (item.type === 'NEW_FOLLOWER') {
      const text = 'following you'
      return this.notificationCard(item, text)
    } else if (item.type === 'NEW_DIALOG') {
      const text = 'create with you chat'
      return this.notificationCard(item, text)
    } else if (item.type === 'ADD_TO_DIALOG') {
      const text = 'join you to chat'
      return this.notificationCard(item, text)
    } else if (item.type === 'NEW_MESSAGE') {
      const text = 'wrote you new message'
      return this.notificationCard(item, text)
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
        <Grid fullWidht className={classes.root}>

                {notification.length === 0 &&
                    <Grid item xs={12}>
                        <Typography component={'h6'}>Nothing to show</Typography>
                    </Grid>
                }
                <Grid containter
                      zeroMinWidth
                      direction="column"
                      justify="center"
                      alignItems="stretch">
                    <Typography wrap component={'h6'}>Your Notifications</Typography>
                    {notification.length !== 0 &&
                    notification.map(u => this.read(u))
                    }
                </Grid>

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