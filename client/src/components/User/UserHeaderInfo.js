// import React, {Component} from 'react'
// import UserLogin from './UserLogin'
// import UserEmail from './UserEmail'
//
// export default class UserHeaderInfo extends Component {
//   render () {
//     const {user} = this.props
//     return (
//       <div className="user_info">
//         <UserLogin login={user.login}/>
//         <UserEmail email={user.email}/>
//       </div>
//     )
//   }
// }

import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import classnames from 'classnames'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import red from '@material-ui/core/colors/red'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import {Redirect} from 'react-router'
import Avatar from '@material-ui/core/Avatar'

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500],
    cursor: 'pointer'
  },
  nopadding: {
    padding: 0,
  },
  title: {
    cursor: 'pointer'
  }
});

class UserHeaderInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toredirect: false,
      id: this.props.user.id
    }
  }

  profileRender = (id) => {
    this.setState({
      toredirect: true,
      id: id
    })
  };

  render() {
    const {classes, user, post, padding} = this.props;
    // if(this.props.post) { const post = this.props.post } else {const post = 0}
    const {toredirect, id} = this.state;

    if (toredirect) {
      this.setState({toredirect: false});
      return <Redirect to={`/profile/${id}`}/>
    }

    return (
      <CardHeader
        style={{padding}}
        className={classnames(classes.cardHeader)}
        avatar={
          <Avatar alt="Remy Sharp"
                  src={user.profilePhoto}
                  className={classnames(classes.avatar, 'logo')}
                  onClick={e => this.profileRender(this.props.user.id)}
          />
        }
        action={
          <IconButton>
            <MoreVertIcon/>
          </IconButton>
        }
        title={
          <div className={classnames(classes.root, classes.title)} onClick={e => this.profileRender(user.id)}>
            {`${user.firstName} ${user.lastName}`}
          </div>
        }
        subheader={post &&
        new Date(post.createdDate).toDateString()
        }
      />
    )
  }
}

UserHeaderInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

export default withStyles(styles)(UserHeaderInfo)
