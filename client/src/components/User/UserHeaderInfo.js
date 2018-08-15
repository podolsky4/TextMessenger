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

import Ava from './Avatar'
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import red from '@material-ui/core/colors/red'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Redirect } from 'react-router'

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
    backgroundColor: red[500]
  },
  cardHeader: {
    padding: '8px'
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
  const { classes, user, currentUser } = this.props
  const {toredirect, id} = this.state
  if (toredirect) {
    if (currentUser.id === id) {
      return <Redirect to='/profile'/>
    } else {
      return <Redirect to={`/profileUser/${id}`}/>
    }
  }

  return (
    <CardHeader onClick={e => this.profileRender(user.id)} className={classnames(classes.cardHeader)}
      avatar={
        <Ava/>
      }
      action={
        <IconButton>
          <MoreVertIcon/>
        </IconButton>
      }
      title={user.login}
      subheader={user.createdDate}
    />
  )
}
}

UserHeaderInfo.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserHeaderInfo)
