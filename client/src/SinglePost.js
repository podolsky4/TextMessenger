import React from 'react'
import connect from 'react-redux/es/connect/connect'
import { currentPost, usersFromPostsWhereParent } from './actions/postsActions'
import Typography from '../node_modules/@material-ui/core/Typography/Typography'
import { withStyles } from '@material-ui/core/styles'
import CardContent from '../node_modules/@material-ui/core/CardContent/CardContent'
import Card from '../node_modules/@material-ui/core/Card/Card'
import IconButton from '@material-ui/core/IconButton'
import classNames from 'classnames'
import ThumbUpIcon from '../node_modules/@material-ui/icons/ThumbUp'
import Comments from './components/Post/components/CommentList'
import CommentIcon from '@material-ui/icons/Comment'
import RepeateIcon from '@material-ui/icons/Repeat'
import ShowLikers from './components/Post/ShowLikers'
import Retwee from './components/Post/Retwee'


const styles = theme => ({
	rt: {
		transition: theme.transitions.create(['color'], {
			duration: theme.transitions.duration.short
		})
	},
	selected: {
		color: theme.palette.primary.main,
		background: theme.palette.primary.main
	},
	diva: {
		display: 'flex',
		alignItems: 'center'
	},
	singlePostWrapper:{
		display: 'flex',
	},
	paperPost: {
		margin: ' 10% auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '400px',
		marginTop: 80,
	},
	img:{
		width: '100%',
		objectFit: 'cover',
		maxHeight: '400px',
		position: 'relative'
	},
	wrappppppp: {
		display: 'flex',
		alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: 0
	},
  likkkk:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class SinglePost extends React.Component {
    state = {
      flagLike: false,
      flagComment: false,
      flagRet: false
  }

  componentWillMount () {
    const {loadPost,loadAllUserWhoRetweetCurrentPost} = this.props
    loadPost(this.props.match.params.postId)
    loadAllUserWhoRetweetCurrentPost(this.props.match.params.postId)
  }

  coment(){
    this.setState({flagComment:!this.state.flagComment})
  }

  likersa(){
    this.setState({flagLike:!this.state.flagLike})
  }
  retweeti(){
      this.setState({flagRet:!this.state.flagRet})
  }

  render () {
    const {currentPost, classes, usersWhoRetweet} = this.props

    return<div>
      <div className={classes.singlePostWrapper}>
        <Card className={classes.paperPost}>
          {currentPost.imgUrl &&
          <img className={classes.img}
               alt="Здесь должно быть изображение"
               src={currentPost.imgUrl}
          />}
          <CardContent>
            <Typography component={"h3"}>
              {currentPost.content}
            </Typography>
          </CardContent>
          <div className={classes.wrappppppp}>
            <div className={classes.likkkk}>
            <IconButton
              onClick={() => this.likersa()}
              aria-label="Likes">
              <ThumbUpIcon/>
            </IconButton>
            <Typography>
              {currentPost.likers!==undefined && currentPost.likers.length}
            </Typography>
            </div>
            <div className={classes.likkkk}>
            <IconButton
              onClick={() => this.coment()}
              className={classNames(classes.rt, 'comment',
                {[classes.selected]: this.state.hasComments})}
              aria-live={this.state.hasComments}
              aria-label="Comments"
            >
              <CommentIcon />
            </IconButton>
              <Typography>
                {currentPost.comments!==undefined && currentPost.comments.length}
              </Typography>
            </div>
            <div className={classes.likkkk}>
            <IconButton
              className={classNames(
                classes.rt,
                {[classes.selected]: this.state.retweet},
                {[classes.retweet]: this.state.retweet},
                {[classes.tweet]: true}
              )} aria-label="ReTweet"
              onClick={() => this.retweeti()}
            >
              <RepeateIcon/>
            </IconButton>
              <Typography>
                {usersWhoRetweet!==undefined && usersWhoRetweet.length}
              </Typography>
            </div>
          </div>
          {this.state.flagLike && currentPost.likers.length === 0 ?
            <a className={classes.textSome}>Nothing to show</a>

            : <ShowLikers
              likers={currentPost.likers}
              flag={this.state.flagLike}/>
          }
          {this.state.flagComment &&
          currentPost.comments.length === 0 ?
            <a>Nothing to show</a>
            : <Comments comments={currentPost.comments}
                    post={currentPost}
                    user={currentPost.user}
                    postUser={currentPost.user}
                    flag={this.state.flagComment}
                    notInput={true}/>
          }
          {this.state.flagRet && usersWhoRetweet.length === 0 ? <a>Nothing to show</a> :
            <Retwee flag={this.state.flagRet} users={usersWhoRetweet}/>}
        </Card>
      </div>
    </div>
  }
}
const mapStateToProps = state => {
  return {
    currentPost: state.currentPost,
    usersWhoRetweet: state.usersWhoRetweet
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadPost: (id) => dispatch(currentPost(id)),
    loadAllUserWhoRetweetCurrentPost: (id) => dispatch(usersFromPostsWhereParent(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SinglePost))