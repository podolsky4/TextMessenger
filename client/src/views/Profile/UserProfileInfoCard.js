import React from 'react'
import PersonAdd from '@material-ui/icons/PersonAdd'
import {withStyles} from '@material-ui/core/styles'
import classnames from 'classnames'
import CardContent from '@material-ui/core/CardContent/CardContent'
import Card from '@material-ui/core/Card/Card'
import Avatar from '@material-ui/core/Avatar/'
import Typography from '@material-ui/core/Typography/Typography'

const styles = (theme) => ({
  media: {
    height: 140,
    background: 'cyan'
  },
  card: {
    Width: '100%'
  },
  avatar: {
    // minWidth: 75,
    // maxWidth: 100,
    position: 'relative',
    top: 24,
    height: 'auto',
    margin: '10 auto',
    border: '2px solid',
    borderColor: '#fafafa' // TODO make a themed color theme.pallete.backgound.paper
  },
  pos: {
    marginBottom: 12,
    color: 'orange'
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 275,
    maxWidth: 400,
    padding: 40
  },
  userInfoCnt: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    display: 'flex',
    justifyContent: 'center'
  },

  bigAvatar: {
    width: 160,
    height: 160
  }
})

class UserProfileInfoCard extends React.Component {
  render () {
    const {user, classes} = this.props
    console.log(user)
    return (
      <React.Fragment>

        <div className={classes.userInfoCnt}>
          <Avatar alt="user avatar"
            // src={user.profilePhoto}

                  className={classnames(classes.avatar, classes.bigAvatar)}>
            <PersonAdd/>
            {/* TODO: bug. user is not getting to here, so default icon now. */}
          </Avatar>
          <div className={classes.userInfo}>

            <Card className={classes.card}>
              <CardContent>

                <Typography className={classes.pos} color="textPrimary">
                                  @{user.login}
                </Typography>
                <Typography component={'h6'} color="textSecondary">
                  {user.email}
                </Typography>

              </CardContent>
            </Card>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(UserProfileInfoCard)