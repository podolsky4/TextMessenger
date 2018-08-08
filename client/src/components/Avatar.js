// import React, {Component} from 'react'
//
// export default class Avatar extends Component {
//   render () {
//     return <img className="logo" alt="logo" src="https://www.ozilis.com/25038-large_default/plate-42-44-46.jpg"></img>
//   }
// }



import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar  from '@material-ui/core/Avatar';

const styles = {
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
};



function Ava(props) {
    const { classes } = props;
    return (

            <Avatar alt="Remy Sharp"
                    src="https://www.ozilis.com/25038-large_default/plate-42-44-46.jpg"
                    className={classnames(classes.avatar, 'logo')} />


    );
}

Ava.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Ava);