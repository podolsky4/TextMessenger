import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'

import PublishIcon from '@material-ui/icons/Publish'

const styles = theme => ({
  button: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingTop: 11,
    paddingBottom: 11,
    marginLeft: '2vw',
    marginRight: '2vw'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

function ButtonPost (props) {
  const {classes} = props
  return (
    <Button variant="contained" type="submit" color="primary" className={classes.button}>
        Share
      <PublishIcon className={classes.rightIcon}></PublishIcon>
    </Button>
  )
}

ButtonPost.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ButtonPost)
