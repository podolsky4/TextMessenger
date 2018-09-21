import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import classnames from 'classnames'
import CardHeader from '@material-ui/core/CardHeader'

import {Redirect} from 'react-router'
import Avatar from '@material-ui/core/Avatar'

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
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
    backgroundColor: theme.palette.background.dark,
    cursor: 'pointer'
  },
  nopadding: {
    padding: 0
  },
  title: {
    cursor: 'pointer'
  }
})

class UserHeaderInfo extends React.Component {
  constructor (props) {
    super(props)
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

  render () {
    const {classes, user, post, padding} = this.props
    const {toredirect, id} = this.state

    if (toredirect) {
      this.setState({toredirect: false})
      return <Redirect to={`/profile/${id}`}/>
    }

    return (
      <CardHeader
        style={{padding}}
        className={classnames(classes.cardHeader)}
        avatar={
          <Avatar alt="Remy Sharp"
            src={user.profilePhoto === null ? 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png' : user.profilePhoto}
            className={classnames(classes.avatar, 'logo')}
            onClick={e => this.profileRender(this.props.user.id)}
          />
        }
        title={
          <div className={classnames(classes.root, classes.title)}>
            {`${user.login}`}
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
}

export default withStyles(styles)(UserHeaderInfo)
