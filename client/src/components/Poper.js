import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
// import Paper from '@material-ui/core/Paper';
// import SignIn from '../containers/SignIn/SignIn'


const styles = theme => ({
    typography: {
        padding: theme.spacing.unit * 2,
    },
});

class Poper extends React.Component {
    state = {
        anchorEl: null,
        open: false,
    };

    handleClick = event => {
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            open: !state.open,
        }));
    };

    render() {
        const {content } = this.props;
        console.log(content);
        const { anchorEl, open } = this.state;
        const id = open ? 'simple-popper' : null;

        return (
            <div>
                <Button aria-describedby={id} variant="contained" onClick={this.handleClick}>
                    Sign In
                </Button>
                <Popper id={id} open={open} anchorEl={anchorEl} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            {content}
                        </Fade>
                    )}
                </Popper>
            </div>
        );
    }
}

// Poper.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Poper);
