import {Link} from 'react-router-dom'
import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MessageIcon from '@material-ui/icons/ChatBubble'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PublicIcon from '@material-ui/icons/Public'
import Badge from '@material-ui/core/Badge/Badge'
import connect from 'react-redux/es/connect/connect'
import MenuHeader from '../../components/Menu/MenuHeader'
import NavMenuDrawer from "../../components/NavMenu/NavMenuDrawer"
import MenuIcon from '@material-ui/icons/Menu'
import {ClickAwayListener} from "@material-ui/core/umd/material-ui.production.min";

const styles = (theme,) => ({
  root: {
    flexGrow: 1,
      textTransform: 'capitalize'
  },
  appBar: {
    background: '#455A64'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
      '@media (min-width: 520px)': {
          display: 'none',
      }
  },
  icon: {
    margin: theme.spacing.unit
  },
  badge: {
    top: -5,
    right: -10
  },
  typography: {
    padding: theme.spacing.unit * 2
  },
  headerUser: {
    padding: '1px'
  },
  // menuIcons: {
  //     display: 'flex',
  //       flexDirection: 'row'
  //   },
    menuIcons: {
    '@media (max-width: 520px)': {
        display: 'none',

    }
  },

    drawer: {

    }
})

class Header extends React.Component {
    state = {
        noUser: false,
        openDrawer: false,
        profileUser: '',
        profileUserId: null,
    };

    toggleDrawer = () => {
        this.setState({
            openDrawer: true
        });
        console.log('drawer :', this.state.drawer)
    };

    handleClickAway = () => {
        this.setState({
            openDrawer: false,
        });
    };

    locationRender = () => {
        console.log("locationRender got:",this.props.location.pathname.substring(1, 4))
        switch (this.props.location.pathname) {
            case 'feed':
                return 'Feed'
            case 'feed':
                return 'Feed'
            case 'feed':
                return 'Feed'
            case 'feed':
                return 'Feed'
            case 'feed':
                return 'Feed'

            default:
                return
        }
    }

    componentWillMount () {
        const {match} = this.props
        let currentProfile = match.params.id
        if (this.state.profileUser === 0) {
            fetch(`/api/users/${currentProfile}`,
                {   method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            )
                .then(res => res.json())
                .then(data => this.setState({profileUser: {...data}}))
        }

        console.log('data in header :', this.state.profileUser)
    }



    render() {
        const {classes, user, notification, location, match} = this.props,
              {profileUser} = this.state
        console.log("location :", location)

        let {noUser, openDrawer} = this.state
        if (!user) noUser = true





        let flagOtherUser = user.id !== +match.params.id
        let locationName = profileUser
        console.log('locationName: ', locationName)
        // if (flagOtherUser) {
        //     profileUser = posts.filter(function (post) {
        //             return post.user.id === user.id
        //         }
        //     )
        // } else {
        //     userPosts = posts.filter(function (post) {
        //             return post.user.id === +match.params.id
        //         }
        //     )
        // }







        return <div className={classes.root}>




            {/*<React.Fragment>*/}
                {/*{flag && <CurrentUserProfile userPosts={userPosts}/>}*/}
                {/*{!flag && <OtherUserProfile currentUser={match.params.id} userPosts={userPosts}/>}*/}
            {/*</React.Fragment>*/}



            <AppBar position='static' className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <ClickAwayListener onClickAway={this.handleClickAway}>
                        <IconButton className={classes.menuButton}
                                    color="inherit"
                                    aria-label="Menu"
                                    onClick={this.toggleDrawer}>
                            <MenuIcon/>
                        </IconButton>
                        {openDrawer && (<NavMenuDrawer/>)}
                    </ClickAwayListener>
                    <Typography variant="title"
                                color="inherit"
                                className={classes.root}
                                component={'h3'}
                                children={this.locationRender()}
                    />
                    <div className={classes.menuIcons}>
                        <IconButton color="inherit" component={Link} to='/'>
                            <HomeIcon className={classes.icon}/>
                        </IconButton>
                        <IconButton color="inherit" component={Link} to='/feed'>
                            <PublicIcon className={classes.icon}/>
                        </IconButton>
                        <IconButton color="inherit" component={Link} to='/favorites'>
                            <FavoriteIcon className={classes.icon}/>
                        </IconButton>
                        <IconButton color="inherit" component={Link} to='/dialogs'>
                            <MessageIcon className={classes.icon}/>
                        </IconButton>
                        <IconButton aria-label="4 pending messages" color="inherit" component={Link}
                                    to='/notifications'>
                            <Badge badgeContent={notification.length} color='secondary'
                                   classes={{badge: classes.badge}}>
                                <NotificationsIcon className={classes.icon}/>
                            </Badge>
                        </IconButton>
                    </div>
                    {!noUser &&
                    <MenuHeader user={user}/>
                    }
                </Toolbar>
            </AppBar>

        </div>
    }

}


const mapStateToProps = state => {
  return {
    user: state.user,
    currentLocation: state.location,
    notification: state.notification
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Header))