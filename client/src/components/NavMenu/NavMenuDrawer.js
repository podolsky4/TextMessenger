import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {Badge, IconButton} from "@material-ui/core/umd/material-ui.production.min";
import {Link} from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MessageIcon from '@material-ui/icons/ChatBubble'
import PublicIcon from '@material-ui/icons/Public'
import NotificationsIcon from '@material-ui/icons/Notifications'
import connect from 'react-redux/es/connect/connect'

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

class NavMenuDrawer extends React.Component {




    render() {
        const { classes, notification} = this.props;

        const sideList = (
            <div className={classes.list}>
                <List>
                    <IconButton color="inherit" component={Link} to='/'>
                    <HomeIcon className={classes.icon}/>
                    </IconButton>
                    Home
                </List>
                <Divider />
                <List>
                    <IconButton color="inherit" component={Link} to='/feed'>
                        <PublicIcon className={classes.icon}/>
                    </IconButton>
                    Feed
                </List>
                <Divider />
                <List>
                    <IconButton color="inherit" component={Link} to='/favorites'>
                        <FavoriteIcon className={classes.icon}/>
                    </IconButton>
                    Likes
                </List>
                <Divider />
                <List>
                    <IconButton color="inherit" component={Link} to='/dialogs'>
                        <MessageIcon className={classes.icon}/>
                    </IconButton>
                    Messeages
                </List>
                <Divider />
                <List>
                    <IconButton  color="inherit" component={Link} to='/notifications'>
                        <Badge badgeContent={notification.length} color='secondary' classes={{badge: classes.badge}}>
                            <NotificationsIcon className={classes.icon}/>
                        </Badge>
                    </IconButton>
                    Notifications
                </List>
                <Divider />
            </div>
        );

        return (
                <Drawer open>
                        {sideList}
                </Drawer>
        );
    }
}

const mapStateToProps = state => {
    return {
        notification: state.notification
    }
}


NavMenuDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(NavMenuDrawer));