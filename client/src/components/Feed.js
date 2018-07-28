import React, { Component } from 'react'
import {connect} from 'react-redux'
import {loadPosts} from '../actions/postsActions';

class Feed extends Component {
  constructor(props){
    super(props);
    this.state ={
      text:''
    }
  }
  componentDidMount () {
    if(this.props.posts.length===0){
      this.props.loadPosts();
    }
  }
  change = e => {
    this.setState({
      [e.target.name]:e.target.value
    });
  };

  onSubmit = e =>{
    e.preventDefault();
    fetch(`http://localhost:9000/posts/user/${this.props.user.id}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"content":this.state.text})
        }).then(()=>this.props.loadPosts());
  };
  render () {
      const {posts} = this.props;
    return (
        <div>
        <form className="postCreator" onSubmit={e=>this.onSubmit(e)}>
        <label >
          Чем делимся:
          <br />
          <textarea rows={5} cols={60} maxLength={280} id="content" name="text" type="text" onChange={e=>this.change(e)}/>
        </label>
          <br />
        <button>Опубликовать</button>
        </form>
      <ul>
        {posts.map((post,index)=>
          <li key={index}>{post.content}</li>
        )}
      </ul>
  </div>
    )
  }
}
const mapStateToProps = state =>{
  return {
    user: state.user,
    posts: state.posts
  }
};
const  mapDispatchToProps = dispatch=> {
  return{
    loadPosts: () => dispatch(loadPosts())
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Feed)