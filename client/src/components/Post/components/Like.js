import React, { Component } from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import connect from 'react-redux/es/connect/connect'
import {addedLikers, deleteLikers, loadFavorites} from '../../../actions/postsActions'

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    transition: theme.transitions.create(['color'], {
      duration: theme.transitions.duration.short
    }),
    '&$selected': {
      // color: theme.palette.primary.main,
      color: theme.palette.primary.main
    }
  },

  /* Styles applied to the root element if selected. */
  selected: {}
})

class Like extends Component {
  constructor (props) {
    super(props)
    this.state = {
      liked: false
    }
  }

  componentWillMount () {
    const {favorites, post, user} = this.props
    loadFavorites(user.id)
    favorites.some(p => p.id === post.id)
      ? this.setState({liked: true})
      : ''
  }

  handleLike = (id) => {
    const {user, addedLiker, deleteLiker, loadFavorites} = this.props
    if (!this.state.liked) {
      addedLiker(id, user)
    } else {
      deleteLiker(id, user)
    }
    this.setState({
      liked: !this.state.liked
    })
    loadFavorites(user.id)
  }

  render () {
    const {classes, post} = this.props
    return (
      <React.Fragment>
        <IconButton className={classNames(classes.root, {[classes.selected]: this.state.liked})}
          onClick={() => this.handleLike(post.id)}
          aria-live={this.state.liked}
          aria-label="Add to favorites"
        >
          <ThumbUpIcon/>
        </IconButton><Typography>{1}</Typography>
      </React.Fragment>
    )
  }
}

Like.propTypes = {
  classes: PropTypes.object.isRequired
}
const mapStateToProps = state => {
  return {
    user: state.user,
    favorites: state.favorites
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addedLiker: (id, user) => dispatch(addedLikers(id, user)),
    deleteLiker: (id, user) => dispatch(deleteLikers(id, user)),
    loadFavorites: (id) => dispatch(loadFavorites(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Like))