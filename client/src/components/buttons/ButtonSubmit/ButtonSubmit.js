import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceICon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

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
            <Icon className={classes.rightIcon}>send</Icon>
        </Button>
    );
}

SubmitButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubmitButton);