import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
})

class Posts extends Component {
  render () {
    const {classes} = this.props
    return (
      <Grid container className={classes.root}
            justify="center"
            direction="column"
            alignItems="center"
            spacing={16}>
        {this.props.posts.map(content => (
          <Grid item xs={12} lg={12}>
            <Post key={content.id} post={content}/>
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default connect(state => ({
  posts: state.posts
}))(withStyles(styles)(Posts))
