import React from 'react'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import UserHeaderInfo from '../User/UserHeaderInfo'
import LogOut from '../User/LogOut'
import {withStyles} from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuList from '@material-ui/core/MenuList'
import Typography from '@material-ui/core/Typography/Typography'

const styles = (theme) => ({
  paper: {
    marginRight: theme.spacing.unit * 2,
    top: '10%',
    left: '-1.7%'
  },
  poper: {
    left: 10
  },
  root: {
    display: 'flex'
    // padding: "1px",
  },
  anchorEl: {
    marginTop: 40
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  icon: {
    margin: theme.spacing.unit
  },
  menuItem: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pos: {
    color: '#fafafa' // todo
  },
  // menu: {
  //   marginTop: 40,
  // },
  HeaderMenu: {
    '&:hover': {
      color: 'black',
      fontWeight: '700'
    }

  },
  HeaderMenuButton: {
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    width: 130,
    border: '1px solid #fff3e00d',
    background: '#fafafa21',

    '&:hover': {
      background: '#fafafa',
      color: 'black',
      '& $pos': {
        color: 'black',
        fontWeight: '700'
      }
    }
  }})

class MenuHeader extends React.Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }))
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return
    }

    this.setState({ open: false })
  };

  render () {
    const { open } = this.state
    const {classes, user} = this.props

    return (
      <div className={classes.root}>
        <div>
          <Button
            buttonRef={node => {
              this.anchorEl = node
            }}
            aria-owns={open ? 'menu-list-grow' : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
            className={classes.HeaderMenuButton}
          >
            <Avatar alt={user.login}
              src={user.profilePhoto == undefined ? 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png' : user.profilePhoto}
              className={classes.avatar}
            />
            <Typography className={classes.pos} color="textPrimary">
              {user.login}
            </Typography>
          </Button>
          <Popper className={classes.poper} open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom' }}
              >
                <Paper className={classes.Paper}>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <MenuItem onClick={this.handleClose}
                        className={classes.menuItem}><UserHeaderInfo padding={0} user={user}/></MenuItem>
                      <MenuItem onClick={this.handleClose}
                        className={classes.menuItem}>My account</MenuItem>
                      <MenuItem onClick={this.handleClose}
                        className={classes.menuItem}><LogOut/></MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    )
  }
}

MenuHeader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MenuHeader)
