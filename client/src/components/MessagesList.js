import React, {Component} from 'react'
import Message from './Message'

import {withStyles} from '@material-ui/core/styles/index'
import PropTypes from 'prop-types'
import { Typography} from "@material-ui/core/umd/material-ui.production.min";


const styles = theme => ({
  massageList: {
    display: 'flex',
    flexDirection: 'column',
    // background: '#F5F5F5',
    padding: '4px',
    paddingBottom: '.5em',
    paddingTop: '32px',
    background: 'rgba(0, 0, 0, 0.29)',
    borderRadius: 2,
    maxHeight: '85vh',
    overflow: 'scroll',
    minHeight: 200
  },
  emptyMassageList: {
      alignSelf: 'center',
      justifySelf: 'center',
      height: 100,
      width: 200,
      margin: '45px auto',
      padding: 16,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid' + theme.palette.primary.dark,
      borderRadius: 8,
      background: theme.palette.primary.light,
      '& h4':{
          color:theme.palette.primary.contrastText,
          fontWeight: 600
      }
  }
})

class MessagesList extends Component {
  componentDidMount () {
    const msgWrap = document.getElementById('msgWrap')
    msgWrap.scrollIntoView(false)  // TODO: make it scroll to the last one
  }
  render () {
    const {messages, user, classes} = this.props
    const massageList = messages.length > 0 ?  (
      <div id={'msgWrap'} className={classes.massageList}>
        {messages.map((message) => {
          return <Message key={message.id} message={message} user={user}/>
        })}
      </div>
    ) : <div id={'msgWrap'} className={classes.emptyMassageList}>
            <Typography component={"h3"}>This chat is still empty.</Typography>
            <Typography component={"h3"}>Don/'t wait. Start typing!</Typography>
        </div>
    return (massageList)
  }
}

MessagesList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MessagesList)