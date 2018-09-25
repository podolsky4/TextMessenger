import React, {Component} from 'react'

import SignIn from '../../containers/SignIn/SignIn'
import TextCard from '../../components/TextCard/TextCard'

import {withStyles} from '@material-ui/core/styles'
import connect from 'react-redux/es/connect/connect'
import {Redirect} from 'react-router-dom'


const styles = theme => ({
  homepage: {
    background: theme.palette.background.main,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'start',
    justifyContent: 'space-around',
    marginTop: 16
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
      <div className={classes.homepage}>
        <TextCard
          text="TextMessenger проект предполагает создание приложения с использованием всех знаний, которые мы получили во время курса. Результатом станет адаптивное веб-приложение, развернутое на AWS."/>
        {!user.id && <SignIn />}
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
