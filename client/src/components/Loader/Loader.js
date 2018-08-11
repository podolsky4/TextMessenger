import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress  from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

function Loader(props) {
    const { classes } = props;
    return (
        <div>
            <CircularProgress className={classes.progress} style={{ color: green[900] }} thickness={2} />
        </div>
    );
}

Loader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);
