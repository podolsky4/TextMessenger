import React, {Component} from 'react'
import {connect} from 'react-redux'
import {logOut} from '../../actions/userActions'
import Button from '@material-ui/core/Button'
import LockIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  layout: {
    width: 'auto'
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
    // [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
    //   width: 400,
    //   marginLeft: 'auto',
    //   marginRight: 'auto'
    // }
  },
  paper: {
    marginTop: theme.spacing.unit * 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  logout: {
    display: 'flex',
    flexDirection: 'row',
    justifyItems: 'space-between',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  lockIcon: {
    marginRight: '1em'
  },

  submit: {
    // marginTop: theme.spacing.unit * 3
    // background:  "#e7f6f9",
  }
})

class LogOut extends Component {
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  logout = (e) => {
    const {logOutUser} = this.props
    e.preventDefault()
    document.location.reload()
    logOutUser()
  };

  render () {
    const {classes} = this.props
    return (
      <React.Fragment className={classes.logout}>
        <LockIcon className={classes.lockIcon}/>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          onClick={e => this.logout(e)}
          className={classes.submit}
        >
                Log Out
        </Button>

      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOutUser: () => dispatch(logOut())
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    fetching: state.loader.fetching
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LogOut))