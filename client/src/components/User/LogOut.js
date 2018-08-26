import React, {Component} from 'react'
import {connect} from 'react-redux'
import {logOut} from '../../actions/userActions'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

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
});

class LogOut extends Component {
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };
  logout = (e) => {
    const {logOutUser} = this.props;
    e.preventDefault();
    document.location.reload();
    logOutUser()
  };



  render () {
    const { classes, user } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <LockIcon />

            <Typography variant="headline">Log Out</Typography>


              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                onClick={e=>this.logout(e)}
                className={classes.submit}
              >
                Log Out {user.login}
              </Button>

          </Paper>
        </main>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOutUser: () => dispatch(logOut()),
  }
};
const mapStateToProps = state => {
  return {
    user: state.user,
    fetching: state.loader.fetching
  }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LogOut))