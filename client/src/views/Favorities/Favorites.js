import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadFavorites} from '../../actions/postsActions'
import PostList from '../../components/Post/PostList'
import {Redirect} from 'react-router-dom'
import Badge from '@material-ui/core/Badge/Badge'
import {getCurrentUser} from '../../actions/userActions'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
	root: {
		flexGrow: 1,
		alignItems: 'center',
		padding: 16,
	},
	wrap: {
		margin: 'auto'

	},
	paper: {
		background: theme.palette.background.grey,
		padding: [theme.spacing.unit * 2, theme.spacing.unit * 2, theme.spacing.unit * 0.5, theme.spacing.unit * 2],
		textAlign: 'center',
		color: theme.palette.text.primary,
		// width: "calc(100vw - " + theme.spacing.unit * 3 + "px)",
		justifySelf: 'flex-start',
		alignSelf: 'center',
		margin: [theme.spacing.unit * 3, 'auto', theme.spacing.unit * 4, 'auto'],
		marginTop: 80,
        marginBottom: theme.spacing.unit * 2.5,
		'&::after': {
			borderBottom: theme.palette.primary.dark + ' 6px solid'
		}
	},
	badge: {
		top: 3,
		right: -29
	},
    paperTitle: {
		paddingLeft: 16,
		paddingRight: 16,

	}
})

class Favorites extends Component {
	componentWillMount() {
		const {favorites, user, loadFavorites} = this.props
		if (favorites.length === 0) {
			loadFavorites(user.id)
		}
	}

	render() {
		const {classes} = this.props
		const {favorites, user} = this.props

		if (!user.id) {
			return <Redirect to={`/`}/>
		}

		return (
			<Grid container className={classes.root}>
				<Grid className={classes.wrap} item xs={12} md={10} lg={10}>
					<Grid
						container
						spacing={16}
						direction="column"
						justifycontent="center"
						alignItems="stretch"
					>
						<Paper className={classes.paper} elevation={0}>
							<Badge badgeContent={favorites.length} color='primary'
										 classes={{badge: classes.badge}}>
								<h2 className={classes.paperTitle}>Posts you liked</h2>
							</Badge>
						</Paper>
						<PostList posts={favorites}/>
					</Grid>
				</Grid>
			</Grid>
		)
	}
}

const mapStateToProps = state => {
	return {
		favorites: state.favorites,
		user: state.user
	}
}
const mapDispatchToProps = dispatch => {
	return {
		loadFavorites: (id) => dispatch(loadFavorites(id)),
		getCurrentUserPoint: () => dispatch(getCurrentUser())
	}
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Favorites))