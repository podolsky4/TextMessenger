import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  root: {
    flexGrow: 1,

    // allowFullScreen: Loader
  },

})

class Loader extends React.Component {
  render () {
    // const {classes} = this.props
    return <CircularProgress size={70} thickness={10} color='secondary'/>
  }
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Loader)
