import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import SendIcon from '@material-ui/icons/Send';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

function SubmitButton(props) {
    const { classes } = props;

    return (
        <Button variant="contained" type="submit" color="primary" className={classes.button}>
            Send
            <SendIcon className={classes.rightIcon}></SendIcon>
        </Button>
    );
}

SubmitButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubmitButton);
