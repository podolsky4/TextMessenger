import React, {Component} from 'react'

import SignIn from '../../containers/SignIn/SignIn'
import TextCard from '../../components/TextCard/TextCard'

import {withStyles} from '@material-ui/core/styles'
import connect from 'react-redux/es/connect/connect'
import classNames from 'classnames'
import {Redirect} from 'react-router-dom'
import blueGrey from '@material-ui/core/colors/blueGrey'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '100%',
    height: '100vh'
  },
  cont: {
    background: blueGrey
  },
  homepage: {
    // background: 'linear-gradient(to top, #9eb1ba, #8ea4ae, #7f97a2, #6f8a96, #607d8b), grey',
    background: '#00796B',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'true',
    alignItems: 'start',
    justifyContent: 'flex-start'
  }
})

class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      location: 'home'
    }
  }

  render () {
    const {classes, user} = this.props

    if (user.id) {
      return <Redirect to='/feed' />
    }

    return (
      <div className={classNames(classes.homepage, classes.root, classes.cont)}>
        <TextCard
          text="TextMessenger проект предполагает создание приложения с использованием всех знаний, которые мы получили во время курса. Результатом станет адаптивное веб-приложение, развернутое на AWS."
          classes={'TextCard'}/>
        {!user.id && <SignIn classes={'SignIn'}/>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    location: state.location
  }
}
export default connect(mapStateToProps)(withStyles(styles)(HomePage))
