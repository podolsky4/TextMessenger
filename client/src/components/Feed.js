import React, { Component } from 'react'
import {connect} from 'react-redux'
import {loadPosts} from '../actions/postsActions';

class Feed extends Component {
  componentDidMount () {
    if(this.props.posts.length===0){
      this.props.loadPosts();
    }
  }

  render () {
      const {posts} = this.props;
      console.log(posts.id);

    return (
      <ul>
        {posts.map((post,index)=>
          <li key={index}>{post.content}</li>
        )}
      </ul>
    )
  }
}
const mapStateToProps = state =>{
  return {
    posts: state.posts
  }
};
const  mapDispatchToProps = dispatch=> {
  return{
    loadPosts: () => dispatch(loadPosts())
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Feed)