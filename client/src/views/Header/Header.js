import {Link} from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MessageIcon from '@material-ui/icons/ChatBubble'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PublicIcon from '@material-ui/icons/Public'
import Badge from '@material-ui/core/Badge/Badge'
import connect from 'react-redux/es/connect/connect'
import MenuHeader from '../../components/Menu/MenuHeader'

const styles = (theme) => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    background: '#455A64'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  icon: {
    margin: theme.spacing.unit
  },
  badge: {
    top: -5,
    right: -10
  },
  typography: {
    padding: theme.spacing.unit * 2
  },
  headerUser: {
    padding: '1px'
  }
})

class Header extends React.Component {
  state = {
    noUser: false
  };

  render () {
    const {classes, user, notification} = this.props
    let {noUser} = this.state.noUser
    if (!user) {
      noUser = true
    }

    return <div className={classes.root}>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"> */}
            {/* <MenuIcon/> */}
          {/* </IconButton> */}
          <Typography variant="title" color="inherit" className={classes.root}>
            Feed
          </Typography>
          <IconButton color="inherit" component={Link} to='/'>
            <HomeIcon className={classes.icon}/>
          </IconButton>
          <IconButton color="inherit" component={Link} to='/feed'>
            <PublicIcon className={classes.icon}/>
          </IconButton>
          <IconButton color="inherit" component={Link} to='/favorites'>
            <FavoriteIcon className={classes.icon}/>
          </IconButton>
          <IconButton color="inherit" component={Link} to='/dialogs'>
            <MessageIcon className={classes.icon}/>
          </IconButton>
          <IconButton aria-label="4 pending messages" color="inherit" component={Link} to='/notifications'>
            <Badge badgeContent={notification.length} color='secondary' classes={{badge: classes.badge}}>
              <NotificationsIcon className={classes.icon}/>
            </Badge>
          </IconButton>
          {/* TODO fix */}
          {!noUser &&
          <MenuHeader user={user}/>
          }
        </Toolbar>
      </AppBar>

    </div>
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    user: state.user,
    currentLocation: state.location,
    notification: state.notification
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Header))