import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadFavorites} from '../../actions/postsActions'
import PostList from '../../components/Post/PostList'
import {Redirect} from 'react-router-dom'

import {getCurrentUser} from '../../actions/userActions'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    flexGrow: 1,
    alignItems: 'center'

  },
  wrap: {
    margin: 'auto'
  },
  paper: {
    padding: theme.spacing.unit * 1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    // width: "75%",
    justifySelf: 'center',
    alignSelf: 'center',
    margin: 'auto',
    marginTop: theme.spacing.unit * 3
  }

})

class Favorites extends Component {
  componentWillMount () {
    const {favorites, user, loadFavorites} = this.props
    if (favorites.length === 0) {
      loadFavorites(user.id)
    }
  }

  render () {
    const { classes } = this.props
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
              <h2>Your liked posts</h2>
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