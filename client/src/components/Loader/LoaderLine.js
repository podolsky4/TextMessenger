import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
    root: {
        flexGrow: 1,
    },
};

function LoaderLine(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <LinearProgress color="secondary" variant="query" />
        </div>
    );
}

LoaderLine.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoaderLine);