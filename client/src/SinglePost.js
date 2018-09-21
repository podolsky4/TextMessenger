import React, { Fragment } from 'react'
import connect from 'react-redux/es/connect/connect'
import { currentPost } from './actions/postsActions'
import Typography from '../node_modules/@material-ui/core/Typography/Typography'
import Paper from '../node_modules/@material-ui/core/Paper/Paper'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '400px',
    margin: 'auto',
    marginTop: '50px',
    padding: '50px'
  }
})
class SinglePost extends React.Component {

  componentWillMount () {
    const {loadPost} = this.props
    console.log('this.props.match.params.postId',this.props.match.params.postId)
    loadPost(this.props.match.params.postId)
  }
  render () {
    const {currentPost, classes} = this.props

    return<Fragment>
      <Paper className={classes.root}>
      <Typography component={"h3"}>
      {currentPost.content}
      </Typography>
      </Paper>
    </Fragment>
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