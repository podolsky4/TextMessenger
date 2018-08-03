import React, {Component} from 'react'

export default class PostCreateDate extends Component {
  render () {
    const {createdDate} = this.props
    return <div className="date_created">{createdDate}</div>
  }
}