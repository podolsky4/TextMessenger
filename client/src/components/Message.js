import React from 'react'
import classNames from 'classnames'

// class Message extends Component {
//   render () {
//     const {message, user} = this.props
//
//     return (
//       <div className={message.user.id === user ? 'current' : 'other'}>
//         <h4>{message.content}</h4>
//         <a>{message.createdDate}</a>
//       </div>
//     )
//   }
// }
// export default Message



import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    message: {
        padding: ".5em",
        margin: ".15em",
        width: "fit-content"
    },
    current: {
        textAlign: "right",
        alignSelf: "flex-end",
    },
    other: { },
});

function Message(props) {
    const { message, classes, user } = props;

    //to check dynamically if the message is from current user:
    // --------- 1. create a new obj with 1.classes from props
    // --------- 2."message" class for all messages
    // --------- 3."current/other" with check from props
    const rootClasses = classNames(
        ...classes,
        classes.message,
        (message.user.id === user) ? classes.current : classes.other,

    );

    return (

        <Paper className={rootClasses} elevation={0}>
            <Typography variant="headline" component="p">
                <a>{message.createdDate} {user.name}</a>
            </Typography>
            <Typography component="p">
                {message.content}
            </Typography>
        </Paper>

    );
}

Message.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Message);
