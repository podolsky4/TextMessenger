import React, { Component, Fragment } from 'react'
import {List} from '@material-ui/core/umd/material-ui.production.min'
import {withStyles} from '@material-ui/core/styles'
import LikeToSinglePost from './LikeToSinglePost'
import ListItem from '../../../node_modules/@material-ui/core/ListItem/ListItem'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },

  likedAvaCont: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginLeft: 19,
  '&:first-child': {
    marginLeft: -3,
    marginRight: +3,
  }
  }
})

class ShowLikers extends Component {

  render () {
    const {likers, flag, classes} = this.props
    let maped = like => {
      return (
        <LikeToSinglePost
          key={like.id}
          like={like}
        />
      )
    }
    return<Fragment>
    {flag &&
          <Fragment>
          <h3>People how liked you post</h3>
          <ListItem className={classes.likedAvaCont}>
          {likers.map(i => maped(i))}
        </ListItem>
          </Fragment>
        }

    </Fragment>
  }
}

export default withStyles(styles)(ShowLikers)