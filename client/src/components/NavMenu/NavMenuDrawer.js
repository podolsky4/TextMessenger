import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import { Badge, IconButton, Typography } from '@material-ui/core/'
import { Link } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MessageIcon from '@material-ui/icons/ChatBubble'
import PublicIcon from '@material-ui/icons/Public'
import NotificationsIcon from '@material-ui/icons/Notifications'
import connect from 'react-redux/es/connect/connect'
import { Redirect } from 'react-router'

const styles = (theme) => ({
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
	NavItem: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	buttonList: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingLeft: theme.spacing.unit * 2
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

	render () {
		const {classes, notification} = this.props

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
				<List component={Link} to='/' className={classes.NavItem}>
					<IconButton color="primary">
						<HomeIcon className={classes.icon}/>
					</IconButton>
					<Typography component={'p'}> Home</Typography>
				</List>
				<Divider/>
				<List component={Link} to='/feed' className={classes.NavItem}>
					<IconButton color="primary">
						<PublicIcon className={classes.icon}/>
					</IconButton>
					<Typography component={'p'}> Feed</Typography>
				</List>
				<Divider/>
				<Link to='/favorites' className={classes.NavItem}>
					<IconButton color="primary">
						<FavoriteIcon className={classes.icon}/>
					</IconButton>
					<Typography component={'p'}> Likes</Typography>
				</Link>
				<Divider/>
				<Link to='/dialogs'>
					<List className={classes.NavItem}>
						<IconButton color="primary">
							<MessageIcon className={classes.icon}/>
						</IconButton>
						<Typography component={'p'}> Messages</Typography>
					</List>
				</Link>
				<Divider/>
				<List component={Link} to='/notifications' className={classes.NavItem}>
					<IconButton color="primary">
						<Badge badgeContent={notification.length} color='secondary' classes={{badge: classes.badge}}>
							<NotificationsIcon className={classes.icon}/>
						</Badge>
					</IconButton>
					<Typography component={'p'}> Notifications</Typography>
				</List>
				<Divider/>
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