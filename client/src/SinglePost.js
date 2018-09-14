import React from 'react'

export default class SinglePost extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      post: {}
    }
  }
  componentWillMount () {
    fetch(`/api/posts/${this.props.match.params.postId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => this.setState({'post': data}))
  }
  render () {
    const {post} = this.state
    return <h1>{post.content}</h1>
  }
}