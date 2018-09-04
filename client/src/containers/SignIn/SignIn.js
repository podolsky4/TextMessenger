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
import PersonAdd from '@material-ui/icons/PersonAdd'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Loader from '../../components/Loader/Loader'

import {ValidatorForm} from 'react-material-ui-form-validator'

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
  center: {

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'

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
  },
  signIn: {
    marginTop: theme.spacing.unit,
    opacity: '0.6',
    '&:hover': {
      opacity: 1
    }
  }
})

class LogIn extends Component {
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
      dateBirthday: '',
      signUp: false,
      signIn: true,
      forgotPassword: false,
      createemail: '',
      createfirstName: '',
      createpassword: ''
    }
  }
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
  create = e => {
    // const {createUser} = this.props
    e.preventDefault()
    let data = {login: this.state.createfirstName, email: this.state.createemail, password: this.state.createpassword}
    console.log('signUp data :', data)
    // createUser(data)
  };

  SignUpToggle = e => {
    this.setState({signUp: true})
    if (this.state.signUp) {
      this.setState({forgotPassword: false, signIn: false})
    }
  };
  SignUpForgotPassword = e => {
    this.setState({forgotPassword: true})
    if (this.state.forgotPassword) {
      this.setState({signUp: false, signIn: false})
    }
  };
  SignInToggle = e => {
    this.setState({signIn: true})
    if (this.state.signIn) {
      this.setState({signUp: false, forgotPassword: false})
    }
  }
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

  render () {
    const {classes, fetching} = this.props
    const {signUp, forgotPassword, signIn} = this.state
    return (
      <React.Fragment>
        <CssBaseline/>
        <main className={classes.layout}>
          <React.Fragment>
            {signIn && !signUp && !forgotPassword &&
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon/>
          </Avatar>
          <ValidatorForm className={classes.center}>
            <Typography variant="headline">Sign in</Typography>
            <form onSubmit={e => this.onSubmit(e)} className={classes.form}>
              <FormControl margin="normal" fullWidth >
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
              <FormControl margin="normal" fullWidth>
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
                height = "300%"
                variant="flat"
                color="primary"
                className={classes.signIn}
                onClick={this.SignUpToggle.bind(this)}
              >
                Registration
              </Button>
              <Button
                height = "300%"
                variant="flat"
                color="primary"
                className={classes.signIn}
                onClick={this.SignUpForgotPassword.bind(this)}
              >
                Forgot Password
              </Button>
              <Button
                fullWidth
                type="submit"
                variant="raised"
                color="primary"
                className={classes.submit}
              >
                      Sign in
              </Button>

            </form>
          </ValidatorForm>
        </Paper>
            }
          </React.Fragment>
          {forgotPassword &&
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PersonAdd/>
            </Avatar>
            <Typography variant="headline">Forgot Password</Typography>
            <form onSubmit={e => this.create(e)} className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="createemail">Email Address</InputLabel>
                <Input
                  id="email"
                  name="createemail"
                  autoComplete="email"
                  autoFocus
                  onChange={e => this.change(e)}
                  value={this.state.createemail}
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
                Sign Up
              </Button>
              <Button
                fullWidth
                variant="flat"
                color="primary"
                className={classes.signIn}
                onClick={this.SignInToggle.bind(this)}
              >
                Sign In
              </Button>
            </form>
          </Paper>
          }
          {signUp &&
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <PersonAdd/>
              </Avatar>
              <Typography variant="headline">Registration</Typography>
              <form onSubmit={e => this.create(e)} className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="createemail">Email Address</InputLabel>
                  <Input
                    id="email"
                    name="createemail"
                    autoComplete="email"
                    autoFocus
                    onChange={e => this.change(e)}
                    value={this.state.createemail}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">Your Username</InputLabel>
                  <Input
                    id="name"
                    name="createfirstName"
                    autoComplete="name"
                    onChange={e => this.change(e)}
                    value={this.state.createfirstName}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="createpassword"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={e => this.change(e)}
                    value={this.state.createpassword}
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
                  Sign Up
                </Button>
                <Button
                  fullWidth
                  variant="flat"
                  color="primary"
                  className={classes.signIn}
                  onClick={this.SignInToggle.bind(this)}
                >
                  Sign In
                </Button>
              </form>
            </Paper>
          }
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