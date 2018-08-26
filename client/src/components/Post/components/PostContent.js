import React, {Component} from 'react'

import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

export default class PostContent extends Component {
  render () {
    const {content} = this.props;
    // return <p className="post_content">{content}</p>
    return (
      <CardContent>
        <Typography component="p" style={{wordBreak: "break-all"}}>
          {content}
        </Typography>
      </CardContent>
    )
  }
}
