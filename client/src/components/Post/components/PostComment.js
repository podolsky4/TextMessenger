import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import CommentIcon from '@material-ui/icons/Comment'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import {withStyles} from '@material-ui/core/styles'
import classNames from 'classnames'

const styles = theme => ({
  root: {
    transition: theme.transitions.create(['color'], {
      duration: theme.transitions.duration.short
    }),
    '&$selected': {
      color: theme.palette.primary.main
    }
  },
  diva: {
    display: 'flex',
    alignItems: 'center'
  }
})

class PostComment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hasComments: false
    }
  }
  componentDidMount () {
    const { commentsAmount } = this.props
    if (commentsAmount > 0) {
      this.setState({hasComments: true})
    }
  }

  render () {
    const { handleComments, commentsAmount, classes} = this.props
    return (
        <div className={classes.diva}>
            <IconButton
                onClick={handleComments}
                className={classNames(classes.root, 'comment', {[classes.selected]: this.state.hasComments})}
                aria-live={this.state.hasComments}
                aria-label="Show Comments"
            >
            <CommentIcon />
            </IconButton>
            <Typography>{commentsAmount}</Typography>
        </div>
    )
  }
}

const mapStateToProps = state => {
}
const mapDispatchToProps = dispatch => {
}

PostComment.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PostComment))