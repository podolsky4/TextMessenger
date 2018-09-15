import React, {Component} from 'react'
import Post from './Post'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 862
  }
})

class PostList extends Component {
  render () {
    const {posts, user, classes} = this.props
    let current = (post, index) => {
      if (post.parent) {
        let who = user.id === post.user.id
        return <Post key={index + '' + post.id} post={post.parent} owner={post.user} whoo={who} postId={post.id}/>
      } else {
        return (
          <Post
            key={index + '' + post.id}
            post={post}
          />
        )
      }
    }

    return (
      <div className={classes.root}>
        <Grid container
          spacing={24}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} lg={10} md={10} sm={12}>
            <React.Fragment>
              {posts.map((content, index) => current(content, index))}
            </React.Fragment>
          </Grid>
        </Grid>
      </div>
    )
  }
}
export default withStyles(styles)(PostList)
