import React, {Component} from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
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
      color: theme.palette.primary.main
    }
  },
  diva: {
    display: 'flex',
    alignItems: 'center'
  },

  selected: {
    background: '#00000'
  }

})

class Like extends Component {
  constructor (props) {
    super(props)
    this.state = {
      liked: false,
      likers: {}
    }
  }

  componentWillMount () {
    const {favorites, post, user} = this.props
    loadFavorites(user.id)
    favorites.some(p => p.id === post.id)
      ? this.setState({liked: true, likers: post.likers})
      : this.setState({liked: false, likers: post.likers})
  }

  // componentWillReceiveProps(nextProp) {
  //   let post = this.props.post
  //   loadFavorites(post.id)
  // }

  // componentDidUpdate (prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   let post = this.props.post
  //   if (post.liked !== prevProps.post.liked) {
  //     this.loadFavorites(post.id)
  //   }
  // }
  componentWillReceiveProps (nextProps) { // TODO: doesn't yet rerender the number
    if (this.props.post.likers !== nextProps.post.likers) {
      this.setState({likers: nextProps.post.likers})
      this.forceUpdate()
    }
  }

  handleLike = (id) => {
    const {user, addedLiker, deleteLiker, loadFavorites} = this.props
    if (!this.state.liked) {
      addedLiker(id, user)
    } else {
      deleteLiker(id, user)
    }
    this.setState({
      liked: !this.state.liked,
      likers: this.state.liked ? this.state.likers.filter(l => l.id !== user.id) : [...this.state.likers, user]
    })
    loadFavorites(user.id)
  };

  render () {
    const {classes, post} = this.props

    return (

      <div className={classes.diva}>
        <IconButton className={classNames(classes.root, {[classes.selected]: this.state.liked})}
          onClick={() => this.handleLike(post.id)}
          aria-live={this.state.liked}
          aria-label="Add to favorites"
        >
          <ThumbUpIcon/>
        </IconButton><Typography>{this.state.likers.length}</Typography>
      </div>
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