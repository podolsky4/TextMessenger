import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import withStyles from '../../../node_modules/@material-ui/core/styles/withStyles'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Link } from 'react-router-dom'

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '500px',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    margin: 'auto'
  },
  form: {
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  button: {
    textDecoration : 'none',
    color: 'white'
  }
})

class ResetPassword extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstPassword: '',
      secondPassword: '',
      message: ''
    }
  }
  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.firstPassword) {
        return false;
      }
      return true;
    })

  }
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  resetPassword = e => {
    e.preventDefault()
    fetch('/api/users/changePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: this.state.firstPassword,
        token: this.props.match.params.token
      })
    }).then(res => res.json())
      .then(data => this.setState({message: data.message}))
  }
  render () {
    const {classes} = this.props
    return (
        <Paper className={classes.paper}>
          <Typography variant="headline">Enter new password</Typography>
          <Typography variant="headline">{this.state.message}</Typography>
            <ValidatorForm onSubmit={e => this.resetPassword(e)} className={classes.form}>
              <TextValidator
                label="New Password"
                name="firstPassword"
                type="password"
                fullWidth
                autoFocus
                validators={['required']}
                errorMessages={['this field is required']}
                onChange={e => this.change(e)}
                value={this.state.firstPassword}
              />
              <TextValidator
                label="Repeat password"
                name="secondPassword"
                type="password"
                fullWidth
                validators={['isPasswordMatch', 'required']}
                errorMessages={['password mismatch', 'this field is required']}
                onChange={e => this.change(e)}
                value={this.state.secondPassword}
              />

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
              type="submit"
              fullWidth
              variant="raised"
              color="primary"
              className={classes.submit}
            >
              <Link className={classes.button} to='/feed' >to home page</Link>
            </Button>
            </ValidatorForm>
        </Paper>

    )
  }
}

export default withStyles(styles)(ResetPassword)
