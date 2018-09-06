import React, {Component} from 'react'
import {addedLikers, deleteLikers, loadFavorites, retweet, unRetweet} from '../../../actions/postsActions'
import {withStyles} from '@material-ui/core/styles/index'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class PostComment extends Component {
  // handleComments = e => {
  //   this.setState({flag: !flag})
  // };

  render () {
    const {classes, handleComments} = this.props
    return (
        <a className="comment" onClick={handleComments}>Comments</a>
    )
  }
}

const mapStateToProps = state => {
  {}
}
const mapDispatchToProps = dispatch => {
  {}
}

PostComment.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PostComment)