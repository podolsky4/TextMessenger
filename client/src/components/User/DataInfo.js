import React, {Component} from 'react'
import UserFullName from './UserFullName'
import PostCreateDate from '../Post/components/PostCreateDate'

export default class DataInfo extends Component {
  render () {
    const {user} = this.props
    return (
      <div className="data_info">
        <UserFullName user={user}/>
        <PostCreateDate createdDate={user.createdDate}/>
      </div>
    )
  }
}