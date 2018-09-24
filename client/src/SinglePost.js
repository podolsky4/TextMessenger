import React from 'react'
import connect from 'react-redux/es/connect/connect'
import { currentPost } from './actions/postsActions'
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
		// clip: "rect(0px,100%,400px,0px)",
		position: 'relative'
	},
	wrappppppp: {
		display: 'flex',
		alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    padding: 0
	}
})

class SinglePost extends React.Component {
    state = {
      flag: false
  }
  componentWillMount () {
    const {loadPost} = this.props
    loadPost(this.props.match.params.postId)
  }
  coment(){
    this.setState({flag:!this.state.flag})
  }
  render () {
    const {currentPost, classes} = this.props

    return<div className={classes.Ter}>
      <div className={classes.singlePostWrapper}>
        <Card className={classes.paperPost}>
          {currentPost.imgUrl && <img className={classes.img} alt="Здесь должно быть изображение" src={currentPost.imgUrl}/>}
          <CardContent>
            <Typography component={"h3"}>
              {currentPost.content}
            </Typography>
          </CardContent>
          <div className={classes.wrappppppp}>
            <IconButton onClick={() => this.coment()} aria-label="Likes">
              <ThumbUpIcon/>
            </IconButton>
            <Typography>{currentPost.likers!==undefined && currentPost.likers.length}</Typography>

						<IconButton
							// onClick={handleComments}
							className={classNames(classes.rt, 'comment', {[classes.selected]: this.state.hasComments})}
							aria-live={this.state.hasComments}
							aria-label="Comments"
						>
							<CommentIcon />
            </IconButton>
            {/*<Typography>*/}
              {/*{currentPost.comments.length}*/}
            {/*</Typography>*/}

						<IconButton className={
                          classNames(
                            classes.rt,
                            {[classes.selected]: this.state.retweet},
                            {[classes.retweet]: this.state.retweet},
                            {[classes.tweet]: true}
                          )
						            }
												// onClick={(e) => this.handleRetwite(e)}
												// aria-live={this.state.retweet}
												aria-label="ReTweet">
							<RepeateIcon/>
						</IconButton>
          </div>
          {this.state.flag &&
            <Comments comments={currentPost.comments}
                    post={currentPost}
                    user={currentPost.user}
                    postUser={currentPost.user}
                    flag={this.state.flag}/>
          }
        </Card>
      </div>
    </div>
  }
}
const mapStateToProps = state => {
  return {
    currentPost: state.currentPost
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadPost: (id) => dispatch(currentPost(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SinglePost))