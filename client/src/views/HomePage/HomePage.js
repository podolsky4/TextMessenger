import React, {Component} from 'react'
import Typography from '@material-ui/core/Typography'
import SignIn from "../../containers/SignIn/SignIn";

class HomePage extends Component {
  render () {
    return (
      <Typography variant='display2' gutterBottom align='center'>
        This page is not implemented yet
        <SignIn classes={"SignIn"}/>
      </Typography>
    )
  }
}

export default HomePage
