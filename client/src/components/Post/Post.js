import React, {Component} from 'react'
import {addedLikers, deleteLikers, loadFavorites, unRetweet, retweet} from '../../actions/postsActions'
import {connect} from 'react-redux'

import PostContent from './components/PostContent'

import Comments from './components/CommentList'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import cyan from '@material-ui/core/colors/cyan'


import Divider from '@material-ui/core/Divider/Divider'
import PostFooter from './components/PostFooter'
import UserHeaderInfo from "../User/UserHeaderInfo";

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    paddingRight: theme.spacing.unit,
    marginTop: -4,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: cyan[500],
  },
});

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

  handleExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }));
  };

  render () {
    const {post, owner, user, classes} = this.props
    return (
      <Grid item xs={12} sm={9} md={8} lg={6} key={`${post.id} ${post.parentId}`}>
        <Card>
              {owner && `Ретвитнул ${owner.login}`}
              <UserHeaderInfo post={post} classes currentUser={user}/>

          <PostContent content={post.content}/>
          <Divider />
          <CardActions className={classes.actions} disableActionSpacing>
            {/*<Like favorites={favorites} post={post} />*/}
            {/*<IconButton aria-label="Repost" onClick={this.handleRetwite}>
              <ShareIcon />
            </IconButton><Typography>{0}</Typography>
            <IconButton aria-label="Comments" onClick={this.handleComments}>
              <CommentIcon />
            </IconButton><Typography>{0}</Typography>*/}
            {/*<PostRetwite whoo={whoo} handleRetwite={this.handleRetwite.bind(this)}/>
            <PostComment handleComments={this.handleComments.bind(this)} />*/}
            <PostFooter />
          </CardActions>
          {this.state.flag && <Comments comments={post.comments} post={post} user={user} flag={this.state.flag}/>}
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
