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
  componentWillMount () {
    const {loadNotification} = this.props
    loadNotification()
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
      return <h3>Юзер {item.fromUser.login} write new post</h3>
    } else if (item.type === 'NEW_RETWEET') {
      return <h3>Юзер {item.fromUser.login} retweet your post</h3>
    } else if (item.type === 'NEW_COMMENT') {
      return <h3>Юзер {item.fromUser.login} comment your post</h3>
    } else if (item.type === 'NEW_LIKE') {
      return <h3>Юзер {item.fromUser.login} liked your post</h3>
    } else if (item.type === 'NEW_FOLLOWER') {
      return <h3>Юзер {item.fromUser.login} following you</h3>
    } else if (item.type === 'NEW_DIALOG') {
      return <h3>Юзер {item.fromUser.login} create with you chat</h3>
    } else if (item.type === 'ADD_TO_DIALOG') {
      return <h3>Юзер {item.fromUser.login} join you to chat</h3>
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