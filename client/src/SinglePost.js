import React, { Fragment } from 'react'
import connect from 'react-redux/es/connect/connect'
import { currentPost } from './actions/postsActions'
import Typography from '../node_modules/@material-ui/core/Typography/Typography'
import Paper from '../node_modules/@material-ui/core/Paper/Paper'
import { withStyles } from '@material-ui/core/styles'
import CardContent from '../node_modules/@material-ui/core/CardContent/CardContent'
import Card from '../node_modules/@material-ui/core/Card/Card'
import IconButton from '@material-ui/core/IconButton'
import classNames from 'classnames'
import ThumbUpIcon from '../node_modules/@material-ui/icons/ThumbUp'
import Comments from './components/Post/components/CommentList'
import ShowLikers from './components/Post/ShowLikers'

const styles = theme => ({
  // root: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   width: '400px',
  //   margin: 'auto',
  //   marginTop: '50px',
  //   padding: '50px'
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
  },
  wrappppppp: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textSome: {
    color: 'black'
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
          <IconButton onClick={() => this.coment()}>
            <ThumbUpIcon/>
          </IconButton>
          <Typography>{currentPost.likers!==undefined && currentPost.likers.length}</Typography>
          </div>
          {this.state.flag && currentPost.likers.length === 0 ? <a className={classes.textSome}>"Noting to show"</a> :
          <ShowLikers likers={currentPost.likers} flag={this.state.flag}/>
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