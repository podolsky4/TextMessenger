import React, {Component} from 'react'
import {addedLikers, deleteLikers, loadFavorites, unRetweet, retweet} from '../../actions/postsActions'
import {connect} from 'react-redux'

import UserHeaderInfo from '../User/UserHeaderInfo'

import PostContent from './components/PostContent'
import Like from './components/Like'
import PostComment from './components/PostComment'
import PostRetwite from './components/PostRetwite'
import Comments from './components/CommentList'

import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import red from '@material-ui/core/colors/red'

const styles = theme => ({

  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
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
    backgroundColor: red[500]
  },
  post: {
    paddingBottom: '0'
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
  handleLike = e => {
    const {post, user, addedLiker, deleteLiker} = this.props
    if (e.target.className === 'like') {
      addedLiker(post.id, user)
    } else {
      deleteLiker(post.id, user)
    }
  }
  handleRetwite = e => {
    const {post, user, retweets, unRetweets, postId} = this.props
    if (e.target.className === 'tweet') {
      retweets(user.id, post.id)
    } else {
      unRetweets(postId)
    }
  }
  handleComments = e => {
    this.setState({flag: true})
  }

  // handleExpandClick = () => {
  //     this.setState(state => ({ expanded: !state.expanded }));
  // };

  render () {
    const {favorites, post, owner, whoo, user, classes} = this.props
    return (
      <Card className={classnames(classes.card, classes.post, 'post')}
        key={`${post.id}  ${post.parentId}`}
      >
        {owner && `Ретвитнул ${owner.login}`}
        <header>
          <UserHeaderInfo user={post.user}/>
          {/* TODO: not sure if creation time should be in post.user.creationDate. Maybe better to save it post.createdDate */}
          {/* <DataInfo user={post.user}/> */}
        </header>
        <PostContent content={post.content}/>
        <footer>
          <Like favorites={favorites} post={post} handleLike={this.handleLike.bind(this)}/>
          <PostRetwite whoo={whoo} handleRetwite={this.handleRetwite.bind(this)}/>
          <PostComment handleComments={this.handleComments.bind(this)} />
        </footer>
        {this.state.flag && <Comments comments={post.comments} post={post} user={user} flag={this.state.flag}/>}
      </Card>
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
