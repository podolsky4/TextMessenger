import { Link } from 'react-router-dom'
import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MessageIcon from '@material-ui/icons/ChatBubble'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PublicIcon from '@material-ui/icons/Public'
import Badge from '@material-ui/core/Badge/Badge'
import connect from 'react-redux/es/connect/connect'
import MenuHeader from '../../components/Menu/MenuHeader'
import NavMenuDrawer from "../../components/NavMenu/NavMenuDrawer"
import MenuIcon from '@material-ui/icons/Menu'
import { ClickAwayListener } from '@material-ui/core/umd/material-ui.production.min'
import FetchData from '../../actions/serviceAction'

const styles = (theme,) => ({
  root: {
    flexGrow: 1,
      textTransform: 'capitalize'
  },
  appBar: {
    background: '#455A64'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
      '@media (min-width: 520px)': {
          display: 'none',
      }
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
  },
  // menuIcons: {
  //     display: 'flex',
  //       flexDirection: 'row'
  //   },
    menuIcons: {
    '@media (max-width: 520px)': {
        display: 'none',

    }
  },

    drawer: {

    }
})

class Header extends React.Component {
	state = {
		noUser: false,
		openDrawer: false,
		profileUser: null,
		profileUserId: null,
	}

	toggleDrawer = () => {
		this.setState({
			openDrawer: true
		})
	}

    handleClickAway = () => {
        setTimeout(() => this.setState({
            openDrawer: false,
        }));
    };

	componentDidMount () {
		const {match} = this.props
		let currentProfile = match.params.userId

		if (match.params.userId && (this.state.profileUser === null || (this.state.profileUser && this.state.profileUser.id !== +match.params.userId))) {
			FetchData.get(`/api/users/${currentProfile}`)
				.then(res => res.json())
				.then(data => {
					this.setState({profileUser: data})
				})
		}
	}

	render () {
		const {classes, user, notification, pageTitle, match} = this.props
		const {profileUser} = this.state
		console.log(this.state)
		console.log(match.params)
		const showProfileUser = profileUser && match.params.userId && profileUser.id === +match.params.userId
		console.log(showProfileUser)

		const locationRender = () => {

			return pageTitle
		}

		let {noUser, openDrawer} = this.state

		if (!user) noUser = true

        return <div className={classes.root}>
            <AppBar position='static' className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <ClickAwayListener onClickAway={()=>this.handleClickAway()}>
                        <IconButton className={classes.menuButton}
                                    color="inherit"
                                    aria-label="Menu"
                                    onClick={() =>this.toggleDrawer()}>
                            <MenuIcon/>
                        </IconButton>
                        {openDrawer && (<NavMenuDrawer/>)}
                    </ClickAwayListener><div className={classes.headingContainer}>
						{showProfileUser &&
						<Fragment>
                    <Typography variant="title"
                                color="inherit"
                                className={classes.heading}
                                component={'h3'}
                                align='justify'children={profileUser.firstName}
							/>
                    <Typography variant="title"
													color="inherit"
													className={classes.heading}
													component={'h3'}
													children={profileUser.lastName}
							/>
						</Fragment>
						}
						{!showProfileUser &&
						<Typography variant="title"
												color="inherit"
												className={classes.heading}
												component={'h3'}
												children={locationRender()}
						/>
						}
					</div>
                    <div className={classes.menuIcons}>
                        <IconButton color="inherit" component={Link} to='/feed'>
                            <PublicIcon className={classes.icon}/>
                        </IconButton>
                        <IconButton color="inherit" component={Link} to='/favorites'>
                            <FavoriteIcon className={classes.icon}/>
                        </IconButton>
                        <IconButton color="inherit" component={Link} to='/dialogs'>
                            <MessageIcon className={classes.icon}/>
                        </IconButton>
                        <IconButton aria-label="4 pending messages" color="inherit" component={Link}
                                    to='/notifications'>
                            <Badge badgeContent={notification.length} color='secondary'
                                   classes={{badge: classes.badge}}>
                                <NotificationsIcon className={classes.icon}/>
                            </Badge>
                        </IconButton>
                    </div>
                    {!noUser &&
                    <MenuHeader user={user}/>
                    }
                </Toolbar>
            </AppBar>

		</div>
	}

}

const mapStateToProps = state => {
	return {
		user: state.user,
		currentLocation: state.location,
		notification: state.notification
	}
}

export default connect(mapStateToProps)(withStyles(styles)(Header))