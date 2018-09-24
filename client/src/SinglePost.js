import React, { Fragment } from 'react'
import connect from 'react-redux/es/connect/connect'
import { currentPost } from './actions/postsActions'
import Typography from '../node_modules/@material-ui/core/Typography/Typography'
import Paper from '../node_modules/@material-ui/core/Paper/Paper'
import { withStyles } from '@material-ui/core/styles'
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";
import Comments from './components/Post/components/CommentList'
import Card from '@material-ui/core/Card'
import List from "@material-ui/core/es/List/List";
import Comment from "./components/Post/components/Comment";

const styles = theme => ({
  // Ter: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   width: '400px',
  //   marginTop: '50px',
  //   paddingTop: 80,
  // },
	singlePostWrapper:{
	  display: 'flex',
    // marginTop: 80,
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
  }
})
class SinglePost extends React.Component {

  componentWillMount () {
    const {loadPost} = this.props
		loadPost(this.props.match.params.postId)
		// console.log('loadPost in SINGLE_POST -  componentWillMount:', currentPost)
  }

  render () {
    const {currentPosts, classes} = this.props
// 		// const mappedList = (comments) => comments.map(comment => (
// 			// <Comment
// 			// 	key={comment.id}
// 			// 	comment={comment}
// 			// />
//     // ))
// console.log('post',currentPosts)
// 		// console.log('mappedList :', mappedList)

    return (
      <div className={classes.Ter}>
        <div className={classes.singlePostWrapper}>
         <Card className={classes.paperPost}>

						{currentPosts.imgUrl && <img className={classes.img} alt="Здесь должно быть изображение" src={currentPosts.imgUrl}/>}
          <CardContent className={classes.cardContent}>
            <Typography component={"h3"}>
             {currentPosts.content}
            </Typography>
          </CardContent>
           {/*<List>*/}
             {/*{currentPosts.comments}*/}
           {/*</List>*/}
        </Card>
      </div>
    </div>)
  }
}
const mapStateToProps = state => {
  return {
    currentPosts: state.currentPost
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadPost: (id) => dispatch(currentPost(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SinglePost))