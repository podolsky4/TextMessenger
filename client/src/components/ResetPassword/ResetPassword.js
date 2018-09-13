import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import withStyles from '../../../node_modules/@material-ui/core/styles/withStyles'

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
          <h1>{this.state.message}</h1>
          <form onSubmit={e => this.resetPassword(e)} className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="firstPassword">New Password</InputLabel>
              <Input
                id="firstPassword"
                name="firstPassword"
                type="password"
                autoFocus
                onChange={e => this.change(e)}
                value={this.state.firstPassword}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="secondPassword">Repeat Password</InputLabel>
              <Input
                id="secondPassword"
                name="secondPassword"
                type="password"
                onChange={e => this.change(e)}
                value={this.state.secondPassword}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="raised"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </Paper>

    )
  }
}

export default withStyles(styles)(ResetPassword)
