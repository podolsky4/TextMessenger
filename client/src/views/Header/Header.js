import { Link } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
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
import LockIcon from '@material-ui/icons/LockOpen'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PublicIcon from '@material-ui/icons/Public'
import Badge from '@material-ui/core/Badge/Badge'
import SignIn from '../../containers/SignIn/SignIn'
import Poper from '../../components/Poper'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  icon: {
    margin: theme.spacing.unit
  },
  badge: {
    top: -5,
    right: -10
  },

})

const Header = props => {
  const {classes} = props
  const conten = <SignIn />
  return (
    <div className={classes.root}>
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
          <IconButton color="inherit" component={Link} to='/profile'>
            <PersonIcon className={classes.icon}/>
          </IconButton>
          <Button color="inherit" variant="outlined">
              <Poper classes={"poper"} content={conten} />
          </Button>
        </Toolbar>
      </AppBar>

    </div>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Header)
