import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
});



function ButtonSubmit(props) {
    const { classes } = props;

    return (
        <div className={classes.container}>
                <TextField
                    className={classes.margin}
                    label="MuiThemeProvider"
                    id="mui-theme-provider-input"

                />
        </div>
    );
}

ButtonSubmit.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonSubmit);
