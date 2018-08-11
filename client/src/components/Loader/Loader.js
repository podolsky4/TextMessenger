import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import green from '@material-ui/core/colors/green'
import './Loader.css'
const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
})
function Loader (props) {
  const { classes, fullscreen } = props
  return (
    <div className={`loader ${fullscreen ? 'loader--fullscreen' : ''}`}>
      <CircularProgress className={classes.progress} style={{ color: green[900] }} thickness={2} />
    </div>
  )
}
Loader.propTypes = {
  classes: PropTypes.object.isRequired,
  fullscreen: PropTypes.bool
}
export default withStyles(styles)(Loader)