import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import withStyles from '../../../node_modules/@material-ui/core/styles/withStyles'

const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '500px',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    height: '130px',
    position: 'absolute',
    margin: 'auto',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  button: {
    textDecoration : 'none',
    color: 'white'
  }
})
class ConfirmRegistration extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      message: ''
    }
  }
  componentWillMount () {
    const {token} = this.props.match.params
    fetch(`/api/users/registered/${token}`)
      .then(res => res.json())
      .then(data => this.setState({message: data.message}))
  }
  render () {
  const {classes} = this.props
    return (
      <Fragment>
      <Paper className={classes.paper}>
        <Typography variant="headline">{this.state.message}</Typography>

          <Button
            type="submit"
            variant="raised"
            color="primary"
            className={classes.submit}
          >
            <Link className={classes.button} to='/feed' >to home page</Link>
          </Button>

      </Paper>
      </Fragment>
  )
  }
}
export default withStyles(styles)(ConfirmRegistration)