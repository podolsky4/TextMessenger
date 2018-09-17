import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'

import PublishIcon from '@material-ui/icons/Publish'

const styles = theme => ({
  button: {
    alignSelf: 'flex-end',
    marginBottom: 14,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingTop: 13,
    paddingBottom: 13.5,
    marginLeft: '2vw',
    marginRight: '2vw',
    fontWeight: 700
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
