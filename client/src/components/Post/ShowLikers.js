import React, {Component} from 'react'
import {List} from '@material-ui/core/umd/material-ui.production.min'
import {withStyles} from '@material-ui/core/styles'
import Like from './components/Like'
import LikeToSinglePost from './LikeToSinglePost'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  CommentTextField: {
    display: 'flex',
    width: '100%',
    marginRight: 32
  },
  postCreator: {
    display: 'flex',
    alignItems: 'start',
    margin: 16,
    width: '94%',
    justifyContent: 'space-between',
  },
  btnCreatePost: {

  }
})

class ShowLikers extends Component {

  render () {
    const {likers, flag} = this.props
    let maped = like => {
      return (
        <LikeToSinglePost
          key={like.id}
          like={like}
        />
      )
    }
    return (
      <div>
        {flag &&
        <List dense>
          {likers.map(i => maped(i))}
        </List>
        }
      </div>
    )
  }
}

export default withStyles(styles)(ShowLikers)