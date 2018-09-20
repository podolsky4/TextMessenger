import {Link} from 'react-router-dom'
import React, {Fragment} from 'react'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
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
    },
    headingContainer: {
        display:'flex',
        flexGrow: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: 500,
        minWidth: 150,
        justifyContent:'flex-start'
    },
    heading: {
        marginLeft: theme.spacing.unit,
        textTransform: 'capitalize',
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
        padding: theme.spacing.unit
    },
    headerUser: {
        padding: '1px'
    },
    menuIcons: {
        '@media (max-width: 520px)': {
            display: 'none',
        }
    },
    drawer: {}
})

class Header extends React.Component {
    state = {
        noUser: false,
        openDrawer: false,
        profileUser: null,
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


    componentDidMount() {
        const {match} = this.props,
              {profileUser} =this.state
        let currentProfile = match.params.id
        // console.log('match.params:', match.params)
        // console.log('headerJS / currentProfile :', currentProfile)
        // console.log('headerJS / match :', match)

        if (this.state.profileUser === null) {
            fetch(`/api/users/${currentProfile}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            )
                .then(res => res.json())
                .then(data => this.setState({profileUser: data}))
        }

        // if(profileUser.params.id !== match.params.id){this.setState({profileUser: null})}
    }




    render() {

        const {classes, user, notification, location, match} = this.props,
              {profileUser} = this.state

        console.log("header_js props_location :", location)
        console.log('header.js state_profileUser :', profileUser)



        const locationRender = () => {
            const headerLocation = this.props.location.pathname.substring(1, 4)
            // console.log("f locationRender  / c headerLocation /", headerLocation)

            switch (headerLocation) {
                case 'fee':
                    return 'Feed';
                case 'fav':
                    return 'Your Likes';
                case 'dia':
                    return 'Your Dialogs';
                case 'not':
                    return 'Notifications';
                case 'pro':
                    return 'Profile';
                default:
                    return ''
            }
        }

        let {noUser, openDrawer} = this.state

        if (!user) noUser = true

        // let flagOtherUser = user.id !== +match.params.id

        console.log('profile in render: ', profileUser)

        return <div className={classes.root}>

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
                    {profileUser &&
                    <div className={classes.headingContainer}>
                        <Typography variant="title"
                                    color="inherit"
                                    className={classes.heading}
                                    component={'h3'}
                                    align='justify'
                                    children={profileUser.firstName}
                        />
                        <Typography variant="title"
                                    color="inherit"
                                    className={classes.heading}
                                    component={'h3'}
                                    children={profileUser.lastName}
                        />
                    </div>
                    }
                    {!profileUser &&
                    <Typography variant="title"
                                color="inherit"
                                className={classes.heading}
                                component={'h3'}
                                children={locationRender()}
                    />
                    }
                    <div className={classes.menuIcons}>
                        {/*<IconButton color="inherit" component={Link} to='/'>*/}
                        {/*<HomeIcon className={classes.icon}/>*/}
                        {/*</IconButton>*/}
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