import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createUser, loadUser, loginIn} from '../../actions/userActions'
import {loadFavorites} from '../../actions/postsActions'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Loader from '../../components/Loader/Loader'

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
})

class LogIn extends Component {
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };
  onSubmit = e => {
    const {loginInUser} = this.props
    e.preventDefault()
    loginInUser(this.state.email, this.state.password)
  };

  constructor (props) {
    super(props)
    this.state = {
      login: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      profileHeader: '',
      profilePhoto: '',
      dateBirthday: ''
      // classes: 'signIn'
    }
  }

  render () {
    const {classes, fetching} = this.props
    return (
      <React.Fragment>
        <CssBaseline/>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon/>
            </Avatar>
            <Typography variant="headline">Sign in</Typography>
            <form onSubmit={e => this.onSubmit(e)} className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={e => this.change(e)}
                  value={this.state.email}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={e => this.change(e)}
                  value={this.state.password}
                />
              </FormControl>
              {fetching && <Loader/>}
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
              >
                  Sign in
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createUser: (data) => dispatch(createUser(data)),
    loadUser: (some) => dispatch(loadUser(some)),
    loadFavorites: (id) => dispatch(loadFavorites(id)),
    loginInUser: (email, password) => dispatch(loginIn(email, password))
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    fetching: state.loader.fetching
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LogIn))