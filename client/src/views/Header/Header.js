import {Link} from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MessageIcon from '@material-ui/icons/ChatBubble'
import PersonIcon from '@material-ui/icons/Person'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PublicIcon from '@material-ui/icons/Public'
import Badge from '@material-ui/core/Badge/Badge'
import UserHeaderInfo from '../../components/User/UserHeaderInfo'
import connect from 'react-redux/es/connect/connect'
import Popper from '@material-ui/core/Popper/Popper'
import Fade from '@material-ui/core/Fade/Fade'
import Paper from '@material-ui/core/Paper/Paper'
import LogOut from '../../components/User/LogOut'

import classNames from 'classnames'

const styles = (theme) => ({
  root: {
    flexGrow: 1
    // padding: "1px",
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
    anchorEl: null,
    open: false,
    noUser: false
  };

  handleClick = event => {
    const {currentTarget} = event
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open
    }))
  };

  // console.log("location :", location, {user})

  render () {
    const {classes, user, currentLocation} = this.props
    let {noUser} = this.state.noUser

    console.log('location is :', currentLocation)
    const {anchorEl, open} = this.state
    const id = open ? 'simple-popper' : null

    // const {location} = currentLocation;

    console.log('USER: ', user)

    if (user.length === 0) {
      noUser = true
    }
    console.log('NoUSER: ', this.state.noUser)

    return <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon/>
          </IconButton>
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
            <Badge badgeContent={4} color='secondary' classes={{badge: classes.badge}}>
              <NotificationsIcon className={classes.icon}/>
            </Badge>
          </IconButton>
          <IconButton color="inherit" component={Link} to={`/profile/${user.id}`}>
            <PersonIcon className={classes.icon}/>
          </IconButton>

          {!noUser &&
          <Button color="inherit" variant="outlined"
            aria-describedby={id}
            id="headerUser"
            className={classNames(classes.headerUser)}
            onClick={this.handleClick}
            style={{padding: 8}}>
            <UserHeaderInfo padding={0} user={user}/>
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
              {({TransitionProps}) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper>
                    <LogOut/>
                    <Typography className={classes.typography}>The content of the Popper.</Typography>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </Button>
          }
        </Toolbar>
      </AppBar>

    </div>
  }
}

// {/*<Poper classes={'poper'} content={conten} />*/}
Header.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    user: state.user,
    currentLocation: state.location
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Header))