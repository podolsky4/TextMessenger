import React, {Component} from 'react'
import classNames from 'classnames'
import RepeateIcon from '@material-ui/icons/Repeat'
import IconButton from '@material-ui/core/IconButton'
import {withStyles} from '@material-ui/core/styles'
import {retweet, unRetweet} from '../../../actions/postsActions'
import {connect} from 'react-redux'

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    transition: theme.transitions.create(['color'], {
      duration: theme.transitions.duration.short
    })
  },
  diva: {
    display: 'flex',
    alignItems: 'center'
  },
  /* Styles applied to the root element if selected. */
  selected: {
    color: theme.palette.primary.main,
    background: theme.palette.primary.main
  }
})

class PostRetwite extends Component {
  constructor (props) {
    super(props)
    this.state = {
      retweet: false
    }
  }

  handleRetwite = e => {
    const {post, user, retweets, unRetweets, postId, whoo} = this.props
    if (!whoo && !this.state.retweet) {
      retweets(user.id, post.id)
      this.setState({retweet: true})
    } else {
      unRetweets(postId)
    }
  };

  render () {
    const {classes} = this.props
    return (
      <div className={classes.diva}>
        <IconButton className={classNames(classes.root,
          {[classes.selected]: this.state.retweet,
            [classes.retweet]: this.state.retweet,
            [classes.tweet]: true})}
                    onClick={(e) => this.handleRetwite(e)}
                    aria-live={this.state.retweet}
                    aria-label="ReTweet">
          <RepeateIcon/>
        </IconButton>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites
  }
}
const mapDispatchToProps = dispatch => {
  return {
    retweets: (id, postId) => dispatch(retweet(id, postId)),
    unRetweets: (postId) => dispatch(unRetweet(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostRetwite))