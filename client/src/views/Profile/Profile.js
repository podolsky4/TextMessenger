import React from 'react'
import {connect} from 'react-redux'
import CurrentUserProfile from './CurrentUserProfile'
import OtherUserProfile from './OtherUserProfile'
import Loader from '../../components/Loader/Loader'
import {Redirect} from 'react-router-dom'

import {withStyles} from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

const styles = (theme) => ({
    media: {
        height: 140,
        background: 'cyan',
    },
});

class Profile extends React.Component {
    render() {
        const {user, match, classes} = this.props;

        if (user.length === 0) {
            return <Redirect to={`/`}/>
        }
        if (user.id === undefined) {
            return <Loader fullscreen={true}/>
        }
        let flag = user.id === +match.params.id;
        return (
            <React.Fragment>
                <CardMedia
                    className={classes.media}
                    component="img"
                    image={"https://picsum.photos/1400/140"}
                    title={user.name}
                />
                {flag && <CurrentUserProfile/>}
                {!flag && <OtherUserProfile currentUser={match.params.id}/>}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

export default withStyles(styles)(connect(mapStateToProps)(Profile))