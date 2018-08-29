import React, {Component} from 'react'

import SignIn from '../../containers/SignIn/SignIn'
import TextCard from '../../components/TextCard/TextCard'

import {withStyles} from '@material-ui/core/styles'
import connect from 'react-redux/es/connect/connect'
import classNames from 'classnames'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '100%'
  },
  cont: {
    background: 'red'
  },
  homepage: {
    background: 'linear-gradient(to top, #9eb1ba, #8ea4ae, #7f97a2, #6f8a96, #607d8b), grey',
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
    return (
      <div className={classNames(classes.homepage, classes.root, classes.cont)}>
        <TextCard
          text="TextMessenger проект предполагает создание приложения с использованием всех знаний, которые мы получили во время курса. Результатом станет адаптивное веб-приложение, развернутое на AWS."
          classes={'TextCard'}/>
        {user.length === 0 && <SignIn classes={'SignIn'}/>}
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
