import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import classnames from 'classnames'
import red from '@material-ui/core/colors/red'

import {Redirect} from 'react-router'
import Typography from '@material-ui/core/Typography/Typography'

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
    backgroundColor: red[500],
    cursor: 'pointer'
  },
  nopadding: {
    padding: 0
  },
  title: {
    cursor: 'pointer'
  },
  AccountCont: {
    width: '100%'
  }

})

class MenuAccountRedirect extends React.Component {
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
    const {classes, user, padding} = this.props
    const {toredirect, id} = this.state

    if (toredirect) {
      this.setState({toredirect: false})
      return <Redirect to={`/profile/${id}`}/>
    }

    return (
      <div
        style={{padding}}
        className={classnames(classes.AccountCont)}
        onClick={e => this.profileRender(user.id)}
      >
        <Typography component={'p'}>
        Account
        </Typography>
      </div>
    )
  }
}

MenuAccountRedirect.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default withStyles(styles)(MenuAccountRedirect)
