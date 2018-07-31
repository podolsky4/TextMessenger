import React, {Component} from 'react'

export default class Post extends Component {
  render () {
    return (
      <div className="post"
        key={this.props.post.id}>
        <p className="post_content">
          {this.props.post.content}
        </p>
      </div>

    )
  }
}