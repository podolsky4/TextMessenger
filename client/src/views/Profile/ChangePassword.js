import React, { Component } from 'react'
import { connect } from 'react-redux'


import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'

import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Loader from '../../components/Loader/Loader'

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

const styles = theme => ({
    paper: {
        marginTop: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        background: theme.palette.primary.accentOpacity
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
  LogINy: {
    marginTop: theme.spacing.unit * 3
  }
})

class ChangePassword extends Component {
    constructor (props) {
        super(props)
        this.state = {
            currentPassword: '',
          createPassword: '',
          repeatPassword: ''
        }
    }
  }

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.createPassword) {
        return false;
      }
      return true;
    });
  }

  change = e => {
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
                    <ValidatorForm  ref="form" onSubmit={e => this.onSubmit(e) }className={classes.center}>
                        <Typography variant="headline">Change Password</Typography>
                        <TextValidator
                          label="Current Password"
                          name="currentPassword"
                          autoFocus
                          fullWidth
                          type="password"
                          value={this.state.currentPassword}
                          onChange={e => this.change(e)}
                          validators={['required']}
                          errorMessages={['this field is required']}
                        />

                        <TextValidator
                          label="Password"
                          name="createPassword"
                          type="password"
                          fullWidth
                          validators={['required']}
                          errorMessages={['this field is required']}
                          onChange={e => this.change(e)}
                          value={this.state.createPassword}
                        />
                        <TextValidator
                          label="Repeat password"
                          onChange={e => this.change(e)}
                          name="repeatPassword"
                          type="password"
                          fullWidth
                          validators={['isPasswordMatch', 'required']}
                          errorMessages={['password mismatch', 'this field is required']}
                          value={this.state.repeatPassword}
                        />
                        {fetching && <Loader/>}
                        <Button
                          type="submit"
                          fullWidth
                          variant="raised"
                          color="primary"
                          className={classes.LogINy}
                        >
                          Sign Up
                        </Button>
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