import React, {Component} from 'react'
import Post from './Post'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    flexGrow: 1
  }
  // paper: {
  //   padding: theme.spacing.unit * 2,
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // },
})

class PostList extends Component {
  render () {
    const {posts, user, classes} = this.props
    let current = post => {
      if (post.parentId == null) {
        return (
          <Post
            key={post.id}
            post={post}
          />
        )
      } else {
        let currentPost = posts.find(i => i.id === post.parentId)
        let who = user.id === post.user.id
        return <Post key={post.id} post={currentPost} owner={post.user} whoo={who} postId={post.id}/>
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
          <Grid item
            xs={12}
            lg={10}
            md={10}
            spacing={24}
            justify="center"
            alignItems="stretch">
            <React.Fragment>
              {posts.map(content => current(content))}
            </React.Fragment>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(PostList)
