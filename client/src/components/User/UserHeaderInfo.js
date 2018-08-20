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
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import red from '@material-ui/core/colors/red'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import { Redirect } from 'react-router'
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
      cursor:"pointer",
  },
  cardHeader: {
    padding: '8px'
  },
  title: {
      cursor:"pointer",
  }
})

class UserHeaderInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      toredirect: false,
      id: ''
    }
  }
  profileRender = (id) => {
    this.setState({
      toredirect: true,
      id: id
    })
  }
render () {
  const { classes, currentUser, post } = this.props
  const {toredirect, id} = this.state

  if (toredirect) {
    if (currentUser.id === id) {
      return <Redirect to='/profile'/>
    } else {
      return <Redirect to={`/profileUser/${id}`}/>
    }
  }

  return (
    <CardHeader className={classnames(classes.cardHeader) }
      avatar={
          <Avatar alt="Remy Sharp"
          src={post.user.profilePhoto}
          className={classnames(classes.avatar, 'logo')}
          onClick={e => this.profileRender(post.user.id)}
          />
      }
      action={
          <IconButton>
            <MoreVertIcon/>
          </IconButton>
      }
      title={
        <div className={classnames(classes.root, classes.title)} onClick={e => this.profileRender(post.user.id)}>
          {`${post.user.firstName} ${post.user.lastName}`}
        </div>
      }
      subheader={
        new Date(post.createdDate).toDateString()
      }
    />
  )
}
}

UserHeaderInfo.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserHeaderInfo)



//  <Ava
//              onClick={e => this.profileRender(post.user.id)}
//              aria-label="User avatar"
//              className={classes.avatar}
//              src={post.user.profilePhoto}
//              post={post}
//
//              // onClick={this.profileRender(post.user.id)}
//         />
//
// <CardHeader
// avatar={
// <Avatar aria-label="User avatar" src={post.user.profilePhoto} className={classes.avatar}/>
// }
// action={
// <IconButton>
//     <MoreVertIcon />
// </IconButton>
// }
// title={
// <div className={classes.root}>
//     <PersonIcon className={classes.icon} />
//     {`${post.user.firstName} ${post.user.lastName}`}
// </div>
// }
// subheader={
// <div className={classes.root}>
//     <CalendarIcon className={classes.icon} />{new Date(post.createdDate).toDateString()}
// </div>
// }
// />
