import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import CommentIcon from '@material-ui/icons/Comment'
class PostComment extends Component {
  // handleComments = e => {
  //   this.setState({flag: !flag})
  // };

  render () {
    const { handleComments} = this.props
    return (
        <a className="comment" onClick={handleComments}><CommentIcon /></a>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostComment)