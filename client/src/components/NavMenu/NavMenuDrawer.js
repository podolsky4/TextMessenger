import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {Badge,  IconButton, Typography} from "@material-ui/core/";
import {Link } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MessageIcon from '@material-ui/icons/ChatBubble'
import PublicIcon from '@material-ui/icons/Public'
import NotificationsIcon from '@material-ui/icons/Notifications'
import connect from 'react-redux/es/connect/connect'
import {Redirect} from 'react-router'

const styles = (theme) => ({
    list: {
        width: 220,
			  paddingTop: 60,
			  background: theme.palette.background.darkgrey,
    },
    fullList: {
        width: 'auto',
    },
    NavItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textTransform: 'uppercase',
        fontWeight: '500',
        height: 62,
        margin: 0,
			  background: theme.palette.background.grey,
			'a': {
				textDecoration: 'none',
			},
      '&:hover': {
          background: theme.palette.primary.dark,
          color:  theme.palette.primary.contrastText,
				'& *': {
					color:  theme.palette.primary.contrastText,
        }
      }
    },
    buttonList: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: theme.spacing.unit * 2
    },
	  NavItemText: {
      textDecoration: 'none',
	    textDecorationLine: 'none',
    },
	  badge:{
      top: -12,
      right: -12
    },
	  divider: {
			background: theme.palette.background.grey,
			color:  theme.palette.background.grey,
    }
})

class NavMenuDrawer extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            toredirect: false,
            redirect: null,
        }
    }
    render() {
        const { classes, notification} = this.props;

    const redirect = path => {
      this.setState({toredirect: true})
      alert(this.state.toredirect)
      this.setState({redirect: path})
    }

    if (this.state.toredirect) {
      let url = this.state.redirect
      alert(url)
      this.setState({toredirect: false})
      return <Redirect to={`/${url}`}/>
    }

    const sideList = (
      <div className={classes.list}>
        {/*<List component={Link} to='/' className={classes.NavItem}>*/}
          {/*<IconButton color="primary">*/}
            {/*<HomeIcon className={classes.icon}/>*/}
          {/*</IconButton>*/}
          {/*<Typography className={classes.NavItemText}  component={'h3'}> Home</Typography>*/}
        {/*</List>*/}
        {/*<Divider className={classes.divider}/>*/}
        <List component={Link} to='/feed' className={classes.NavItem}>
          <IconButton color="primary">
            <PublicIcon className={classes.icon}/>
          </IconButton>
          <Typography className={classes.NavItemText}  component={'h3'}> Feed</Typography>
        </List>
        <Divider className={classes.divider}/>
        <Link to='/favorites' className={classes.NavItem}>
          <IconButton color="primary">
            <FavoriteIcon className={classes.icon}/>
          </IconButton>
          <Typography className={classes.NavItemText} component={'h3'}> Likes</Typography>
        </Link>
        <Divider className={classes.divider}/>
        <Link to='/dialogs'>
          <List className={classes.NavItem}>
            <IconButton color="primary">
              <MessageIcon className={classes.icon}/>
            </IconButton>
            <Typography className={classes.NavItemText} component={'h3'}> Messages</Typography>
          </List>
        </Link>
        <Divider className={classes.divider}/>
        <List component={Link} to='/notifications'
              className={classes.NavItem} aria-label={notification.length + "pending messages"}>
          <IconButton color="primary">
            <NotificationsIcon className={classes.icon}/>
          </IconButton>
					<Typography className={classes.NavItemText} component={'h3'}> Notifications</Typography>
					<Badge badgeContent={notification.length} color='secondary' className={classes.badge}>
				  </Badge>
        </List>
        <Divider className={classes.divider}/>
      </div>
    )

    return (
      <Drawer open>
        {sideList}
      </Drawer>
    )
  }
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

NavMenuDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(withStyles(styles)(NavMenuDrawer))