import React, { Component } from 'react'
import { connect } from 'react-redux'


import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'

import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Loader from '../../components/Loader/Loader'

import { ValidatorForm } from 'react-material-ui-form-validator'
import TextField from '../../../node_modules/@material-ui/core/TextField/TextField'


const styles = theme => ({
  paper: {

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: theme.palette.primary.accentOpacity,
    marginTop: theme.spacing.unit * 2,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  },
  form: {
    marginTop: theme.spacing.unit
  },
  LogINy: {
    marginTop: theme.spacing.unit * 3
  }
})

class ChangePassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      password: '',
      passwordCheck: '',
      newPassword: '',
      passwordCheckErrorText: ''
    }
  }

  change = e => {
    // //  TODO other pattern
    // const pattern = '([A-Z])\\w+'
    // //
    if (e.target.value.match(this.state.newPassword)) {
      switch (e.target.name) {
        case'passwordCheck':
          this.setState({passwordCheckErrorText: ''})
          break
        default: this.setState({passwordCheckErrorText: ''})
      }
    } else {
      switch (e.target.name) {
        case'passwordCheck':
          this.setState({passwordCheckErrorText: 'Passwords should match'})
          break
        default: this.setState({passwordCheckErrorText: 'Passwords should match'})
      }
    }
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    // (this.state.password === this.state.passwordCheck) ?
    // toChangePassword(this.state.password) : e.target.value = "not matched"
  }

  render () {
    const {classes, fetching} = this.props
    return <React.Fragment>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon/>
        </Avatar>
        <ValidatorForm className={classes.center}>
          <Typography variant="headline">Change Password</Typography>
          <form onSubmit={e => this.onSubmit(e)} className={classes.form}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="password">Current Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => this.change(e)}
                value={this.state.password}

              />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="newPassword">New Password</InputLabel>
              <Input
                name="newPassword"
                type="newPassword"
                id="newPassword"
                autoComplete="newPassword"
                onChange={e => this.change(e)}
                value={this.state.newPassword}
              />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="passwordCheck">Retype new Password</InputLabel>
              <Input
                name="passwordCheck"
                type="passwordCheck"
                id="passwordCheck"
                autoComplete="current-password"
                onChange={e => this.change(e)}
                value={this.state.passwordCheck}
                error ={this.state.passwordCheck.length !== 0 }
                helperText={this.state.passwordCheck}
                label={this.state.passwordCheck}
              />
            </FormControl>

            {fetching && <Loader/>}
            <Button
              fullWidth
              type='submit'
              variant='raised'
              className={classes.LogINy}>
              Change
            </Button>
          </form>
        </ValidatorForm>
      </Paper>
    </React.Fragment>
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // toChangePassword: (password) => dispatch(changePassword(password))
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ChangePassword))