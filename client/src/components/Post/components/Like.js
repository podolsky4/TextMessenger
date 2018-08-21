import React, { Component } from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

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

  componentDidMount () {
    // const {favorites, post} = this.props
    // if (favorites.some(p => p.id === post.id)) {
    //   this.setState({liked: !this.state.liked})
    // }
  }

  handleLike = () => {
    this.setState({
      liked: !this.state.liked
    })
  }

  /* handleLike () {
    const {post, user, addedLiker, deleteLiker} = this.props
      addedLiker(post.id, user)
    } else {
      console.log('handleLike check like not passed')
      deleteLiker(post.id, user)
    }
  } */

  render () {
    const {classes} = this.props
    return (
      <React.Fragment>
        <IconButton className={classNames(classes.root, {[classes.selected]: this.state.liked})}
          onClick={this.handleLike}
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

export default withStyles(styles)(Like)
