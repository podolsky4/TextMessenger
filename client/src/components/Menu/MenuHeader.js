import React from 'react'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
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
import MenuAccountRedirect from './MenuAccountRedirect'
import PersonIcon from '@material-ui/icons/Person'

const styles = (theme) => ({
  paper: {
    marginRight: theme.spacing.unit * 2,
    top: '10%',
    left: '-1.7%'
  },
  poper: {
    position: 'absolute',
    left: 10,
    marginLeft: '-68px',
    marginTop: '5px',
    zIndex: 1001,
    width: 200
  },
  root: {
    display: 'flex'
  },
  anchorEl: {
    marginTop: 40,
    width: 200
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  icon: {
    margin: theme.spacing.unit
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  pos: {
    color: '#fafafa' // todo
  },
  HeaderMenu: {
    '&:hover': {
      color: 'black',
      fontWeight: '700'
    }
  },
  lockIcon: {
    marginRight: '1em'
  },
  vrDividerCont: {
    display: 'flex',
    flexDirection: 'row'
  },
  vrDivider: {
    border: '1px solid #9e9e9e3d',
    marginLeft: 45,
    height: '60%',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  HeaderMenuButton: {
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    minWidth: 130,
    width: 'min-content',
    border: '1px solid #fff3e00d',
    background: theme.palette.background.dark,
    marginLeft: 32,

    '&:hover': {
      background: theme.palette.background.main,
      color: theme.palette.background.dark,
      '& $pos': {
        color: theme.palette.background.dark,
        fontWeight: '700'
      }
    }
  }})

class MenuHeader extends React.Component {
  state = {
    open: false,
    toredirect: true
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }))
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return
    }

    this.setState({
      open: false
    })
  };

  render () {
    const { open } = this.state
    const {classes, user} = this.props

    return (
      <div Min className={classes.root}>
        <div className={classes.vrDividerCont}>
           <div className={classes.vrDivider}></div>
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
              src={user.profilePhoto === null ? 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png' : user.profilePhoto}
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
                        className={classes.menuItem}>
                        <PersonIcon className={classes.lockIcon}/>
                        <MenuAccountRedirect padding={0}
                          user={user}
                        />
                      </MenuItem>

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
