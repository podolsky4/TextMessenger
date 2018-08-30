import React from 'react'
import {connect} from 'react-redux'

import {withStyles} from '@material-ui/core/styles';
import classnames from "classnames";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from "@material-ui/core/Typography/Typography";

const styles = (theme) => ({
    media: {
        height: 140,
        background: 'cyan',
    },
    card: {
        Width: "100%",
    },
    avatar: {
        minWidth: 75,
        maxWidth: 100,
        position: 'relative',
        top: 24,
        height: "auto",
        margin: "0 auto",
        border: "2px solid",
        borderColor: "#fafafa" //TODO make a themed color theme.pallete.backgound.paper
    },
    pos: {
        marginBottom: 12,
        color: "orange",
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 275,
        maxWidth: 400,
        padding: 40,
    },
});


class UserProfileInfoCard extends React.Component {
    render() {
        const {user, classes} = this.props;
        return (
            <React.Fragment>
                <div className={classes.userInfo}>
                    <Avatar alt="avatar"
                            src={user.profilePhoto}
                            className={classnames(classes.avatar, 'logo')}/>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.pos} color="textSecondary">
                                @{user.login}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                @{user.login}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                @{user.login}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                @{user.login}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                @{user.login}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                @{user.login}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};


export default withStyles(styles)(connect(mapStateToProps)(UserProfileInfoCard))