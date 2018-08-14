import React, {Component} from 'react'
import Typography from '@material-ui/core/Typography'
import SignIn from "../../containers/SignIn/SignIn";
import TextCard from "../../components/TextCard/TextCard";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {loadFavorites} from "../../actions/postsActions";
import {createUser, loadUser} from "../../actions/userActions";
import classNames from 'classnames';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        width: "100%",
    },
    cont: {
        background: "red",
    },
    homepage: {
        background: "linear-gradient(to top, #9eb1ba, #8ea4ae, #7f97a2, #6f8a96, #607d8b), grey",
        display:"flex",
        flexDirection:"row",
        flexWrap:"true",
        alignItems:"start",
        justifyContent:"flex-start",
    }
});





class HomePage extends Component {
    render () {
        const {classes} = this.props
      return (
          <div className={classNames(classes.homepage, classes.root, classes.cont)}>
              <TextCard text="TextMessenger проект предполагает создание приложения с использованием всех знаний, которые вы получили во время курса. Результатом станет адаптивное веб-приложение, развернутое на AWS."
                        classes={"TextCard"}/>
              <SignIn classes={"SignIn"}/>
          </div>
      );
  }
}




export default withStyles(styles)(HomePage)
