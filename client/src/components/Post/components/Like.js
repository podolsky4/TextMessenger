import React, {Component} from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red'


const styles = theme => ({

  liked: {
    color: red,
  }

});



export default class Like extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLiked: false
    }
    this.handleLike().bind(this)
  }

  componentDidMount() {

  }

  handleLike = () => {
    const {post, user, addedLiker, deleteLiker} = this.props
    if (e.target.className === 'like') {
      console.log("handleLike check like passed")
      addedLiker(post.id, user)
    } else {
      console.log("handleLike check like not passed")
      deleteLiker(post.id, user)
    }
  }

  render () {
    const {favorites, post} = this.props
    return (
      <IconButton aria-label="Add to favorites"
                  className={{
                    [classes.liked]: this.state.expanded,
                  }}
                  onClick={this.handleExpandClick}
      >
                  className={favorites.some(p => p.id === post.id) ? 'like--checked' : 'like'}
                  onClick={this.handleLike()}>
        <FavoriteIcon />
      </IconButton>
    )
  }
}