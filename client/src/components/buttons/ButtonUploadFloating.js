import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
})

class ButtonUploadFloating extends Component {
    // const input = <form><input type="file" name="file" ref="inputFile"/></form>
  render () {
    const { classes } = this.props
    return (
        <div>
          <Button type="file"
                  name="file"
                  ref="inputFile"
                  variant="fab"
                  color="primary"
                  aria-label="Add"
                  className={classes.button}>
            <AddIcon />
          </Button>
        </div>
    )
  }
}

ButtonUploadFloating.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ButtonUploadFloating)
