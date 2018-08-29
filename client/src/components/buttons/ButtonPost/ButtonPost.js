import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'

import PublishIcon from '@material-ui/icons/Publish'

const styles = theme => ({
  button: {
    alignSelf: 'stretch',
    margin: '8% 4.5% 3% 4.5%',
    marginBottom: 2.1 * theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

function ButtonPost (props) {
  const {classes} = props
  return (
    <Button variant="contained" type="submit" color="primary" className={classes.button}>
        Send
      <PublishIcon className={classes.rightIcon}></PublishIcon>
    </Button>
  )
}

ButtonPost.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ButtonPost)
