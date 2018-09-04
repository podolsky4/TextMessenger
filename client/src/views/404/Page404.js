import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

export default class Page404 extends React.Component {
  render () {
    return (
      <Fragment>
        <h1>Sorry page not found</h1>
        <Link to='/feed' >to home page</Link>
      </Fragment>
    )
  }
}