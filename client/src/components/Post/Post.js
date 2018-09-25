import React, {Component} from 'react'
import {addedLikers, deleteLikers, loadFavorites, retweet, unRetweet} from '../../actions/postsActions'
import {connect} from 'react-redux'

import PostContent from './components/PostContent'

import Comments from './components/CommentList'
import PropTypes from 'prop-types'

import {withStyles} from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import cyan from '@material-ui/core/colors/cyan'

import Divider from '@material-ui/core/Divider/Divider'
import PostFooter from './components/PostFooter'
import UserHeaderInfo from '../User/UserHeaderInfo'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  grid: {
    flexGrow: '0',
    width: '100%',
    padding: theme.spacing.unit * 1
  },
  icon: {
    paddingRight: theme.spacing.unit,
    marginTop: -4
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  footer: {
    display: 'flex'
  },
  reTweet: {
    padding: '0.5em',
    display: 'flex',
    background: '#EF6C00',
    color: 'white',
    textShadow: '0px 1px #3d4e56'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: cyan[500]
  },
  img: {
    width: '100%',
    objectFit: 'cover',
    maxHeight: '400px',
    // clip: "rect(0px,100%,400px,0px)",
    position: 'relative'
  }
})

class Post extends Component {
  constructor (props) {
    super(props)
    this.state = {
      flag: false,
      expanded: false
    }
  }

  componentWillMount () {
    const {favorites, user, loadFavorites} = this.props
    if (favorites.length === 0) {
      loadFavorites(user.id)
    }
  }

  handleComments = e => {
    this.setState({flag: !this.state.flag})
  };

  handleExpandClick = () => {
    this.setState(state => ({expanded: !state.expanded}))
  };

  render () {
    const {post, owner, user, classes, favorites, whoo, postId} = this.props

    return (
      <Grid className={classes.grid}
        item
        key={`${post.id} ${post.parentId}`}
      >

        <Card>

          {owner &&
            <div className={classes.reTweet}
              children={`Ретвитнул ${owner.login}`}/>
          }

          <UserHeaderInfo user={post.user}
            post={post}
            currentUser={user}/>
          {post.imgUrl && <img className={classes.img} alt="Здесь должно быть изображение" src={post.imgUrl}/>}
          <PostContent content={post.content}/>

          <Divider/>

          <CardActions className={classes.actions}
                       disableActionSpacing>
            <PostFooter whoo={whoo}
              post={post}
              postId ={postId}
              user={user}
              favorites={favorites}
              handleComments={this.handleComments.bind(this)}
              className={classes.footer}
              classes={classes}
              flag = {this.state.flag}
              commentsAmount = {post.comments.length}
            />
          </CardActions>
<div className="ListComments">
          {this.state.flag &&
            <Comments comments={post.comments}
              post={post}
              user={user}
              postUser={post.user}
              flag={this.state.flag}
            />
          }
</div>
        </Card>

      </Grid>
    )
  }
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
    loadFavorites: (id) => dispatch(loadFavorites(id)),
    retweets: (id, postId) => dispatch(retweet(id, postId)),
    unRetweets: (postId) => dispatch(unRetweet(postId))
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Post))
